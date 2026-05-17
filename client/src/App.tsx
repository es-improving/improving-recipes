import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage'
import PantryPage from './pages/PantryPage'
import AboutPage from './pages/AboutPage'
import TestPage from './pages/TestPage'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h1>Improving Recipes</h1>
        <nav>
          <NavLink to="/" end>Recipes</NavLink>
          <NavLink to="/pantry">Pantry</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/test">Test</NavLink>
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
