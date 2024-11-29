import { useEffect } from "react"
import { FilterPanel } from "../components/FilterPanel"
import { SearchBar } from "../components/SearchBar"
import { useIntegrations } from "../context/integrationsData"
import { useSearch } from "../context/SearchContext"
import IntegrationCardV2 from "../components/IntegrationCard_v2"

export default function Search() {
  const { integrations } = useIntegrations()
  const { applyFilters } = useSearch()
  const filteredIntegrations = applyFilters(integrations)

  useEffect(() => {
    document.title = 'Search - Integrations'
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      <div className="flex flex-col gap-4 md:flex-row">
        <FilterPanel className="basis-1/4 " />
        <div className="basis-3/4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration) => (
            <IntegrationCardV2 integration={integration} key={integration.$id} />
          ))}
        </div>
      </div>
    </div>
  )
}