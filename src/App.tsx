
import { Layout } from './components/Layout'
import { Routes, Route } from './components/Router'
import { SearchProvider } from './context/SearchContext'
import { Home } from './pages/Home'
import { Industry } from './pages/Industry'
import { Integration } from './pages/Integration'

function App() {

  return (
    <SearchProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industry/:id" element={<Industry />} />
          <Route path="/integration/:id" element={<Integration />} />
        </Routes>
      </Layout>
    </SearchProvider>
  )
}

export default App
