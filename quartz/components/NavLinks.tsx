// quartz/components/NavLinks.tsx

import { QuartzComponent, QuartzComponentConstructor } from "./types"
import React from "react"

const NavLinks: QuartzComponent = () => {
  return (
    // Usa la clase 'header-links' para centrar/alinear
    <nav className="header-links">
      <a href="/">🏠 Home</a>
      <a href="/tags">🏷️ Tags</a>
      <a href="/Mapas">🗺️ Mapas</a>
      {/* Añade más enlaces según necesites */}
    </nav>
  )
}

NavLinks.css = `
.header-links {
  display: flex;
  justify-content: flex-start; /* Alinea los enlaces al inicio */
  align-items: center;
  gap: 1.5rem; /* Espacio entre enlaces */
  padding: 0.5rem 0; /* Pequeño padding vertical */
  border-bottom: 1px solid var(--lightgray); /* Línea divisoria */
  margin-bottom: 1rem;
}
.header-links a {
  font-weight: 600;
  text-decoration: none;
  color: var(--darkgray);
}
.header-links a:hover {
  color: var(--secondary);
}
`

NavLinks.displayName = "NavLinks"
export default (() => NavLinks) satisfies QuartzComponentConstructor
