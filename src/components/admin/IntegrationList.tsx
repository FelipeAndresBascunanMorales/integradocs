import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { useIntegrations } from '../../context/integrationsAdmin';
import { IntegrationForm } from './IntegrationForm';
import { Integration } from '../../types/integration';
import { parameterize } from '../../lib/utils';
import { Link } from 'react-router-dom';

type IntegrationListProps = {
  onEdit: (id: string) => void;
  editingId: string | null;
  onEditComplete: () => void;
};

export function IntegrationList({ onEdit, editingId, onEditComplete }: IntegrationListProps) {
  const { getIntegrations, deleteIntegration } = useIntegrations();
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  useEffect(() => {
    async function fetchData() {
      const allIntegrations = await getIntegrations();
      setIntegrations(allIntegrations.documents as Integration[]);
    }
    fetchData();
  }, [getIntegrations]);


  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta integración?')) {
      deleteIntegration(id);
      setIntegrations(integrations.filter((integration) => integration.$id !== id));
    }
  };

  if (!integrations.length) {
    return <div className=' text-center py-4'>Cargando...</div>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Complejidad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Costo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Industria
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {integrations && (integrations.map((integration) => (
            <React.Fragment key={integration.$id}>
              <tr>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {integration.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {integration.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {integration.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {integration.complexity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {integration.pricing}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {integration.industry}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                 <div className='flex'>
                  <Link
                      to={`/integration/${parameterize(integration.name)}`}
                      state={integration}
                      className='text-indigo-600 hover:text-indigo-900 mr-4'
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onEdit(integration.$id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(integration.$id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                 </div>
                </td>
              </tr>
              {editingId === integration.$id && (
                <tr>
                  <td colSpan={6} className="px-6 py-4">
                    <IntegrationForm
                      integration={integration}
                      onCancel={onEditComplete}
                      onSave={onEditComplete}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          )))}
        </tbody>
      </table>
    </div>
  );
}