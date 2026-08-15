/* ==========================================================================
   ANDINA OBSERVA — SCRIPT PRINCIPAL
   Estructura: 1) Menú móvil  2) Scroll suave  3) Búsqueda/filtrado
   4) Reproductor de podcasts simulado
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. MENÚ HAMBURGUESA (MÓVIL)
     ------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  function cerrarMenuMovil() {
    mobileNav.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
  }

  function abrirMenuMovil() {
    mobileNav.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
  }

  hamburgerBtn.addEventListener('click', () => {
    const estaAbierto = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    estaAbierto ? cerrarMenuMovil() : abrirMenuMovil();
  });

  // Cerrar el menú móvil automáticamente al elegir un enlace
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', cerrarMenuMovil);
  });

  // Cerrar con la tecla Escape (accesibilidad de teclado)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      cerrarMenuMovil();
      hamburgerBtn.focus();
    }
  });

  /* ------------------------------------------------------------
     2. DESPLAZAMIENTO SUAVE PARA EL CTA DEL HERO
     (el scroll suave del resto de enlaces ya lo cubre
      `html { scroll-behavior: smooth }` en el CSS)
     ------------------------------------------------------------ */
  const ctaScroll = document.getElementById('cta-scroll');
  ctaScroll.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('publicaciones').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ------------------------------------------------------------
     3. BÚSQUEDA / FILTRADO DE PUBLICACIONES
     Filtra las tarjetas de artículo por título, extracto,
     categoría o autor, sincronizando ambos campos de búsqueda
     (el de escritorio y el del menú móvil).
     ------------------------------------------------------------ */
  const searchInputs = [
    document.getElementById('search-input'),
    document.getElementById('search-input-mobile')
  ];
  const tarjetas = Array.from(document.querySelectorAll('.card'));
  const subtitulos = document.querySelectorAll('.subsection-title');
  const mensajeVacio = document.getElementById('no-results');

  function filtrarPublicaciones(texto) {
    const termino = texto.trim().toLowerCase();
    let visibles = 0;

    tarjetas.forEach(tarjeta => {
      const contenido = [
        tarjeta.dataset.title,
        tarjeta.dataset.excerpt,
        tarjeta.dataset.category,
        tarjeta.dataset.author
      ].join(' ').toLowerCase();

      const coincide = termino === '' || contenido.includes(termino);
      tarjeta.style.display = coincide ? '' : 'none';
      if (coincide) visibles++;
    });

    // Oculta los encabezados "Análisis Político" / "Medio Ambiente" si
    // ninguna de sus tarjetas coincide con la búsqueda actual.
    document.querySelectorAll('.articles-grid').forEach(grid => {
      const algunaVisible = Array.from(grid.querySelectorAll('.card')).some(c => c.style.display !== 'none');
      const encabezado = grid.previousElementSibling;
      grid.style.display = algunaVisible ? '' : 'none';
      if (encabezado && encabezado.classList.contains('subsection-title')) {
        encabezado.style.display = algunaVisible ? '' : 'none';
      }
    });

    mensajeVacio.hidden = visibles !== 0;
  }

  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const valor = e.target.value;
      // Sincroniza el otro campo de búsqueda (escritorio ↔ móvil)
      searchInputs.forEach(otro => { if (otro !== e.target) otro.value = valor; });
      filtrarPublicaciones(valor);
    });
  });

  /* ------------------------------------------------------------
     4. REPRODUCTOR DE PODCASTS (SIMULADO CON JS)
     Cada reproductor anima su propia barra de progreso con
     setInterval, permite pausar/reanudar, saltar a un punto
     concreto haciendo clic o arrastrando, y pausa los demás
     episodios cuando uno nuevo empieza a reproducirse.
     ------------------------------------------------------------ */
  const reproductores = document.querySelectorAll('.podcast-player');
  let reproductorActivo = null; // controla que solo suene un episodio a la vez

  function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = Math.floor(segundosTotales % 60).toString().padStart(2, '0');
    return `${minutos}:${segundos}`;
  }

  reproductores.forEach(player => {
    const duracion = Number(player.dataset.duration); // en segundos
    const botonPlay = player.querySelector('.play-btn');
    const icono = botonPlay.querySelector('i');
    const track = player.querySelector('.progress-track');
    const fill = player.querySelector('.progress-fill');
    const handle = player.querySelector('.progress-handle');
    const tiempoActualEl = player.querySelector('.time-elapsed');

    let tiempoActual = 0;
    let intervalo = null;
    let arrastrando = false;

    function actualizarUI() {
      const porcentaje = (tiempoActual / duracion) * 100;
      fill.style.width = `${porcentaje}%`;
      handle.style.left = `${porcentaje}%`;
      track.setAttribute('aria-valuenow', Math.round(porcentaje));
      tiempoActualEl.textContent = formatearTiempo(tiempoActual);
    }

    function pausar() {
      clearInterval(intervalo);
      intervalo = null;
      icono.classList.remove('fa-pause');
      icono.classList.add('fa-play');
      botonPlay.setAttribute('aria-label', botonPlay.getAttribute('aria-label').replace('Pausar', 'Reproducir'));
    }

    function reproducir() {
      // Pausa cualquier otro episodio que estuviera sonando
      if (reproductorActivo && reproductorActivo !== player) {
        reproductorActivo.pausarExterno();
      }
      reproductorActivo = player;

      icono.classList.remove('fa-play');
      icono.classList.add('fa-pause');
      botonPlay.setAttribute('aria-label', botonPlay.getAttribute('aria-label').replace('Reproducir', 'Pausar'));

      intervalo = setInterval(() => {
        tiempoActual += 1;
        if (tiempoActual >= duracion) {
          tiempoActual = duracion;
          actualizarUI();
          pausar();
          return;
        }
        actualizarUI();
      }, 1000);
    }

    // Método expuesto para que otros reproductores puedan pausar este
    player.pausarExterno = pausar;

    botonPlay.addEventListener('click', () => {
      intervalo ? pausar() : reproducir();
    });

    // Permite saltar a un punto de la pista haciendo clic
    function saltarAPosicion(clientX) {
      const rect = track.getBoundingClientRect();
      const proporcion = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      tiempoActual = proporcion * duracion;
      actualizarUI();
    }

    track.addEventListener('click', (e) => saltarAPosicion(e.clientX));

    // Arrastrar el indicador de progreso (ratón)
    handle.addEventListener('mousedown', () => { arrastrando = true; });
    document.addEventListener('mousemove', (e) => {
      if (arrastrando) saltarAPosicion(e.clientX);
    });
    document.addEventListener('mouseup', () => { arrastrando = false; });

    // Control por teclado (flechas izquierda/derecha) sobre la barra
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        tiempoActual = Math.min(tiempoActual + 5, duracion);
        actualizarUI();
      } else if (e.key === 'ArrowLeft') {
        tiempoActual = Math.max(tiempoActual - 5, 0);
        actualizarUI();
      }
    });

    actualizarUI();
  });

});
