import { database, ID } from './appwriteProvider.js';
import { askForIntegrationList } from './chatGPT.js';
import { throwIfMissing } from './utils.js';

export default async ({ req, log, res }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY']);

  const chatGptResponse = askForIntegrationList();

  log("chatGptResponse", chatGptResponse);
  if (req.method === 'GET') {

    try {
      const response1 = await database.createDocument (
        process.env.DATABASE_ID_VEELOTU,
        process.env.COLLECTION_ID_INTEGRATIONS,
        ID.unique(),
        chatGptResponse,
        []
      );

      log("response1", response1);
    }
    catch (err) {
      return res.json({ ok: false, error: err }, 400);
    }
    return res.text("hi mom!", 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }
    return res.json({ ok: false, error: 'Failed to query model.' }, 500);
};
