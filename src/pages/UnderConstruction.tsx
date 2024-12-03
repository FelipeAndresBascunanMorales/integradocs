import { Construction } from 'lucide-react';

function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <Construction className="h-24 w-24 text-indigo-600 mx-auto mb-8 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Página en Construcción
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Estamos trabajando para brindarte la mejor experiencia. ¡Vuelve pronto!
        </p>
        <div className="flex justify-center space-x-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-900 mb-2">Mientras tanto...</h2>
            <p className="text-gray-600">
              Puedes explorar nuestro catálogo de integraciones o contactarnos directamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;