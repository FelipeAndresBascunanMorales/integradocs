
import { Layout } from './components/Layout'
import { IntegrationsProvider } from './context/integrationsData'
import { SearchProvider } from './context/SearchContext'
import Category from './pages/[category]'
import { Home } from './pages/Home'
import { Industry } from './pages/Industry'
import { Integration } from './pages/Integration'
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'

function App() {
  const hart = '❤'
  
  return (
    <Router>
      <IntegrationsProvider>
        <SearchProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/industry/:id" element={<Industry />} />
              <Route path="/integration/:id" element={<Integration />} />
              <Route path={`/${hart}`} element={<Home />} />
              <Route path={`/:category`} element={<Category />} />
            </Routes>
          </Layout>
        </SearchProvider>
      </IntegrationsProvider>
    </Router>
  )
}

export default App
