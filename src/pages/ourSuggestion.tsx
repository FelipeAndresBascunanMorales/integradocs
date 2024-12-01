import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IntegrationCardV2 from "../components/IntegrationCard_v2";
import { getSuggestion } from "../context/appwriteProvider";
import { useIntegrations } from "../context/integrationsData";
import { Blocks } from 'lucide-react'

type paramsResults = {
  mainSuggestion: {
    explanation: string;
  } | null;
  relatedIntegrations: {
    title: string;
    description: string;
  }[];
  alternatives: {
    title: string;
    description: string;
  }[];
};

export default function NeedsResultPage() {
  const { query } = useParams<{ query: string }>();
  const prompt = new URLSearchParams(query).get('prompt');
  const completion = getSuggestion(prompt || '');
  const [isLoading, setIsLoading] = useState(true);
  const { integrations } = useIntegrations();
  const showOldVersion = false;

  const [results, setResults] = useState({
    mainSuggestion: null,
    relatedIntegrations: [],
    alternatives: []
  } as paramsResults);

  useEffect(() => {
    async function getResults() {
      setIsLoading(true);
      try {
        const completion = await getSuggestion(query) as JSON;
        // Assuming completion returns a suggestion string
        // We can parse it and match with existing integrations
        const parsedResults = {
          mainSuggestion: {
            explanation: completion,
            recommendedApproach: "Based on your needs..."
          },
          // Filter integrations based on the completion content
          relatedIntegrations: integrations.filter(integration =>
            integration.description.toLowerCase().includes(query.toLowerCase()) ||
            integration.category?.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 3),
          alternatives: []
        };

        setResults(parsedResults);
      } catch (error) {
        console.error('Error getting suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      getResults();
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Analizando tu necesidad...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Resultados para: "{query}"</h1>
          <div className="prose max-w-none">
            <p>{results.mainSuggestion?.explanation}</p>
          </div>
        </div>

        {results.relatedIntegrations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Integraciones recomendadas</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {results.relatedIntegrations.map((integration) => (
            <div
              key={integration.title}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
            >
              <Blocks className="h-8 w-8 mx-auto text-indigo-600" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {integration.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{integration.description}</p>
            </div>
          ))}
        </div>
          </div>
        )}
{/* 
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Comparación de soluciones</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {results.relatedIntegrations.slice(0, 2).map(integration => (
              <div key={integration.id} className="bg-white p-4 rounded-lg">
                <h3 className="font-medium">{integration.name}</h3>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Complejidad:</span>
                    <span>{integration.complexity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Costo:</span>
                    <span>{integration.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

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
          {/* Main solution suggestion */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Solución recomendada</h2>
            <div className="prose">
              <p>{results.mainSuggestion?.explanation}</p>
            </div>
          </div>

          {/* Integration comparisons */}
          {/* <div className="grid md:grid-cols-2 gap-6">
            {results.relatedIntegrations.map(integration => (
              <IntegrationCardV2
                key={integration.title}
                integration={integration}
              // showComparison
              />
            ))}
          </div> */}

          {/* Alternative approaches */}
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

          {/* Quick contact for more help */}
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