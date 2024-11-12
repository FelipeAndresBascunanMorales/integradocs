import { IntegrationListByCategory } from "./IntegrationListByCategory";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion"
import { useIntegrations } from "../context/integrationsData";
import { Document } from "../context/appwriteProvider";


export default function InnerCategory({ industryId }: { industryId: string }) {

  const { integrationsByIndustry } = useIntegrations();
  const integrations = integrationsByIndustry[industryId]
  if (!integrations) {
    return null;
  }

  const integrationsSortedByCategory = integrations.reduce((acc: { [key: string]: Document[] }, integration) => {
    const category = integration.category.toLowerCase();
    if (acc[category]) {
      acc[category].push(integration);
    } else {
      acc[category] = [integration];
    }
    return acc;
  }, {});

return (
  <>
{
  (integrationsSortedByCategory && (
    <div className="bg-gray-50">
      <Accordion type="multiple" defaultValue={["hey this is the default value"]}>
        {Object.entries(integrationsSortedByCategory).map(([category, integrations]) => (
          <AccordionItem value={category} key={category}>

            <AccordionTrigger>
            <div className="flex justify-start">
              {/* <category.icon className="h-8 w-8 m-4 text-indigo-600" /> */}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                {/* <p className="mt-2 text-gray-600">{category.description}</p> */}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <IntegrationListByCategory integrations={integrations} />
          </AccordionContent>

          </AccordionItem>
        ))}
      </Accordion>
    </div> 
  ))
}
  </>
);}