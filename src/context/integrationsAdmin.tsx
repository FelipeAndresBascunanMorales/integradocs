import  { useCallback, useState } from 'react';
import {Integration, NewIntegration, UpdateIntegration } from '../types/integration';
import appwriteProvider from './appwriteProvider.js';
import { Category } from '../types/category.js';


export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [, setCategories] = useState<Category[]>([]);

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
    appwriteProvider().deleteIntegration(id);
    setIntegrations(integrations.filter(i => i.id !== id));
  };

  const getIntegrations = useCallback(async (page = 0) => {
    const response = await appwriteProvider().getIntegrations(page);
    setIntegrations(response.documents as Integration[]);
    return response;
  }, []);

  const getCategories = useCallback(async () => {
    const response = await appwriteProvider().getCategories();
    setCategories(response.documents as Category[]);
    return response;
  }, []);


  return {
    getIntegrations,
    addIntegration,
    updateIntegration,
    deleteIntegration,
    getCategories,
  };
}