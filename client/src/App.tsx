import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage'
import PantryPage from './pages/PantryPage'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>Improving Recipes</h1>
        <nav>
          <NavLink to="/" end>Recipes</NavLink>
          <NavLink to="/pantry">Pantry</NavLink>
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
          <Route path="/pantry" element={<PantryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
