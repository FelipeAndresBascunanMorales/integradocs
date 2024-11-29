import { database, ID } from './appwriteProvider.js';
import { askForOneIntegration, askForManyIntegrations } from './chatGPT.js';
import { throwIfMissing } from './utils.js';

export default async ({ req, log, res, error }) => {
  log("everything will be alright");
  log("req", req);
  throwIfMissing(process.env, ['OPENAI_API_KEY']);
  let htmlResponse = '<html><body><div>integration not found</div></body></html>'
  if (req.method === 'GET' && req.params?.prompt) {
    try {
      const integration = await getIntegration(req, log);
      const {integrationDocument, integrationsDetailsDocument} = await writeToCollection(integration);
      htmlResponse = `<html><body><h1>Integration successfully retrieved and stored.</h1><div>${integrationDocument}</div><div>${integrationsDetailsDocument}</div></body></html>`

    }
    catch (err) {
      return res.json({ ok: false, error: err }, 400);
    }
    return res.text(
      htmlResponse
      , 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  if (req.method === 'GET' && req.query?.prompt) {
    try {
      const integration = await getIntegration(req, log);
      return res.json({ ok: true, integration }, 200);
    }
    catch (err) {
      return res.json({ ok: false, error: err }, 400);
    }
  }


  if (req.method === 'POST') {
    try {
      const integrationRequirement = JSON.stringify(req.body.integrations);
      const integrationsList = await askForManyIntegrations(integrationRequirement, log, error);

      log("integrationsList", integrationsList);
      await Promise.all(integrationsList.map(async integration => {
        const {integrationDocument, integrationsDetailsDocument} = await writeToCollection(integration);
        log("integrations", integrationDocument);
        log("integrationsDetails", integrationsDetailsDocument);
      }));
    }
    catch (err) {
      error("something wroooong!", err);
      return res.json({ ok: false, error: err }, 400);
    }

    return res.json({ ok: false, error: 'Failed to query model.' }, 500);
  };
  return res.json({ ok: true }, 201);
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

