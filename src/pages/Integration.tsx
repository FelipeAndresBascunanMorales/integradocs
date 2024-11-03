import { useParams } from 'react-router-dom';
import { CreditCard, Calendar, BarChart, Truck, Package } from 'lucide-react';

const integrationData = {
  transbank: {
    name: 'Transbank',
    description: 'Procesa pagos con tarjetas de crédito y débito en Chile',
    icon: CreditCard,
    category: 'Pagos',
    complexity: 'Media',
    cost: 'Pago',
    developerRequired: true,
    documentation: 'https://www.transbankdevelopers.cl/',
    steps: [
      'Crear una cuenta de desarrollador en Transbank',
      'Obtener las credenciales de integración',
      'Implementar el SDK en tu aplicación',
      'Realizar pruebas en ambiente de desarrollo',
      'Solicitar paso a producción'
    ],
    requirements: [
      'Sitio web con certificado SSL',
      'Conocimientos de programación',
      'Contrato con Transbank'
    ]
  },
  'agenda-pro': {
    name: 'Agenda Pro',
    description: 'Sistema de agendamiento para profesionales de la salud',
    icon: Calendar,
    category: 'Agendamiento',
    complexity: 'Baja',
    cost: 'Freemium',
    developerRequired: false,
    documentation: 'https://agendapro.com/developers',
    steps: [
      'Registrarse en Agenda Pro',
      'Configurar el calendario y servicios',
      'Integrar el widget de reservas',
      'Personalizar la apariencia',
      'Activar notificaciones'
    ],
    requirements: [
      'Sitio web',
      'Plan activo de Agenda Pro'
    ]
  },
  'google-analytics': {
    name: 'Google Analytics',
    description: 'Análisis de tráfico y comportamiento de usuarios',
    icon: BarChart,
    category: 'Analytics',
    complexity: 'Baja',
    cost: 'Gratis',
    developerRequired: false,
    documentation: 'https://developers.google.com/analytics',
    steps: [
      'Crear una cuenta de Google Analytics',
      'Configurar una propiedad web',
      'Agregar el código de seguimiento',
      'Configurar objetivos y eventos',
      'Verificar la recopilación de datos'
    ],
    requirements: [
      'Cuenta de Google',
      'Sitio web'
    ]
  },
  chilexpress: {
    name: 'Chilexpress',
    description: 'Integración con servicios de envío en Chile',
    icon: Truck,
    category: 'Envíos',
    complexity: 'Media',
    cost: 'Pago',
    developerRequired: true,
    documentation: 'https://developers.chilexpress.cl',
    steps: [
      'Solicitar credenciales de API',
      'Implementar el SDK',
      'Configurar cotización de envíos',
      'Integrar seguimiento de pedidos',
      'Realizar pruebas'
    ],
    requirements: [
      'Contrato con Chilexpress',
      'Conocimientos de programación',
      'Sitio web o aplicación'
    ]
  },
  bsale: {
    name: 'Bsale',
    description: 'Sistema de gestión de inventario y facturación',
    icon: Package,
    category: 'Inventario',
    complexity: 'Alta',
    cost: 'Pago',
    developerRequired: true,
    documentation: 'https://bsale.cl/developers',
    steps: [
      'Crear cuenta en Bsale',
      'Solicitar acceso a la API',
      'Implementar sincronización de productos',
      'Configurar facturación electrónica',
      'Realizar pruebas de integración'
    ],
    requirements: [
      'Plan activo de Bsale',
      'Conocimientos de programación',
      'Sistema de comercio electrónico'
    ]
  }
};

export function Integration() {
  const { id } = useParams<{ id: string }>();
  const integration = integrationData[id as keyof typeof integrationData];

  if (!integration) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Integración no encontrada</h1>
        <p className="mt-2 text-gray-600">La integración que buscas no existe.</p>
      </div>
    );
  }

  const Icon = integration.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Icon className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{integration.name}</h1>
            <p className="mt-1 text-lg text-gray-600">{integration.description}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{integration.category}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Complejidad</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{integration.complexity}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Costo</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{integration.cost}</p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Requisitos</h2>
        <ul className="list-disc list-inside space-y-2">
          {integration.requirements.map((requirement, index) => (
            <li key={index} className="text-gray-600">{requirement}</li>
          ))}
        </ul>
      </div>

      {/* Integration Steps */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pasos de Integración</h2>
        <div className="space-y-4">
          {integration.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600">{index + 1}</span>
              </div>
              <p className="text-gray-600 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Documentación</h2>
        <p className="text-gray-600 mb-4">
          Para más detalles sobre la integración, consulta la documentación oficial:
        </p>
        <a
          href={integration.documentation}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ver Documentación
        </a>
      </div>
    </div>
  );
}