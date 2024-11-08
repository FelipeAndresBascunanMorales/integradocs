import { database, ID } from './appwriteProvider.js';
import { askForOneIntegration, askForManyIntegrations } from './chatGPT.js';
import { throwIfMissing } from './utils.js';

export default async ({ req, log, res }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY']);
  if (req.method === 'GET') {
    try {
      const integration = await getIntegration(req, log);
      log("chatGptResponse", integration);
      const {integrationDocument, integrationsDetailsDocument} = await writeToCollection(integration);
      log("integrations", integrationDocument);
      log("integrationsDetails", integrationsDetailsDocument);
    }
    catch (err) {
      return res.json({ ok: false, error: err }, 400);
    }
    return res.text("hi mom!", 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  if (req.method === 'POST') {
    try {
      // take the body
      const integration = req.body;
      await askForManyIntegrations(integration, log);
      // something like, generate a json object for each of this integrations
      // and then write to the database

    }
    catch (err) {
      return res.json({ ok: false, error: err }, 400);
    }

    return res.json({ ok: false, error: 'Failed to query model.' }, 500);
  };
  return res.json({ ok: false, error: 'Method not allowed' }, 405);
}

async function getIntegration(req, log) {
  const param = req.query.prompt;
  const chatGptResponse = await askForOneIntegration(param, log);
  return chatGptResponse;
}

async function writeToCollection(integration) {
  const innerID = ID.unique();
  const integrationsDetailsDocument = await database.createDocument (
    process.env.DATABASE_ID_VEELOTU,
    process.env.COLLECTION_ID_INTEGRATION_DETAILS,
    innerID,
    integration.integrationDetails,
    []
  );

  const integrationDocument = await database.createDocument (
    process.env.DATABASE_ID_VEELOTU,
    process.env.COLLECTION_ID_INTEGRATIONS,
    ID.unique(),
    {...integration, integrationDetails: innerID},
    []
  );

  return {integrationDocument, integrationsDetailsDocument};
}

