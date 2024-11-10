const integrationSchema = {
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
          "description": "A brief description of the Integration in less that 200 characters."
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
            "useCases",
            "supportedPlatforms",
            "supportedTechnologies"
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
    "strict": false
  }
};

const integrationListSchema =
{
  "type": "json_schema",
  "json_schema": {
    "name": "specification_schema",
    "schema": {
      "type": "object",
      "required": ["integrations"],
      "properties": {
        "integrations": {
          "type": "array",
          "description": "List of integrations",
          "items": {
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
                "description": "A brief description of the Integration in less that 200 characters."
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
                  "useCases",
                  "supportedPlatforms",
                  "supportedTechnologies"
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
        }
      },
      "additionalProperties": false
    },
    "strict": false
  }
};

export { integrationSchema, integrationListSchema };
