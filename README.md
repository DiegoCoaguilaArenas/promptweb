ROL: 
Actúa como un desarrollador frontend senior especializado en HTML5, CSS3 semántico y JavaScript Vanilla moderno (ES6+).
CONTEXTO: 
Estoy construyendo un portal web institucional para una organización peruana sin fines de lucro dedicada al análisis político y ambiental. El público objetivo incluye académicos, periodistas, investigadores y la ciudadanía interesada. El sitio debe reflejar seriedad académica con un diseño moderno, limpio y profesional. Debe ser 100% responsive, accesible y optimizado para SEO básico.
REQUISITOS FUNCIONALES:
1. Header & Navegación:
   - Navbar fijo (sticky/fixed) con logo institucional y menú de navegación con 4 enlaces: "Inicio", "Análisis Político", "Medio Ambiente", "Podcasts".
   - Barra de búsqueda visual interactiva en la cabecera.
   - Menú hamburguesa funcional para dispositivos móviles con apertura/cierre fluido.
2. Hero Section:
   - Imagen de fondo representativa de la temática político-ambiental en el Perú.
   - Título institucional impactante, subtítulo descriptivo del propósito de la organización.
   - Botón CTA (Call To Action) funcional con desplazamiento suave (smooth scroll) hacia la sección de publicaciones.
3. Sección de Publicaciones:
   - Grid responsive de mínimo 6 artículos con imágenes reales de Unsplash, etiquetas de categoría (ej. "Política Pública", "Biodiversidad Amazonía", "Conflictos Socioambientales", "Gobernanza"), título, extracto, autor y fecha.
   - Contenido realista contextualizado en la realidad político-ambiental peruana.
4. Sección Multimedia (Podcasts):
   - Mínimo 3 episodios de podcast con reproductor de audio interactivo/simulado mediante JS (controles de Play/Pausa, barra de progreso visual, título del episodio y tiempo transcurrido).
5. Footer Completo:
   - Mínimo 3 columnas de información: 
     * Columna 1: Logo institucional y resumen de la misión.
     * Columna 2: Enlaces rápidos a las secciones principales.
     * Columna 3: Información de contacto en Lima, Perú y enlaces a redes sociales.
   - Pie de página con aviso de Copyright 2026.
6. Interactividad:
   - Menú móvil funcional.
   - Filtrado o búsqueda básica de artículos por texto mediante la barra de búsqueda.
   - Reproductor de audio funcional para la sección de podcasts.
REQUISITOS TÉCNICOS:
- Stack: HTML5 semántico + CSS3 puro (Flexbox/Grid) + JavaScript Vanilla (ES6+).
- Framework CSS: Ninguno (escribe el CSS en un archivo independiente desde cero).
- Paleta de colores:
  * Verde Académico/Ambiental: 
#1C3A27 (Primario)
  * Ámbar/Dorado Institucional: 
#D97706 (Secundario/Acento)
  * Gris Oscuro: 
#1F2937 (Texto y títulos)
  * Gris Claro: 
#F9FAFB (Fondos de sección)
  * Blanco: 
#FFFFFF
- Tipografía: Importar Google Fonts ("Merriweather" para títulos y "Inter" para cuerpo).
- Responsive: Totalmente adaptado para móvil (320px), tablet (768px) y desktop (1200px+).
- Accesibilidad (WCAG AA): Atributos aria-label, aria-expanded para menús, texto alternativo (alt) descriptivo en todas las imágenes, contraste adecuado y foco visible (:focus-visible).
- SEO Básico: Meta description contextualizada, etiquetas Open Graph (og:title, og:description, og:image, og:type) y atributo lang="es".
RESTRICCIONES:
- No uses librerías JS o frameworks CSS externos (solo FontAwesome CDN para los iconos y Google Fonts).
- El código debe ser completamente válido, ejecutable y sin errores en la consola.
- Incluye comentarios explicativos en español estructurando cada bloque del código.
FORMATO DE SALIDA:
Entrega el código en tres archivos separados: 
1. index.html
2. styles.css
3. script.js
Al final, explica brevemente la estructura y funcionamiento de cada archivo.