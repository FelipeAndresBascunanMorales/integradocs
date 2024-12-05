import { ExecutionMethod } from 'appwrite';
import { Client, Users, Functions } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  try {
    //call the other function
    const functions = new Functions(client);
    const result = await functions.createExecution(
      process.env.POPULATE_INTEGRATIONS_FUNCION_ID,
      "cron: */10 * * * 3",
      false,
      "",
      ExecutionMethod.POST,
      {},
    );

    log("Function triggered successfully", result);
    

    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
  } catch(err) {
    error("error triggering the other funcion: " + err.message);
  }

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};
