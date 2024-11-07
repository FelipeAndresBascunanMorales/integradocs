import OpenAI from 'openai';

const openai = new OpenAI();

async function askForOneIntegration(kindOfIntegration = 'i need to manage the products and medicine of my local pharmacy') {
  try {
    
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "text": "You are an integrations specialist, you must return an integration in a json object format using real info from the real world acording the integration needs of the user",
          "type": "text"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "text": "i have to send tickets to access an online live transmition ",
          "type": "text"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "text": "{\"complexityLevel\":30,\"requireDev\":false,\"kindOf\":\"NoCode\",\"name\":\"Eventbrite\",\"description\":\"A platform for creating, promoting, and selling tickets for various events including online live transmissions.\",\"complexity\":\"Moderate\",\"recommended\":true,\"tags\":[\"event management\",\"ticketing\",\"online event\"],\"pricing\":[\"Free\",\"Paid plans starting from $1 per ticket sold\"],\"category\":\"Event Management\",\"industry\":\"Entertainment\",\"icon\":\"https://www.eventbrite.com/platforms/icon.png\"}",
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
  temperature: 1,
  max_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  response_format: {
    "type": "json_schema",
    "json_schema": {
      "name": "specification_schema",
      "schema": {
        "type": "object",
        "required": [
          "complexityLevel",
          "requireDev",
          "kindOf",
          "name",
          "description",
          "complexity",
          "recommended",
          "tags",
          "pricing",
          "category",
          "industry",
          "icon"
        ],
        "properties": {
          "icon": {
            "type": "string",
            "description": "A URL pointing to the icon of the application."
          },
          "name": {
            "type": "string",
            "description": "The name of the application."
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Tags associated with the application."
          },
          "kindOf": {
            "enum": [
              "API",
              "LowCode",
              "NoCode",
              "Service",
              "Idontknow"
            ],
            "type": "string",
            "description": "The type of the application."
          },
          "pricing": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Pricing information for the application."
          },
          "category": {
            "type": "string",
            "description": "The category that the application belongs to."
          },
          "industry": {
            "type": "string",
            "description": "The industry relevant to the application."
          },
          "complexity": {
            "type": "string",
            "description": "The complexity of the application."
          },
          "requireDev": {
            "type": "boolean",
            "description": "Indicates if development resources are required."
          },
          "description": {
            "type": "string",
            "description": "A brief description of the application."
          },
          "recommended": {
            "type": "boolean",
            "description": "Indicates if the application is recommended."
          },
          "complexityLevel": {
            "type": "integer",
            "description": "The complexity level ranging from 0 to 100."
          }
        },
        "additionalProperties": false
      },
      "strict": true
    }
  },
});

    const jsonResponse = response.choices[0].message.content;
    return jsonResponse;
  }catch (err) {
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


  export { askForIntegrationList, askForOneIntegration };