// import { Client, Users } from 'node-appwrite';
import { askForIntegrationSuggestion } from './chatGPT.js';

export default async ({ req, res, log, error }) => {

  // const client = new Client()
  //   .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
  //   .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  //   .setKey(req.headers['x-appwrite-key'] ?? '');

  // const users = new Users(client);

  if (req.method === 'GET' && req.query?.prompt) {
    try {
      // return res.json({ ok: true, response: `I received your prompt ${req.query.prompt}` }, 200);
      const response = await getAssistantResponse(req, log);
      return res.json({ ok: true, response }, 200);
    }
    catch (err) {
      return res.json({ ok: false, error: err }, 400);
    }
  }
  
  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  return res.json({
    maybe: "you should provide a prompt",
  });

  async function getAssistantResponse(req, log) {
    const param = req.query?.prompt;
    log("before the call to askForIntegrationSuggestion");
    const chatGptResponse = await askForIntegrationSuggestion(param, log);
    return chatGptResponse;
  }

};
