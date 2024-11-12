import React from 'react';
import { Save, X } from 'lucide-react';
import { useIntegrations } from '../../context/integrationsAdmin';
import { Integration } from '../../context/integrationsData';

type IntegrationFormProps = {
  integration?: Integration;
  onCancel: () => void;
  onSave: () => void;
};

export function IntegrationForm({ integration, onCancel, onSave }: IntegrationFormProps) {
  const { addIntegration, updateIntegration } = useIntegrations();
  const [formData, setFormData] = React.useState<Partial<Integration>>(
    integration || {
      complexity: 'Media',
      cost: 'Pago',
      developerRequired: false,
      industry: 'ecommerce',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (integration) {
      updateIntegration(integration.id, formData as Integration);
    } else {
      const newId = formData.name?.toLowerCase().replace(/\s+/g, '-') || '';
      addIntegration({ ...formData as Integration, id: newId });
    }
    
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <input
            type="text"
            value={formData.category || ''}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={formData.description || ''}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Complejidad</label>
          <select
            value={formData.complexity || 'Media'}
            onChange={e => setFormData({ ...formData, complexity: e.target.value as Integration['complexity'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Costo</label>
          <select
            value={formData.cost || 'Pago'}
            onChange={e => setFormData({ ...formData, cost: e.target.value as Integration['cost'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Gratis">Gratis</option>
            <option value="Freemium">Freemium</option>
            <option value="Pago">Pago</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Industria</label>
          <select
            value={formData.industry || 'ecommerce'}
            onChange={e => setFormData({ ...formData, industry: e.target.value as Integration['industry'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="ecommerce">E-commerce</option>
            <option value="healthcare">Salud</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Requiere Desarrollador</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.developerRequired || false}
                onChange={e => setFormData({ ...formData, developerRequired: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Sí</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar
        </button>
      </div>
    </form>
  );
}