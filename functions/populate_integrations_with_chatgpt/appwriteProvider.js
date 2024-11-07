import { ID, Client, Databases} from 'node-appwrite';

const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")  
.setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)

const database = new Databases(client);
export { database, ID };