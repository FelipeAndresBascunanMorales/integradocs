import { Link, useLocation } from 'react-router-dom';
import { 
  Code2, 
  Blocks, 
  Cpu, 
  Tags, 
  BadgeDollarSign, 
  Building2, 
  CheckCircle2, 
  XCircle,
  FileCode2,
  Activity,
  BookOpen,
  ArrowUpRightFromSquare
} from 'lucide-react';
import { Integration as IntegrationType} from '../types/integration';
import { parameterize } from '../lib/utils';

export function Integration() {
  const location = useLocation();
  const integration = location?.state as IntegrationType;

  if (!integration) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Integración no encontrada</h1>
        <p className="mt-2 text-gray-600">La integración que buscas no existe.</p>
        <Link to={-1 as unknown as string} className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
          Volver
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {integration.icon ? (
              <img src={integration.icon} alt={integration.name} className="w-16 h-auto object-contain" onError={(e) => {e.currentTarget.src = "/workflow.svg"}}/>
            ) : (
              <div className="p-4 bg-indigo-100 rounded-lg">
                <Code2 className="w-8 h-8 text-indigo-600" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{integration.name}</h1>
              <p className="mt-2 text-gray-600">{integration.description}</p>
            </div>
          </div>
          {integration.recommended && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Recomendado
            </span>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg space-y-1">
            <div className="flex items-center text-gray-500">
              <Blocks className="w-4 h-4 mr-2" />
              <h3 className="text-sm font-medium">Tipo</h3>
            </div>
            <p className="text-lg font-medium text-gray-900">{integration.kindOf || 'No especificado'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg space-y-1">
            <div className="flex items-center text-gray-500">
              <Cpu className="w-4 h-4 mr-2" />
              <h3 className="text-sm font-medium">Complejidad</h3>
            </div>
            <p className="text-lg font-medium text-gray-900">{integration.complexity || 'No especificada'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg space-y-1">
            <div className="flex items-center text-gray-500">
              <BadgeDollarSign className="w-4 h-4 mr-2" />
              <h3 className="text-sm font-medium">Pricing</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {integration.pricing?.map((price) => (
                <span key={price} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {price}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Tags */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tags className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {integration.tags?.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FileCode2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Detalles Técnicos</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Nivel de Complejidad:</span>
                <span className="font-medium">{integration.complexityLevel}/100</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Industria:</span>
                <span className="font-medium">{integration.industry || 'No especificada'}</span>
                <Link to={`/${parameterize(integration.industry ?? 'unknown')}`}> <ArrowUpRightFromSquare className='w-4 h-4'/> </Link>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Categoría:</span>
                <span className="font-medium">{integration.category || 'No especificada'}</span>
                {<>{console.log(parameterize(integration.categoryDetails?.name || integration.category || 'unknown'))}</>}
                <Link to={`/category/${parameterize(integration.categoryDetails?.name || integration.category || 'unknown')}`}> <ArrowUpRightFromSquare className='w-4 h-4'/> </Link>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Requiere Desarrollador:</span>
                {integration.requireDev ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Integration Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Detalles de Integración</h2>
            </div>
            
            {integration.integrationDetails && (
              <div className="space-y-6">
                {integration.integrationDetails.fullDescription && (
                  <div className="prose prose-sm max-w-none">
                    <p>{integration.integrationDetails.fullDescription}</p>
                  </div>
                )}

                {/* Pros & Cons */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Pros</h3>
                    <ul className="space-y-1">
                      {integration.integrationDetails.pros?.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                          <span className="text-sm text-gray-600">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Contras</h3>
                    <ul className="space-y-1">
                      {integration.integrationDetails.cons?.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                          <span className="text-sm text-gray-600">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Use Cases */}
                {integration.integrationDetails.useCases && integration.integrationDetails.useCases.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Casos de Uso</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {integration.integrationDetails.useCases.map((useCase, index) => (
                        <li key={index} className="text-sm text-gray-600">{useCase}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Documentation Link */}
                {integration.integrationDetails.documentations && (
                  <div className="pt-4">
                    <a
                      href={integration.integrationDetails.documentations}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Ver Documentación</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}