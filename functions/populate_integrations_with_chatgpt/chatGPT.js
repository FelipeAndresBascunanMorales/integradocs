import OpenAI from 'openai';
import { integrationSchema, integrationListSchema } from './models/integrationSchema.js';

const openai = new OpenAI();

async function askForOneIntegration(kindOfIntegration = 'i need to manage the products and medicine of my local pharmacy', log) {
  try {
    const systemInstruction = "You are an integrations specialist,we need to populate our database with accurate data, because of that, you must return an integration json object format using real info from the web acording to integration name the user provides. We need your response in spanish always for Chilean users"
    const response = await apiInteraction(systemInstruction, kindOfIntegration, integrationSchema);
    log("***response");
    const jsonResponse = response.choices[0].message.content;
    log("***jsonResponse");
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
    log("***jsonResponse");
    return JSON.parse(jsonResponse)?.integrations;
    }catch (err) {
      error("*** error from chatgpt: " + err);
      throw new Error("Error in conversation: " + err);
    }
}

async function askToComplementTheListWithIntegrations(integrationList, log, error) {
  try {
    const systemInstruction = `Eres un especialista en integraciones tecnológicas para el mercado chileno. 
    Tu objetivo es enriquecer nuestra base de datos con información precisa y relevante para las necesidades locales.
    
    Debes retornar nuevas integraciones detalles precisos en formato JSON, usando información real y actualizada.
    Las integraciones deben considerar:
    - Servicios populares y establecidos en Chile
    - Soluciones que resuelvan problemas específicos del mercado local
    - Compatibilidad con regulaciones chilenas (ej: SII, normativas locales)
    - Opciones tanto para empresas grandes como para PYMEs
    - Deben ser integraciones adicionales a las ya existentes en la base de datos

    Puedes:
    1. Crear nuevas integraciones
    2. Crear nuevas categorías o complementar las categorías ya existentes con integraciones adicionales
    3. Sugerir integraciones que faciliten el cumplimiento normativo chileno
    4. Recomendar soluciones que se adapten al contexto tecnológico local`

    const requirement = `Ya tenemos las siguientes integraciones en nuestra base de datos. 
    Por favor, sugiere qué nuevas integraciones deberíamos agregar para complementar este listado y tener una base de datos robusta y confiable: ${integrationList}`
    const response = await apiInteraction(systemInstruction, requirement, integrationListSchema);
    const jsonResponse = response.choices[0].message.content;
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
          { role: "user", content: "generate an a json for a transbank integration" },
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
    model: "gpt-4o-mini",
    temperature: 0.6,
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
    max_tokens: 4096,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: schema["json_schema"]
    }
  })
}

  export { askForIntegrationList, askForOneIntegration, askForManyIntegrations, askToComplementTheListWithIntegrations };