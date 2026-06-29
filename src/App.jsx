import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Proyecto from './pages/Proyecto'
import Explorador from './pages/Explorador'
import Crear from './pages/Crear'
import Galeria from './pages/Galeria'
import Sustento from './pages/Sustento'

import Acerca from './pages/Acerca'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/explorador" element={<Explorador />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/sustento" element={<Sustento />} />
        <Route path="/acerca" element={<Acerca />} />
      </Route>
    </Routes>
  )
}

export default App