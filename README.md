# FLEXCORE

Repositorio independiente para la landing de Fabrizzio Peláez, desarrollador
Fullstack y automatizaciones con IA, Lima, Perú.

## Identidad

- PNG descargable: [flexcore-1024.png](public/icons/flexcore-1024.png)
- Fuente vectorial: [flexcore.svg](public/icons/flexcore.svg)
- Favicon: `public/favicon.ico` (16, 32 y 48 píxeles)
- PNG de favicon: `public/icons/favicon-48.png`
- Icono Apple: `public/icons/apple-touch-icon.png`

Al implementar la landing, servir `public/` como raíz de archivos estáticos e
incluir en el `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="icon" type="image/png" href="/icons/favicon-48.png" sizes="48x48">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="180x180">
```

## Alcance de la futura landing

- Desarrollo web Fullstack: React, Next.js y Supabase.
- Chatbots inteligentes y automatización por WhatsApp.
- Sistemas de gestión y puntos de venta (POS).
- FLEXQR como producto, con panel de promociones push como adicional.
- Solicitudes de cotización y reserva de asesoría.
- Sin servicios de marketing ni creación de videos.

Contacto profesional:
- LinkedIn: https://www.linkedin.com/in/fabrizzio-pelaez-2a29a7429/
- GitHub: https://github.com/Pelaez12

## Landing implementada

React + Vite + Motion, con identidad negro/blanco/rojo, intro de 6.7 segundos
inspirada en FLEXQR y transición a «¿Qué necesita tu negocio?». Se muestra en la
primera visita por navegador, puede saltarse y respeta movimiento reducido.
Para probarla otra vez durante QA, abre `/?intro=1`.

Incluye servicios interactivos, planes de chatbot, adicional de promociones push,
perfil profesional, preguntas frecuentes y solicitudes por WhatsApp. Los ejemplos
de producto están etiquetados como ilustrativos, no muestran datos reales.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

El resultado publicable es `dist/`. En un alojamiento estático de Cloudflare,
configura la compilación `npm run build` y el directorio de salida `dist`.
No publiques los archivos fuente directamente ni despliegues sin compilar.
Este repositorio no crea infraestructura, dominios ni modifica otros proyectos.

## Contacto y privacidad

El teléfono comercial se configura en `src/contact.js` y se muestra también en
la página. El formulario valida los campos y prepara un mensaje; solo abre
WhatsApp cuando la persona pulsa el enlace correspondiente. No envía mensajes
automáticamente, no confirma citas, no procesa pagos y no almacena solicitudes.
La fuente Manrope se solicita a Google Fonts; no se incluyen analíticas ni cookies
de seguimiento. El almacenamiento local guarda únicamente que la intro ya se vio.

Los precios y límites provienen del brief del propietario. El volumen incluido del
chatbot, implementación, integraciones, impuestos aplicables y condiciones finales
se deben confirmar antes de contratar. No se promete consumo ilimitado.

## Validación

Pruebas unitarias de campos, consentimiento, contenido y codificación del mensaje.
Verificación visual de escritorio y de diseño responsive a 390px. No se enviaron
mensajes reales. La recepción en WhatsApp depende de la cuenta destinataria y no
se puede certificar con una prueba local del enlace.

No modifica el sitio del gimnasio, la aplicación FLEXQR ni Google Auth.
