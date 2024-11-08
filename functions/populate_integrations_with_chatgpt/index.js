import { database, ID } from './appwriteProvider.js';
import { askForOneIntegration } from './chatGPT.js';
import { throwIfMissing } from './utils.js';

export default async ({ req, log, res }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY']);
  if (req.method === 'GET') {
    const param = req.query.prompt;
    const chatGptResponse = await askForOneIntegration(param);
  
    log("chatGptResponse", chatGptResponse);

    try {
      const innerID = ID.unique();
      const integrationsDetails = await database.createDocument (
        process.env.DATABASE_ID_VEELOTU,
        process.env.COLLECTION_ID_INTEGRATION_DETAILS,
        innerID,
        chatGptResponse.integrationDetails,
        []
      );

      const integrations = await database.createDocument (
        process.env.DATABASE_ID_VEELOTU,
        process.env.COLLECTION_ID_INTEGRATIONS,
        ID.unique(),
        {...chatGptResponse, integrationDetails: innerID},
        []
      );

      log("integrations", integrations);
      log("integrationsDetails", integrationsDetails);
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
