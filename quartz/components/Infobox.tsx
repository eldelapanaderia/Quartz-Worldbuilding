// quartz/components/Infobox.tsx

import React from "react"
// Importamos QuartzComponentConstructor para la exportación y los tipos
import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types" 

// 1. Componente React
const Infobox: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter

  // Verificamos la propiedad 'tipo_nota' para ver si debemos renderizar algo.
  if (!frontmatter || frontmatter.tipo_nota !== 'personaje') {
    return null 
  }

  // Desestructuramos las propiedades que usaremos
  const { facción, estado, tipo_nota } = frontmatter

  return (
    <aside className={`infobox-wiki ${displayClass ?? ""}`}>
      <h3>Ficha de {tipo_nota}</h3>
      
      <div className="infobox-data">
        <p><strong>Facción:</strong> {facción || 'Desconocida'}</p>
        <p><strong>Estado:</strong> {estado || 'N/A'}</p>
      </div>

      <p className="infobox-hint">Este contenido se muestra porque tipo_nota es 'personaje'.</p>
    </aside>
  )
}

// 2. Exportación del Constructor con la propiedad .css
Infobox.displayName = "Infobox"

export default (() => {
  
  // Aseguramos que la propiedad .css exista para que ComponentResources no falle.
  // Es la forma más limpia de definir estilos específicos de componente.
  // El contenido real de los estilos irá en un SCSS externo.
  Infobox.css = `
    .infobox-wiki {
      /* Estilos mínimos para que ComponentResources no falle */
      border: 1px solid var(--lightgray);
      padding: 1rem;
      border-radius: 8px;
    }
  `

  return Infobox
}) satisfies QuartzComponentConstructor
