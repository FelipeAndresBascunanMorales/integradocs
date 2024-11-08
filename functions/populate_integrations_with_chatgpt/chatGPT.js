import OpenAI from 'openai';

const openai = new OpenAI();

async function askForOneIntegration(kindOfIntegration = 'i need to manage the products and medicine of my local pharmacy') {
  try {
    
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  temperature: 0.2,
  messages: [
    {
      "role": "system",
      "content": [
        {
          "text": "You are an integrations specialist,we need to populate our database with accurate data, because of that, you must return an integration json object format using real info from the web acording to what the user require",
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
  max_tokens: 2048,
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
          "icon",
          "integrationDetails"
        ],
        "properties": {
          "icon": {
            "type": "string",
            "description": "A URL pointing to the icon of the company that provide the integration."
          },
          "name": {
            "type": "string",
            "description": "The name of the integration itself."
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "For any important Tags associated with the integration."
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
            "description": "The type of the Integration or the kind of technology that must be used."
          },
          "pricing": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Levels of pricing for the service like freemium free enterprise or any other."
          },
          "category": {
            "type": "string",
            "description": "The category that the integration belongs to."
          },
          "industry": {
            "type": "string",
            "description": "The industry relevant to the integration."
          },
          "complexity": {
            "type": "string",
            "description": "The complexity the integration have in words."
          },
          "requireDev": {
            "type": "boolean",
            "description": "Indicates if development resources are required."
          },
          "description": {
            "type": "string",
            "description": "A brief description of the Integration."
          },
          "recommended": {
            "type": "boolean",
            "description": "Indicates if the application is between the recommended."
          },
          "complexityLevel": {
            "type": "integer",
            "description": "The complexity level ranging from 0 to 100."
          },
          "integrationDetails": {
            "type": "object",
            "description": "more specific attributes.",
            "required": [
              "fullDescription",
              "pros",
              "cons",
              "documentations",
              "useCases"
            ],
            "properties": {
              "fullDescription": {
                "type": "string",
                "description": "accurate description of the integration."
              },
              "pros": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "a list with the pros of the integration. if any."
              },
              "cons": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "a list with the cons of the integration. if any."
              },
              "documentations": {
                "type": "string",
                "description": "a link to the official documentation for the integration."
              },
              "useCases": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "most common use cases for the integration."
              },
              "supportedPlatforms": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "List of platforms supported by the integration."
              },
              "supportedTechnologies": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "List of technologies supported by the integration."
              }
            },
            "additionalProperties": false
          }
        },
        "additionalProperties": false
      },
      "strict": true
    }
  },
});

    const jsonResponse = response.choices[0].message.content;
    return JSON.parse(jsonResponse);
  }catch (err) {
    throw new Error("Error in conversation: " + err);
  }
}

async function askForManyIntegrations() {
return [];
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


  export { askForIntegrationList, askForOneIntegration, askForManyIntegrations };