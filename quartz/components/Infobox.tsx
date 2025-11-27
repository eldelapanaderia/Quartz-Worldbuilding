// quartz/components/Infobox.tsx

import React from "react"
import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types" 

// Propiedades comunes de Quartz que queremos ignorar en la caja wiki.
const ignoredKeys = new Set([
  "title",
  "tags",
  "pubdate",
  "draft",
  "description",
  "slug",
  "enableToc",
  "enableLinkPreview",
])

// 1. Componente React (Infobox)
const Infobox: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter

  // Si no hay frontmatter, devolvemos null (Aunque técnicamente no debería pasar en una nota)
  if (!frontmatter) {
    return null 
  }

  // Obtenemos las claves del frontmatter y filtramos las que queremos ignorar.
  const dataEntries = Object.entries(frontmatter).filter(([key, _]) => !ignoredKeys.has(key))

  // Si no quedan propiedades después del filtro, no mostramos el infobox.
  if (dataEntries.length === 0) {
    return null
  }
  
  // Función auxiliar para capitalizar la primera letra (opcional, para mejor presentación)
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')


  return (
    <aside className={`infobox-wiki ${displayClass ?? ""}`}>
      <h3>Detalles de la Nota</h3>
      
      <div className="infobox-data">
        {
          dataEntries.map(([key, value]) => (
            // Usamos un div como contenedor para la clave y el valor.
            <div key={key} className="infobox-entry">
              <span className="infobox-key"><strong>{capitalize(key)}:</strong></span>
              {/* Convertimos el valor a string, útil para arrays o números */}
              <span className="infobox-value">{String(value)}</span> 
            </div>
          ))
        }
      </div>

      <p className="infobox-hint">✅ Carga dinámica de todas las propiedades</p>
    </aside>
  )
}

// 2. Exportación del Constructor (Aseguramos .css)
Infobox.displayName = "Infobox"

export default (() => {
  
  Infobox.css = `
    .infobox-wiki {
      border: 1px solid var(--lightgray);
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      background-color: var(--highlight);
    }
    .infobox-data {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--lightgray);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .infobox-entry {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    .infobox-key {
        white-space: nowrap;
    }
    .infobox-value {
        text-align: right;
    }
    .infobox-wiki h3 {
      margin-top: 0;
    }
  `

  return Infobox
}) satisfies QuartzComponentConstructor
