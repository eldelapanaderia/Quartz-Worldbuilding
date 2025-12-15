// quartz/components/SmartSidebar.tsx

import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const script = `
  let lastScrollTop = 0;
  const sidebar = document.querySelector('.sidebar.left');
  const scrollThreshold = 100; // Umbral de scroll ajustado (100px)

  if (sidebar) {
      window.addEventListener('scroll', () => {
          const currentScroll = window.scrollY || document.documentElement.scrollTop;

          // Si el scroll está en la parte superior, aseguramos que se muestre.
          if (currentScroll <= 0) {
              sidebar.classList.remove('hide-sidebar');
              lastScrollTop = 0;
              return;
          }

          // 1. Desplazamiento hacia abajo (Ocultar)
          // Se oculta si el scroll actual es mayor que el último scroll (bajando)
          // y hemos pasado el umbral inicial de scroll para evitar ocultar al inicio.
          if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
              sidebar.classList.add('hide-sidebar');
          } 
          
          // 2. Desplazamiento hacia arriba (Mostrar)
          // Se muestra si el scroll actual es menor que el último scroll (subiendo)
          else if (currentScroll < lastScrollTop) {
              sidebar.classList.remove('hide-sidebar');
          }

          lastScrollTop = currentScroll;
      });
  }
`

const SmartSidebar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  )
}

export default (() => SmartSidebar) satisfies QuartzComponentConstructor