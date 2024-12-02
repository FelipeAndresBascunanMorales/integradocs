import OpenAI from 'openai';
import { integrationSchema, integrationListSchema } from './models/integrationSchema.js';

const openai = new OpenAI();

async function askForIntegrationSuggestion(params = "El usuario no completó el prompt, puedes dar una respuesta de ejemplo para el usuario", log) {
  try {
    const run = await openai.beta.threads.createAndRun({
      assistant_id: "asst_d68O0eivNvOexVnVH73hMbSZ",
      thread: {
        messages: [
          { role: "user", content: params },
        ],
      },
    });
    
    log("through the run")
    setTimeout(async () => {
      const runNewState = await openai.beta.threads.runs.retrieve(
        run.thread_id,
        run.id
      );
      return runNewState.messages;
    }, 5000);

  }catch (err) {
    throw new Error("Error in requireIntegrationList: " + err);
  }
}

  export { askForIntegrationSuggestion };