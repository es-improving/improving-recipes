import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import PantryPage from './pages/PantryPage'
import AboutPage from './pages/AboutPage'
import AuditLogPage from './pages/AuditLogPage'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>Improving Recipes</h1>
        <nav>
          <NavLink to="/" end>Recipes</NavLink>
          <NavLink to="/pantry">Pantry</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/audit-logs">Audit Logs</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/audit-logs" element={<AuditLogPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
