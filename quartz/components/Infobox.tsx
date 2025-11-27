// quartz/components/Infobox.tsx

import React from "react"
// Importamos QuartzComponentConstructor para garantizar la estructura
import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types" 

// 1. Componente React (Infobox)
const Infobox: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter

  // Lógica Condicional: Se renderiza solo si es de tipo 'personaje'
  if (!frontmatter || frontmatter.tipo_nota !== 'personaje') {
    return null 
  }

  const { facción, estado, tipo_nota } = frontmatter

  return (
    <aside className={`infobox-wiki ${displayClass ?? ""}`}>
      <h3>Ficha de {tipo_nota}</h3>
      
      <div className="infobox-data">
        <p><strong>Facción:</strong> {facción || 'Desconocida'}</p>
        <p><strong>Estado:</strong> {estado || 'N/A'}</p>
      </div>

      <p className="infobox-hint">Define 'tipo_nota: personaje' en el frontmatter para verlo.</p>
    </aside>
  )
}

// 2. Exportación del Constructor (Necesario para el .css)
Infobox.displayName = "Infobox"

export default (() => {
  
  // Añadimos la propiedad estática .css al componente para que Quartz la compile
  // Esto previene el error 'Cannot destructure property 'css' of 'component' as it is undefined.'
  Infobox.css = `
    .infobox-wiki {
      border: 1px solid var(--lightgray);
      padding: 1rem;
      border-radius: 8px;
      background-color: var(--light); /* Fondo claro para que destaque */
    }
    .infobox-data {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--lightgray);
    }
    .infobox-wiki h3 {
      margin-top: 0;
    }
  `

  return Infobox
}) satisfies QuartzComponentConstructor
