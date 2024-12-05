import { Link, useLocation } from 'react-router-dom';
import { 
  Code2, 
  Blocks, 
  Tags, 
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  XCircle,
  Activity,
  BookOpen,
  ArrowUpRightFromSquare,
  Clock,
  Users,
  Zap,
  Settings,
  Heart
} from 'lucide-react';
import { Integration as IntegrationType } from '../types/integration';
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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              {integration.icon ? (
                <img 
                  src={integration.icon} 
                  alt={integration.name} 
                  className="w-20 h-20 object-contain rounded-lg border border-gray-100 p-2" 
                  onError={(e) => {e.currentTarget.src = "/workflow.svg"}}
                />
              ) : (
                <div className="p-6 bg-indigo-100 rounded-lg">
                  <Code2 className="w-8 h-8 text-indigo-600" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{integration.name}</h1>
                {integration.recommended && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                    <Heart className="w-4 h-4 mr-1" /> Recomendado
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">{integration.description}</p>
              <div className="flex items-center gap-4">
                {integration.integrationDetails?.documentations && (
                  <a
                    href={integration.integrationDetails.documentations}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Documentación
                  </a>
                )}
                <Link 
                  to={`/category/${parameterize(integration.category ?? 'unknown')}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Blocks className="w-4 h-4 mr-2" />
                  Ver categoría
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2">
              <Activity className="w-4 h-4 mr-2" />
              <h3 className="text-sm font-medium">Nivel de Complejidad</h3>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{integration.complexityLevel}</p>
              <p className="ml-2 text-sm text-gray-500">/100</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              <h3 className="text-sm font-medium">Tiempo Estimado</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {integration.complexity === 'Baja' ? '1-3 días' : 
               integration.complexity === 'Media' ? '1-2 semanas' : 
               integration.complexity === 'Alta' ? '2-4 semanas' : 'Variable'}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2">
              <Users className="w-4 h-4 mr-2" />
              <h3 className="text-sm font-medium">Requiere Desarrollador</h3>
            </div>
            <div className="flex items-center">
              {integration.requireDev ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-lg font-medium text-gray-900">Sí</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-lg font-medium text-gray-900">No</span>
                </>
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2">
              <BadgeDollarSign className="w-4 h-4 mr-2" />
              <h3 className="text-sm font-medium">Modelo de Precio</h3>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Tech Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Technical Requirements */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Requisitos Técnicos</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Tipo de Integración</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {integration.kindOf || 'No especificado'}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Industria</h3>
                <Link 
                  to={`/${parameterize(integration.industry ?? 'unknown')}`}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  <Building2 className="w-4 h-4 mr-1" />
                  {integration.industry || 'No especificada'}
                  <ArrowUpRightFromSquare className='w-3 h-3 ml-1'/>
                </Link>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categoría</h3>
                <Link 
                  to={`/category/${parameterize(integration.category ?? 'unknown')}`}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  <Blocks className="w-4 h-4 mr-1" />
                  {integration.category || 'No especificada'}
                  <ArrowUpRightFromSquare className='w-3 h-3 ml-1'/>
                </Link>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tags className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {integration.tags?.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Integration Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Description */}
          {integration.integrationDetails?.fullDescription && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Descripción Detallada</h2>
              </div>
              <div className="prose prose-sm max-w-none">
                <p>{integration.integrationDetails.fullDescription}</p>
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Pros y Contras</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">Beneficios</h3>
                <ul className="space-y-3">
                  {integration.integrationDetails?.pros?.map((pro, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">Limitaciones</h3>
                <ul className="space-y-3">
                  {integration.integrationDetails?.cons?.map((con, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          {integration.integrationDetails?.useCases && integration.integrationDetails.useCases.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Casos de Uso</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integration.integrationDetails.useCases.map((useCase, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{useCase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}