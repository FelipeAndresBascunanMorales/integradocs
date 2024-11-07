import OpenAI from 'openai-api';

const openai = new OpenAI();

export async function askForIntegrationList(kindOfIntegration = 'what ever you want') {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          { role: "system", content: "You are a helpful integrations assistant." },
          {
              role: "user",
              content: "Write an integration about " + kindOfIntegration,
          },
      ],
    });
    const completionMessage = completion.choices[0].message.content;
    // JSON.stringify(completionMessage);
    return completionMessage;
  }catch (err) {
    throw new Error("Error in requireIntegrationList: " + err);
  }
}



