import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSuggestion, ParamsResults } from "../context/appwriteProvider";
import { useIntegrations } from "../context/integrationsData";
import { Blocks, Check, Lightbulb } from 'lucide-react'
import { parameterize } from "../lib/utils";

const fakeResults = {
  "mainSuggestion": {
      "explanation": "Te recomiendo integrar una plataforma de procesamiento de pagos que sea segura y fácil de usar, para que puedas gestionar transacciones online de manera eficiente. Esto facilitará la experiencia de compra para tus clientes y mejorará la conversión en tu sitio."
  },
  "categories": [
      {
          "name": "Procesadores de Pagos",
          "relatedIntegrations": [
              {
                  "title": "Mercado Pago",
                  "description": "Plataforma líder en procesamiento de pagos en Latinoamérica",
                  "benefits": [
                      "Integración sencilla con varios entornos de e-commerce",
                      "Soporte local y en español",
                      "Herramientas de análisis para el seguimiento de transacciones"
                  ],
                  "insights": [
                      "Permite pagos en cuotas en Chile",
                      "Excelente opción para pequeñas y medianas empresas",
                      "Posibilidad de integrar con plataformas como Shopify y WooCommerce"
                  ]
              },
              {
                  "title": "Kushki",
                  "description": "Pasarela de pagos enfocada en Latinoamérica",
                  "benefits": [
                      "Gran variedad de métodos de pago aceptados",
                      "Soporte para monedas locales",
                      "Integración optimizada para e-commerce"
                  ],
                  "insights": [
                      "Ideal para empresas que desean expandirse en la región",
                      "Ofrece herramientas de prevención de fraudes",
                      "Proceso de integración ágil para desarrolladores"
                  ]
              }
          ]
      }
  ],
  "alternatives": [
      {
          "title": "PayU",
          "description": "Pasarela de pagos con enfoque en Latinoamérica",
          "category": "Procesadores de Pagos"
      },
      {
          "title": "Stripe",
          "description": "Solución robusta para empresas de tecnología",
          "category": "Procesadores de Pagos"
      },
      {
          "title": "PayPal",
          "description": "Famoso sistema de pagos internacional",
          "category": "Procesadores de Pagos"
      }
  ]
}

export default function OurSuggestion() {
  const [searchParams] = useSearchParams()
  const prompt = searchParams.get('prompt') || '';
  const [isLoading, setIsLoading] = useState(true);
  const showOldVersion = false;
  const { integrations } = useIntegrations();

  const [results, setResults] = useState<ParamsResults>({
    mainSuggestion: {
      explanation: '',
    },
    categories: [
      {
        name: 'Example Category',
        relatedIntegrations: [
          {
            title: 'Example Title',
            description: "",
            benefits: [],
            insights: [],
          }
        ]
      }
    ],
    alternatives: [
      {
        title: 'Alternative Title',
        description: 'Alternative Description',
        category: 'Alternative Category',
      }
    ]
  });

  useEffect(() => {
    async function getResults() {
      setIsLoading(true);
      try {
        const completion = await getSuggestion(prompt) || fakeResults; 
        setResults(completion);
        
      } catch (error) {
        console.error('Error getting suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (prompt) {
      getResults();
    }
  }, [prompt]);

  // Memoize the recommended integrations section since it involves mapping
  const recommendedIntegrationsSection = useMemo(() => {
    if (!results.categories[0]?.relatedIntegrations.length) return null;

    return (
      <div>
        
        <h2 className="text-4xl p-4 mb-4 text-center">Integraciones recomendadas</h2>
        {results.categories.map((category) => (
          <div key={category.name}>
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {category.relatedIntegrations.map((integration) => (
                <div className="group flex flex-col h-full text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Link
                    to={`/integration/${parameterize(integration.title)}`}
                    state={ (integrations.find((i) => i.name == integration.title)) }
                    className=""
                  >
                  <div className="flex-1">
                    <Blocks className="h-8 w-8 mx-auto text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {integration.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{integration.description}</p>
                  </div>
                </Link>

                    {(integration.benefits?.length > 0 || integration.insights?.length > 0) && (
                      <div className="mt-4 text-left">
                        {integration.benefits?.length > 0 && (
                          <div className="mb-4">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                              <Check className="h-4 w-4 text-green-500" />
                              Beneficios
                            </h4>
                            <ul className="mt-2 space-y-1">
                              {integration.benefits.map((benefit, index) => (
                                <li key={index} className="text-sm text-gray-600 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-gray-400">
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
              
                        {integration.insights?.length > 0 && (
                          <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                              <Lightbulb className="h-4 w-4 text-amber-500" />
                              Tips
                            </h4>
                            <ul className="mt-2 space-y-1">
                              {integration.insights.map((insight, index) => (
                                <li key={index} className="text-sm text-gray-600 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-gray-400">
                                  {insight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  <Link
                    to={`/integration/${parameterize(integration.title)}`}
                    className="place-self-end mt-auto pt-4 pb-1 text-indigo-600 font-medium hover:text-indigo-500"
                  >
                    ver en detalle
                  </Link>
                </div>
              ))}
            </div>
          </div>))}
      </div>
    );
  }, [results.categories]);

  // Memoize alternatives section for the old version
  const alternativesSection = useMemo(() => {
    if (!showOldVersion) return null;

    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Otras alternativas a considerar</h3>
        <div className="space-y-4">
          {results.alternatives.map((alt, index) => (
            <div key={index} className="bg-white p-4 rounded-lg">
              <h4 className="font-medium">{alt.title}</h4>
              <p className="text-gray-600">{alt.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }, [showOldVersion, results.alternatives]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center ">
          <div className="animate-spin mx-auto rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-700 font-medium">Analizando tu búsqueda...</p>
          <p className="mt-2 text-gray-500">
            <i>
              <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-sky-600 opacity-75 mr-2"></span>
              {prompt}
            </i>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Resultados para: "{prompt}"</h1>
          <div className="prose max-w-none">
            <p>{results.mainSuggestion?.explanation}</p>
          </div>
        </div>

        {recommendedIntegrationsSection}

        <div className="text-center">
          <p className="text-gray-600 mb-4">¿No encontraste lo que buscabas?</p>
          <Link
            to="/all"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Ver todas las integraciones
          </Link>
        </div>
      </div>

      {showOldVersion && (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Solución recomendada</h2>
            <div className="prose">
              <p>{results.mainSuggestion?.explanation}</p>
            </div>
          </div>

          {alternativesSection}

          <div className="text-center">
            <p className="text-gray-600">
              ¿No encontraste lo que buscabas?
            </p>
            <button className="text-indigo-600 font-medium hover:text-indigo-500">
              Contacta con un especialista
            </button>
          </div>
        </div>
      )}
    </>
  );
}