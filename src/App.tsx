
import { Layout } from './components/Layout'
import { IntegrationsProvider } from './context/integrationsData'
import { SearchProvider } from './context/SearchContext'
import Category from './pages/categoryWrongVersion'
import { Admin } from './pages/Admin'
import { Home } from './pages/Home'
import { Industry } from './pages/Industry'
import { Integration } from './pages/Integration'
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom'
import Search from './pages/All'
import OurSuggestion from './pages/ourSuggestion'
import Specialists from './pages/Specialists'

function App() {
  const HEART = '❤'
  
  return (
    <Router>
      <IntegrationsProvider>
        <SearchProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/industry/:id" element={<Industry />} />
              <Route path="/integration/:id" element={<Integration />} />
              <Route path={`/${HEART}`} element={<Home />} />
              <Route path={`/category/:name`} element={<Category />} />
              <Route path='/admin' element={<Admin />} />
              <Route path={'/all'} element={<Search />} />
              <Route path={'/oursuggestion/'} element={<OurSuggestion />} />
              <Route path="/specialists" element={<Specialists />} />
            </Routes>
          </Layout>
        </SearchProvider>
      </IntegrationsProvider>
    </Router>
  )
}

export default App
