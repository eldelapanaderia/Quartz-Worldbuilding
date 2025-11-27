// quartz/components/FrontmatterDebugBox.tsx

import React from "react"
// Importamos QuartzComponentConstructor para la exportación
import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types"

// El componente se define SÓLO UNA VEZ
const FrontmatterDebugBox: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  
  // 1. Acceder y convertir el Front Matter
  const frontmatter = fileData.frontmatter

  if (!frontmatter) {
    return null 
  }

  // Convertir el objeto de frontmatter a una cadena JSON legible
  // USAMOS LA VARIABLE frontmatterJson
  const frontmatterJson = JSON.stringify(frontmatter, null, 2)

  // 2. Renderizar en el DOM
  return (
    <div className={`frontmatter-debug-box ${displayClass ?? ""}`}>
      <h3>Frontmatter (Caja Wiki de Depuración)</h3>
      {/* fileData.slug es el nombre de la ruta/archivo */}
      <p><strong>Ruta de la Nota:</strong> {fileData.slug}</p>
      
      {/* <pre> se usa para mantener el formato y espaciado de JSON */}
      <pre>
        <code>
          {frontmatterJson} {/* ⬅️ Renderizamos el JSON aquí */}
        </code>
      </pre>
    </div>
  )
}

// -------------------------------------------------------------------
// 3. Exportación Final (Envuelve el componente, añade CSS estático)
// -------------------------------------------------------------------

FrontmatterDebugBox.displayName = "FrontmatterDebugBox"

export default (() => {
  
  // 3. Añadir propiedades estáticas (CSS, scripts) al componente DEFINIDO
  // Hacemos que la propiedad .css exista para evitar el error de desestructuración
  FrontmatterDebugBox.css = `
    .frontmatter-debug-box {
      border: 1px solid var(--lightgray);
      padding: 1rem;
      /* Ajustamos el color para que destaque */
      background-color: var(--lightgray); 
    }
    .frontmatter-debug-box pre {
      background-color: var(--light);
      border: 1px dashed var(--gray);
      padding: 10px;
      overflow-x: auto; 
    }
  `

  // 4. Devolver la función de componente
  return FrontmatterDebugBox
}) satisfies QuartzComponentConstructor
