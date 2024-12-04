import { Client, Databases, Query, Models, ID, Functions, ExecutionMethod} from 'appwrite';
import { Integration, NewIntegration } from '../types/integration';
import { Category } from '../types/category';

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")  
.setProject(import.meta.env.VITE_APPWRITE_FUNCTION_PROJECT_ID)

const database = new Databases(client);

export interface ParamsResults {
  mainSuggestion: {
    explanation: string;
  } | null;
  categories: {
    name: string;
    relatedIntegrations: {
      title: string;
      description: string;
      benefits: string[];
      insights: string[];
    }[];
  }[]
  alternatives: {
    title: string;
    description: string;
    category: string;
  }[];
};


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

export async function getCategories() {
  const response = await database.listDocuments(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_CATEGORIES,
    []
  );
  return response
}

export async function getCategory(category: string) {
  const response = await database.listDocuments(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_CATEGORIES,
    [Query.search("name", category)]
  );
  return response.documents[0] as Category
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

const responseLatestIntegrations = await database.listDocuments(
  import.meta.env.VITE_DATABASE_ID_VEELOTU,
  import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
  [Query.orderDesc("$createdAt"), Query.limit(30)]
);

export const latestIntegrations = responseLatestIntegrations.documents as Integration[];

export async function saveIntegration(integration: NewIntegration) {
  const integrationDetailsID = ID.unique();
  const categoryDetailsID = ID.unique();
  const integrationID = ID.unique();

  const responseIntegrationDetails = await database.createDocument(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATION_DETAILS,
    integrationDetailsID,
    integration.integrationDetails ?? {},
    []
  );

  const responseCategoryDetails = await database.createDocument(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_CATEGORIES,
    categoryDetailsID,
    integration.categoryDetails ?? {},
    []
  );

  const responseIntegration = await database.createDocument(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS,
    integrationID,
    {...integration, integrationDetails: integrationDetailsID, categoryDetails: categoryDetailsID},
    []
  );

  // const updatedCategory = await database.updateDocument(
  //   import.meta.env.VITE_DATABASE_ID_VEELOTU,
  //   import.meta.env.VITE_COLLECTION_ID_CATEGORIES,
  //   categoryDetailsID,
  //   {
  //     relatedIntegrations: [
  //       ...integration.categoryDetails?.relatedIntegrations ?? [],
  //       {title: integration.name, description: integration.description, benefits: [], insights: []}
  //     ]
  //   }
  // );
  
  return {responseIntegration, responseIntegrationDetails}
}

const functions = new Functions(client);

export async function getIntegrationCompletion(integrationName: string) {
  const response = await functions.createExecution(
    import.meta.env.VITE_FUNCTION_ID_COMPLETION,
    '', // body (optional)
    false, // async (optional)
    `/?prompt=${encodeURIComponent(integrationName)}`, // path (optional)
    ExecutionMethod.GET, // method (optional)
    {}, // headers (optional)
  );
  return response
}

export async function getSuggestion(integrationName: string) {
  const response = await functions.createExecution(
    import.meta.env.VITE_FUNCTION_ID_SUGGESTION,
    '', // body (optional)
    false, // async (optional)
    `/?prompt=${encodeURIComponent(integrationName)}`, // path (optional)
    ExecutionMethod.GET, // method (optional)
    {}, // headers (optional)
  );
  const parsedResponse = await JSON.parse(response.responseBody)
  const parsed = await JSON.parse(parsedResponse.data) as ParamsResults;

  return parsed
}

export async function submitContactForm(formData: { name: string; email: string; message: string; company: string; phone: string; }) {
  const response = await database.createDocument(
    import.meta.env.VITE_DATABASE_ID_VEELOTU,
    import.meta.env.VITE_COLLECTION_ID_CONTACTS,
    ID.unique(),
    formData,
    []
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
    getCategories,
    getCategory,
  }
}

