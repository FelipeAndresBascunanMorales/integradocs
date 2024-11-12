import  { useState } from 'react';
import { Integration } from './integrationsData';
import { appwriteProvider } from './appwriteProvider.js';


export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const addIntegration = (integration: Integration) => {
    setIntegrations([...integrations, integration]);
  };

  const updateIntegration = (id: string, updatedIntegration: Integration) => {
    setIntegrations(integrations.map(i => 
      i.id === id ? { ...updatedIntegration, id } : i
    ));
  };

  const deleteIntegration = (id: string) => {
    setIntegrations(integrations.filter(i => i.id !== id));
  };

  const getIntegrations = () => appwriteProvider().getIntegrations();


  return {
    getIntegrations,
    addIntegration,
    updateIntegration,
    deleteIntegration,
  };
}