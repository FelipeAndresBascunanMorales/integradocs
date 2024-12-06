import OpenAI from 'openai';

const openai = new OpenAI();

async function askForIntegrationSuggestion(prompt = "El usuario no completó el prompt correctamente, provee una respuesta estandard de ejemplo para el usuario", log) {
  try {
    let run = await openai.beta.threads.createAndRun({
      assistant_id: "asst_d68O0eivNvOexVnVH73hMbSZ",
      // assistant_id: "asst_vIDVejCoGnE6cAE2qfz3cHlq", //new assistant a little bit disrespectful
      thread: {
        messages: [
          { role: "user", content: prompt },
        ],
      },
    });
    
    while (run.status === "running" || run.status === "queued" || run.status === "in_progress") {
      log("in the while", run.thread_id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(
        run.thread_id,
        run.id
      );
    }

    const messages = await openai.beta.threads.messages.list(
      run.thread_id
    );

    return messages.data[0].content[0].text.value;

  }catch (err) {
    throw new Error("Error in requireIntegrationList: " + err);
  }
}

  export { askForIntegrationSuggestion };