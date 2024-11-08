import { ReactNode } from "react";
import { IntegrationList } from "./IntegrationList";
import { IntegrationListByCategory } from "./IntegrationListByCategory";
import { Calendar, UserCheck, DollarSign, BarChart, Mail, Share2, Layers, Package, CreditCard, Truck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"


const integrationsByCategory = {
  appointments: {
    title: 'Agendamiento',
    description: 'Herramientas para gestionar citas y horarios',
    icon: Calendar,
  },
  patientRecords: {
    title: 'Historial de Pacientes',
    description: 'Sistemas para almacenar información de pacientes',
    icon: UserCheck,
  },
  billing: {
    title: 'Facturación',
    description: 'Sistemas para gestionar pagos y facturas',
    icon: DollarSign,
  },
  analytics: {
    title: 'Analytics',
    description: 'Herramientas para analizar datos de marketing',
    icon: BarChart,
  },
  emailMarketing: {
    title: 'Email Marketing',
    description: 'Plataformas para enviar correos masivos',
    icon: Mail,
  },
  socialMedia: {
    title: 'Social Media',
    description: 'Herramientas para gestionar redes sociales',
    icon: Share2,
  },
  unknown: {
    title: 'Otras integraciones',
    description: 'Explora otras integraciones disponibles',
    icon: Layers,
  },
  stock: {
    title: 'Inventario',
    description: 'Sistemas para gestionar inventario y stock',
    icon: Package,
  },
  payments: {
    title: 'Pagos',
    description: 'Procesadores de pagos y pasarelas de pago',
    icon: CreditCard,
  },
  shipping: {
    title: 'Envíos',
    description: 'Integraciones con servicios de envío y logística',
    icon: Truck,
  },
}
export default function InnerCategory({ categories, industryId}: { categories: string[] | undefined, industryId : string }) {

  const filteredIntegrations = Object.entries(integrationsByCategory)
  .filter(([industry]) => categories?.includes(industry))
  .flatMap(([_, integrations]) => integrations);

return (
  <div className="bg-gray-50">
      <div className=" ">
        <Accordion type="multiple" defaultValue={filteredIntegrations.map((cat) => cat.title)}>
          {filteredIntegrations.map((category) => (
            <AccordionItem value={category.title}>
            <AccordionTrigger>
              <div className="flex justify-start">
              <category.icon className="h-8 w-8 m-4 text-indigo-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                <p className="mt-2 text-gray-600">{category.description}</p>
              </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <IntegrationListByCategory category={category.title} industryId={industryId} />
            </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>  
{/* 
        <div className="flex justify-start">
            <category.icon className="h-8 w-8 m-4 text-indigo-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
            <p className="mt-2 text-gray-600">{category.description}</p>
          </div>
        </div>
        <div key={category.title} className="p-4">
          <IntegrationListByCategory category={category.title} industryId={industryId} />
        </div>  
      </div> */}

  </div>
);}