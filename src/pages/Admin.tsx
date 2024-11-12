import React from 'react';
import { IntegrationList } from '../components/admin/IntegrationList.tsx';
import { IntegrationForm } from '../components/admin/IntegrationForm.tsx';
import { Plus } from 'lucide-react';

export function Admin() {
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Administrar Integraciones</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Integración
        </button>
      </div>

      {isAdding && (
        <IntegrationForm
          onCancel={() => setIsAdding(false)}
          onSave={() => setIsAdding(false)}
        />
      )}

      <IntegrationList
        onEdit={(id) => setEditingId(id)}
        editingId={editingId}
        onEditComplete={() => setEditingId(null)}
      />
    </div>
  );
}