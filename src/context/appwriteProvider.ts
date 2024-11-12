import { Client, Databases, Query, Models} from 'appwrite';

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")  
.setProject(import.meta.env.VITE_APPWRITE_FUNCTION_PROJECT_ID)

const database = new Databases(client);

export type DocumentList = Models.DocumentList<Document>;
export type Document = Models.Document;

const response = await database.listDocuments(
  import.meta.env.VITE_DATABASE_ID_VEELOTU,
  import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
  [Query.orderDesc("$createdAt"), Query.limit(30)]
);

export async function getIntegrationsByCategory(category: string) {
  const response = await database.listDocuments(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
    [
      Query.search("category", category),
    ]
  );
  return response
}

export async function getIntegrationsByIndustry(industry: string) {
  console.log("WE ARE GETTING: ", industry);
  const response = await database.listDocuments(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
    [
      Query.search("industry", industry),
    ]
  );
  return response
}

export interface Integration {
  id: number;
  name: string;
  description: string;
  complexityLevel?: number;
  requireDev?: boolean;
  kindOf?: 'API' | 'LowCode' | 'NoCode' | 'Service' | 'Idontknow';
  complexity?: string;
  recommended?: boolean;
  tags?: string[];
  pricing?: string[];
  category?: string;
  industry?: string;
  icon?: string;
  integrationDetails?: 
  {
    fullDescription: string;
    pros: string[];
    cons: string[];
    documentations: string;
    useCases: string[];
  };
}

export const latestIntegrations = response.documents

