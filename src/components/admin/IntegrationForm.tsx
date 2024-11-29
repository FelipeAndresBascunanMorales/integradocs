import { Save, X, Sparkles, Lamp } from 'lucide-react';
import { useIntegrations } from '../../context/integrationsAdmin';
// import { Integration } from '../../context/integrationsData';
import { Integration, NewIntegration, UpdateIntegration } from '../../types/integration';
import { getIntegrationCompletion } from '../../context/appwriteProvider';
import { FormEvent, useState } from 'react';

// type Integration = {
//   $id?: string;
//   name: string;
//   description: string;
//   complexityLevel?: number;
//   requireDev?: boolean;
//   kindOf?: 'API' | 'LowCode' | 'NoCode' | 'Service' | 'Idontknow';
//   complexity?: string;
//   recommended?: boolean;
//   tags?: string[];
//   pricing?: string[];
//   category?: string;
//   industry?: string;
//   icon?: string;
//   integrationDetails?: {
//     fullDescription: string;
//     pros: string[];
//     cons: string[];
//     documentations: string;
//     useCases: string[];
//   };
// };

type IntegrationFormProps = {
  integration?: Integration;
  onCancel: () => void;
  onSave: () => void;
};

export function IntegrationForm({ integration, onCancel, onSave }: IntegrationFormProps) {
  const { addIntegration, updateIntegration } = useIntegrations();
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState<NewIntegration>({
    name: '',
    description: '',
    ...integration,
    integrationDetails: {
      fullDescription: '',
      pros: [],
      cons: [],
      documentations: '',
      useCases: [],
      ...integration?.integrationDetails
    }
  });




  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    if (integration?.$id) {
      updateIntegration(integration.$id, formData as UpdateIntegration);
    } else {
      addIntegration(formData);
    }
    
    onSave();
  };

  const handleChatGPTRequest = async (text: string) => {
    try {
      setGenerating(true);
      const response = await getIntegrationCompletion(text);
      if (!response.responseBody) {
        console.error("something wrong with the cloud function");
        return;
      }
      let integration
      
      try {
        integration = JSON.parse(response.responseBody)?.integration;
      }
      catch (error) {
        console.error("error parsing response", error);
        return;
      }

      setFormData(prevData => ({
        ...prevData,
        ...integration
      }));
    }
    catch (error) {
      console.error("error while generating with AI", error);
    }
    finally {
      setGenerating(false);
    }
  }

  const handleArrayInput = (field: keyof Integration, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: arrayValue }));
  };

  const handleDetailsArrayInput = (field: keyof typeof formData.integrationDetails | string, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      integrationDetails: {
        ...prev.integrationDetails,
        [field]: arrayValue
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              maxLength={50}
            />
            <button type='button' className='flex border p-2 mt-1 disabled:opacity-50 disabled:cursor-not-allowed' disabled={formData.name.length < 3 || generating}
              onClick={(e) => { e.preventDefault(); handleChatGPTRequest(formData.name) }}>
              {generating ? (<><Lamp />generating...</>) : (<><Sparkles className=' text-fuchsia-600 p-1 mr-1'/> Completar con IA</>)}
            </button>
            
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ícono URL</label>
            <input
              type="url"
              value={formData.icon || ''}
              onChange={e => setFormData({ ...formData, icon: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Descripción *</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            maxLength={200}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        {/* Characteristics */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Integración</label>
            <select
              value={formData.kindOf || ''}
              onChange={e => setFormData({ ...formData, kindOf: e.target.value as Integration['kindOf'] })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Seleccionar tipo</option>
              <option value="API">API</option>
              <option value="LowCode">LowCode</option>
              <option value="NoCode">NoCode</option>
              <option value="Service">Service</option>
              <option value="Idontknow">No lo sé</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Complejidad</label>
            <select
              value={formData.complexity || ''}
              onChange={e => setFormData({ ...formData, complexity: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Seleccionar nivel</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nivel de Complejidad (0-100)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={formData.complexityLevel || 50}
              onChange={e => setFormData({ ...formData, complexityLevel: parseInt(e.target.value) })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <input
              type="text"
              value={formData.category || ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              maxLength={50}
            />
          </div>
        </div>

        {/* Tags and Pricing */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Tags (separados por coma)</label>
            <input
              type="text"
              value={formData.tags?.join(', ') || ''}
              onChange={e => handleArrayInput('tags', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="tag1, tag2, tag3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pricing (separados por coma)</label>
            <input
              type="text"
              value={formData.pricing?.join(', ') || ''}
              onChange={e => handleArrayInput('pricing', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="free, premium, enterprise"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.requireDev || false}
                onChange={e => setFormData({ ...formData, requireDev: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 transition"
              />
              <span className="ml-2 text-sm text-gray-600">Requiere Desarrollador</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.recommended || false}
                onChange={e => setFormData({ ...formData, recommended: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 transition"
              />
              <span className="ml-2 text-sm text-gray-600">Recomendado</span>
            </label>
          </div>
        </div>

        {/* Integration Details */}
        <div className="space-y-6 border-t pt-6">
          <h3 className="text-lg font-medium">Detalles de Integración</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Descripción Completa</label>
            <textarea
              value={formData.integrationDetails?.fullDescription || ''}
              onChange={e => setFormData({
                ...formData,
                integrationDetails: {
                  ...formData.integrationDetails,
                  fullDescription: e.target.value
                }
              })}
              rows={4}
              maxLength={2000}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Pros (separados por coma)</label>
              <input
                type="text"
                value={formData.integrationDetails?.pros?.join(', ') || ''}
                onChange={e => handleDetailsArrayInput('pros', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="ventaja1, ventaja2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contras (separados por coma)</label>
              <input
                type="text"
                value={formData.integrationDetails?.cons?.join(', ') || ''}
                onChange={e => handleDetailsArrayInput('cons', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="desventaja1, desventaja2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL de Documentación</label>
            <input
              type="url"
              value={formData.integrationDetails?.documentations || ''}
              onChange={e => setFormData({
                ...formData,
                integrationDetails: {
                  ...formData.integrationDetails,
                  documentations: e.target.value
                }
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Casos de Uso (separados por coma)</label>
            <input
              type="text"
              value={formData.integrationDetails?.useCases?.join(', ') || ''}
              onChange={e => handleDetailsArrayInput('useCases', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="caso1, caso2"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}