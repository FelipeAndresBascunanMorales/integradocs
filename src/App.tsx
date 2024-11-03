
import { Layout } from './components/Layout'
import { SearchProvider } from './context/SearchContext'
import { Home } from './pages/Home'
import { Industry } from './pages/Industry'
import { Integration } from './pages/Integration'
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'

function App() {

  return (
    <Router>
      <SearchProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/industry/:id" element={<Industry />} />
            <Route path="/integration/:id" element={<Integration />} />
          </Routes>
        </Layout>
      </SearchProvider>
    </Router>
  )
}

export default App
