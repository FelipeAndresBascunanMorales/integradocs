import { Client, Databases, Query, Models, ID, Functions, ExecutionMethod} from 'appwrite';
import { Integration, NewIntegration } from '../types/integration';

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")  
.setProject(import.meta.env.VITE_APPWRITE_FUNCTION_PROJECT_ID)

const database = new Databases(client);

export type DocumentList = Models.DocumentList<Document>;
export type Document = Models.Document;

export async function getIntegrations() {
  const response = await database.listDocuments(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
    [Query.orderDesc("$createdAt")]
  );
  return response
}

async function getIntegrationsByCategory(category: string) {
  const response = await database.listDocuments(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
    [
      Query.search("category", category),
    ]
  );
  return response
}

async function getIntegrationsByIndustry(industry: string) {
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

// now is being used the integration model from the appwrite database
// export interface Integration {
//   $id: number;
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
//   integrationDetails?:
//   {
//     fullDescription: string;
//     pros: string[];
//     cons: string[];
//     documentations: string;
//     useCases: string[];
//   };
// }

const response = await database.listDocuments(
  import.meta.env.VITE_DATABASE_ID_VEELOTU,
  import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
  [Query.orderDesc("$createdAt"), Query.limit(30)]
);

export const latestIntegrations = response.documents

export async function saveIntegration(integration: NewIntegration) {
  const innerID = ID.unique();
  const responseInnerCollection = await database.createDocument(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATION_DETAILS,
    innerID,
    integration.integrationDetails ?? {},
    []
  );

  const response = await database.createDocument(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
    ID.unique(),
    {...integration, integrationDetails: innerID},
    []
  );
  return {response, responseInnerCollection}
}

const functions = new Functions(client);

export async function getIntegrationCompletion(integrationName: string) {
  const response = await functions.createExecution(
    import.meta.env.VITE_FUNCTION_ID_COMPLETION,
    '', // body (optional)
    true, // async (optional)
    `/?prompt=${encodeURIComponent(integrationName)}`, // path (optional)
    ExecutionMethod.GET, // method (optional)
    {}, // headers (optional)
  );
  return response
}

export default function appwriteProvider() {
  return {
    getIntegrations,
    getIntegrationsByCategory,
    getIntegrationsByIndustry,
    saveIntegration,
    getIntegrationCompletion,
  }
}

