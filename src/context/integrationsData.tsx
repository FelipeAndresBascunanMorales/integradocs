import React, { createContext, useContext, useState } from 'react';

interface Integration {
  id: number;
  name: string;
  description: string;
}

interface IntegrationsContextType {
  integrations: Integration[];
  addIntegration: (integration: Integration) => void;
}

const initialIntegrations: Integration[] = [
  { id: 1, name: 'Integration 1', description: 'Description for Integration 1' },
  { id: 2, name: 'Integration 2', description: 'Description for Integration 2' },
];

const IntegrationsContext = createContext<IntegrationsContextType | undefined>(undefined);

export const IntegrationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);

  const addIntegration = (integration: Integration) => {
    setIntegrations([...integrations, integration]);
  };

  return (
    <IntegrationsContext.Provider value={{ integrations, addIntegration }}>
      {children}
    </IntegrationsContext.Provider>
  );
};

export const useIntegrations = (): IntegrationsContextType => {
  const context = useContext(IntegrationsContext);
  if (!context) {
    throw new Error('useIntegrations must be used within an IntegrationsProvider');
  }
  return context;
};