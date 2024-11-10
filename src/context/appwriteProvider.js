import { Client, Databases, Query} from 'appwrite';

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")  
.setProject(import.meta.env.VITE_APPWRITE_FUNCTION_PROJECT_ID)

const database = new Databases(client);

const response = await database.listDocuments(
  import.meta.env.VITE_DATABASE_ID_VEELOTU, // databaseId
  import.meta.env.VITE_COLLECTION_ID_INTEGRATIONS, // collectionId
  [Query.orderDesc("$createdAt"), Query.limit(30)]
);
export const latestIntegrations = response.documents

