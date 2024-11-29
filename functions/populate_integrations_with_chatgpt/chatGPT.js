import OpenAI from 'openai';
import { integrationSchema, integrationListSchema } from './models/integrationSchema.js';

const openai = new OpenAI();

async function askForOneIntegration(kindOfIntegration = 'i need to manage the products and medicine of my local pharmacy', log) {
  try {
    const systemInstruction = "You are an integrations specialist,we need to populate our database with accurate data, because of that, you must return an integration json object format using real info from the web acording to integration name the user provides. We need your response in spanish always for Chilean users"
    const response = await apiInteraction(systemInstruction, kindOfIntegration, integrationSchema);
    log("***response: ", response);
    const jsonResponse = response.choices[0].message.content;
    log("***jsonResponse: ", jsonResponse);
    return JSON.parse(jsonResponse);
  }catch (err) {
    throw new Error("Error in conversation: " + err);
  }
}

async function askForManyIntegrations(integrationRequirement, log, error) {
  try {
    const systemInstruction = "You are an integrations specialist, we need to populate our database with accurate data, because of that, you must return acurate details for each integration in a json object format using real info from the web acording to the list of integrations the user require"
    const requirement = `Generate a list of integrations for each integration requiered here: " ${integrationRequirement}`
    
    const response = await apiInteraction(systemInstruction, requirement, integrationListSchema);
    const jsonResponse = response.choices[0].message.content;
    log("***jsonResponse: ", jsonResponse);
    return JSON.parse(jsonResponse)?.integrations;
    }catch (err) {
      error("*** error from chatgpt: " + err);
      throw new Error("Error in conversation: " + err);
    }
}

async function askForIntegrationList() {
  try {
    const run = await openai.beta.threads.createAndRun({
      assistant_id: "asst_IUZu3929hRbRkgAElXrlR7bn",
      thread: {
        messages: [
          { role: "user", content: "generate an a json for an transbank integration" },
        ],
      },
    });
    

    setTimeout(async () => {
      const runNewState = await openai.beta.threads.runs.retrieve(
        run.thread_id,
        run.id
      );
      return runNewState.messages;
    }, 5000);

    // const thread = await openai.beta.threads.retrieve(run.thread_id);

  }catch (err) {
    throw new Error("Error in requireIntegrationList: " + err);
  }
}

async function apiInteraction(systemInstruction, kindOfIntegration, schema) {
  return await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    messages: [
      {
        "role": "system",
        "content": [
          {
            "text": systemInstruction,
            "type": "text"
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "text": kindOfIntegration,
            "type": "text"
          }
        ]
      }
    ],
    max_tokens: 2048,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: schema["json_schema"]
    }
  })
}

  export { askForIntegrationList, askForOneIntegration, askForManyIntegrations };