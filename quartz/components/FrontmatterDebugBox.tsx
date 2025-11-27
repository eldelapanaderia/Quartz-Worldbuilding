// quartz/components/FrontmatterDebugBox.tsx

import React from "react"
import { QuartzComponent, QuartzComponentProps } from "./types"

// El componente se define como una QuartzComponent sin opciones de configuración adicionales (Options = {})
const FrontmatterDebugBox: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  
  // 1. Acceder al Front Matter
  // El front matter de la nota actual (archivo .md) está en fileData.frontmatter
  const frontmatter = fileData.frontmatter

  // Comprobación de si hay frontmatter para evitar errores
  if (!frontmatter) {
    return null 
  }

  // 2. Convertir el objeto de frontmatter a una cadena JSON legible
  // El valor null se usa como 'replacer' y el 2 es para un indentado de 2 espacios (pretty print)
  const FrontmatterDebugBox: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {

  // 3. Renderizar en el DOM
  return (
    <div className={`frontmatter-debug-box ${displayClass ?? ""}`}>
      <h3>Frontmatter (Caja Wiki de Depuración)</h3>
      <p>**Título de la Nota:** {fileData.slug}</p>
      
      {/* <pre> se usa para mantener el formato y espaciado de JSON */}
      <pre>
        <code>
          {/* ... */}
        </code>
      </pre>
    </div>
  )
}

// 4. Exportar el componente
FrontmatterDebugBox.displayName = "FrontmatterDebugBox"
export default (() => {
  // 1. Opcional: Definir las opciones o configuración (en este caso, no hay)

  // 2. Definir el componente React (FrontmatterDebugBox en este caso)

  // 3. Añadir propiedades estáticas (CSS, scripts)
  FrontmatterDebugBox.css = `
    /* Puedes dejar este string vacío si no tienes estilos */
    /* O puedes incluir tus estilos SASS aquí si los importaste */
    .frontmatter-debug-box {
      /* Añade un estilo básico para que la propiedad exista */
      border: 1px solid var(--lightgray);
      padding: 1rem;
    }
  `

  // 4. Devolver la función de componente
  return FrontmatterDebugBox
}) satisfies QuartzComponentConstructor
