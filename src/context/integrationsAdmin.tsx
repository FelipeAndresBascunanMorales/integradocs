import  { useCallback, useState } from 'react';
import {Integration, NewIntegration, UpdateIntegration } from '../types/integration';
import appwriteProvider from './appwriteProvider.js';


export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const addIntegration = useCallback((integration: NewIntegration) => {
    appwriteProvider().saveIntegration(integration);
    // setIntegrations([...integrations, integration]);
  }, []);

  // is orait but is not using the real context just a state here that is not relevant
  const updateIntegration = (id: string, updatedIntegration: UpdateIntegration) => {
    setIntegrations(integrations.map(i => 
      i.$id === id ? { ...i, ...updatedIntegration, id } : i
    ));
  };

  const deleteIntegration = (id: string) => {
    setIntegrations(integrations.filter(i => i.id !== id));
  };

  const getIntegrations = useCallback(async () => {
    const response = await appwriteProvider().getIntegrations();
    setIntegrations(response.documents as Integration[]);
    return response;
  }, []);


  return {
    getIntegrations,
    addIntegration,
    updateIntegration,
    deleteIntegration,
  };
}