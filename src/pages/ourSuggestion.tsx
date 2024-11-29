import { useState } from "react";
import { useParams } from "react-router-dom";
import IntegrationCardV2 from "../components/IntegrationCard_v2";
import { getSuggestion } from "../context/appwriteProvider";

type paramsResults = {
  mainSuggestion: {
    explanation: string;
  } | null;
  relatedIntegrations: unknown[];
  comparisons: unknown[];
  alternatives: {
    title: string;
    description: string;
  }[];
};

export default function NeedsResultPage() {
  const { query } = useParams<{ query: string }>();
  const prompt = new URLSearchParams(query).get('prompt');

  const completion = await getSuggestion(prompt);

  const [results, setResults] = useState({
    mainSuggestion: null,
    relatedIntegrations: [],
    comparisons: [],
    alternatives: []
  } as paramsResults);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Main solution suggestion */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Solución recomendada</h2>
        <div className="prose">
          <p>{results.mainSuggestion?.explanation}</p>
        </div>
      </div>

      {/* Integration comparisons */}
      <div className="grid md:grid-cols-2 gap-6">
        {results.relatedIntegrations.map(integration => (
          <IntegrationCardV2
            key={integration.$id}
            integration={integration}
            // showComparison
          />
        ))}
      </div>

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
  );
}