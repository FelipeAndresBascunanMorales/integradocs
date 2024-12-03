import { askForIntegrationSuggestion } from './chatGPT.js';

export default async ({ req, res, log, error }) => {

  if (req.method === 'GET' && req.query?.prompt) {
    log("the prompt in the function", req.query?.prompt);
    try {
      const response = await getAssistantResponse(req, log);
      return res.json({ ok: true, data: response }, 200);
    }
    catch (err) {
      return res.json({ ok: false, error: err }, 400);
    }
  }

  return res.json({
    maybe: "you should provide a prompt",
  });

  async function getAssistantResponse(req, log) {
    const param = req.query?.prompt;
    const chatGptResponse = await askForIntegrationSuggestion(param, log);
    return chatGptResponse;
  }

};
