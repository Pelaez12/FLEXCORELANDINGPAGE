import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, MotionConfig } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Globe2,
  Bot,
  QrCode,
  PanelsTopLeft,
  Bell,
  Menu,
  X,
  MessageCircle,
  CalendarDays,
  Code2,
  MapPin,
  ChevronDown,
  Send,
  Plus,
  Minus,
  ShoppingBag,
} from "lucide-react";
import Intro, { wantsIntro } from "./Intro";
import { services, validate, message, whatsapp } from "./contact";
import "./style.css";

const solutions = [
  {
    title: "Tu web. Tu mejor presentación.",
    short: "Páginas web",
    icon: Globe2,
    description:
      "Un lugar para que tus clientes conozcan lo que haces, encuentren tus servicios y te contacten. Rápido, claro y pensado para el celular.",
    points: [
      "Diseño adaptado a tu negocio",
      "Catálogo, formularios y contacto",
      "Integraciones según tu proyecto",
    ],
    tech: "React · Next.js · Supabase",
    service: "Página web",
  },
  {
    title: "Responde, incluso cuando estás ocupado.",
    short: "WhatsApp + IA",
    icon: Bot,
    description:
      "Un asistente que responde preguntas frecuentes, recoge datos y gestiona solicitudes de reserva. Con una conversación diseñada para tu forma de trabajar.",
    points: [
      "Agente de IA personalizado",
      "Solicitudes de reserva a tu WhatsApp",
      "Seguimiento y soporte mensual",
    ],
    tech: "Automatización · Inteligencia artificial",
    service: "Chatbot de WhatsApp",
  },
  {
    title: "El control de tu negocio, en una pantalla.",
    short: "Sistemas y POS",
    icon: PanelsTopLeft,
    description:
      "Ventas, productos y procesos conectados en un sistema construido alrededor de tu operación. Definimos juntos qué necesitas antes de desarrollar.",
    points: [
      "Ventas e inventario",
      "Clientes, pedidos y reportes",
      "Permisos y flujos a medida",
    ],
    tech: "Desarrollo fullstack · Bases de datos",
    service: "Sistema de gestión / POS",
  },
  {
    title: "Tu carta cambia. Tu QR se queda.",
    short: "FLEXQR",
    icon: QrCode,
    description:
      "Carta digital para que tus clientes elijan desde su celular y preparen su pedido por WhatsApp. Actualiza tu información sin volver a imprimir el QR.",
    points: [
      "Mesa, para llevar y domicilio",
      "Carta adaptada al celular",
      "Promociones push como adicional",
    ],
    tech: "Carta digital · PWA · WhatsApp",
    service: "FLEXQR",
  },
];
const pushPlans = [
  { name: "Básico", price: 39, devices: "500", monthly: 20, daily: 1 },
  { name: "Negocio", price: 79, devices: "1,500", monthly: 40, daily: 2 },
  { name: "Pro", price: 149, devices: "3,000", monthly: 60, daily: 3 },
];
const faqs = [
  [
    "¿Qué necesito para empezar?",
    "Cuéntame qué hace tu negocio y qué tarea quieres resolver. Revisamos tu proceso, definimos el alcance y te envío una propuesta antes de comenzar.",
  ],
  [
    "¿La mensualidad del chatbot incluye uso ilimitado?",
    "No. Antes de activar el servicio acordamos el volumen incluido y el horario de atención. El plan Estándar contempla 16 horas diarias; Premium, 24 horas. Consumo adicional, integraciones o nuevas funciones se cotizan y aprueban por separado.",
  ],
  [
    "¿Las promociones se envían por WhatsApp?",
    "El panel adicional envía notificaciones push a los dispositivos que se suscribieron y dieron permiso. No son mensajes de WhatsApp ni envíos a contactos sin consentimiento. La recepción depende del dispositivo, la conexión y los permisos.",
  ],
  [
    "¿La reserva de asesoría queda confirmada al enviar?",
    "No. El formulario prepara tu solicitud para WhatsApp. Yo confirmo contigo la disponibilidad, la fecha y el horario. No se realiza ningún cobro automático.",
  ],
  [
    "¿Puedo contratar solo una solución?",
    "Sí. Puedes solicitar una web, un chatbot, FLEXQR o un sistema por separado. El panel de promociones es un adicional opcional sujeto a compatibilidad e implementación.",
  ],
];

function Brand({ footer = false }) {
  return (
    <a
      href="#inicio"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="FLEXCORE, ir al inicio"
    >
      <img src="/icons/flexcore.svg" alt="" width="40" height="40" />
      <span>
        FLEX<span>CORE</span>
        <small>DESARROLLO & AUTOMATIZACIÓN</small>
      </span>
    </a>
  );
}
function Demo({ variant = 0 }) {
  const [count, setCount] = useState(1);
  return (
    <div className={`demo-scene scene-${variant}`}>
      <div className="orbit" aria-hidden="true" />
      <div className="workspace">
        <div className="window-top">
          <span>
            <i />
            <i />
            <i />
          </span>
          <small>FLEXCORE / espacio de trabajo</small>
          <Code2 size={14} />
        </div>
        <div className="workspace-body">
          <aside aria-hidden="true">
            <img src="/icons/flexcore.svg" alt="" />
            <PanelsTopLeft />
            <ShoppingBag />
            <CalendarDays />
            <Bell />
          </aside>
          <div className="workspace-content">
            <div className="dashboard-head">
              <span>Tu negocio, conectado</span>
              <span className="live">
                <i /> En línea
              </span>
            </div>
            <h3>
              {
                [
                  "Todo en su lugar.",
                  "Cada conversación cuenta.",
                  "Una operación más clara.",
                  "Del QR a tu mesa.",
                ][variant]
              }
            </h3>
            <p className="demo-caption">
              Vista ilustrativa de una solución FLEXCORE
            </p>
            <div className="dashboard-tabs">
              <span>Actividad</span>
              <span>Solicitudes</span>
              <span>Clientes</span>
            </div>
            <div className="activity">
              <span className="activity-icon">
                <CalendarDays size={18} />
              </span>
              <div>
                <strong>Nueva solicitud de reserva</strong>
                <small>Lista para que la revises</small>
              </div>
              <Check size={16} />
            </div>
            <div className="activity">
              <span className="activity-icon">
                <ShoppingBag size={18} />
              </span>
              <div>
                <strong>Pedido preparado</strong>
                <small>Datos organizados, menos pasos</small>
              </div>
              <Check size={16} />
            </div>
            <div className="connection">
              <span>WEB</span>
              <i />
              <span>WHATSAPP</span>
              <i />
              <span>TU NEGOCIO</span>
            </div>
          </div>
        </div>
      </div>
      <div className="phone-demo">
        <div className="phone-camera" aria-hidden="true" />
        <div className="phone-top">
          <span className="avatar">
            <Bot size={20} />
          </span>
          <div>
            Tu asistente<small>Ejemplo de conversación</small>
          </div>
        </div>
        <div className="chat-bubble outgoing">
          Hola, ¿puedo reservar una asesoría?
        </div>
        <div className="chat-bubble">
          ¡Hola! Claro. ¿Qué te gustaría mejorar en tu negocio?
        </div>
        <div className="chat-bubble outgoing">
          Quiero organizar mis pedidos.
        </div>
        <div className="chat-summary">
          <Check size={14} />
          <span>Solicitud lista para revisar</span>
        </div>
        <div className="phone-input">
          <span>Escribe un mensaje…</span>
          <Send size={16} />
        </div>
      </div>
      <div className="demo-label">
        <span className="tiny-dot" /> EJEMPLO DE PRODUCTO · NO SON DATOS REALES
      </div>
      {variant === 3 && (
        <div className="quantity-demo">
          <span>Prueba la interacción</span>
          <button
            aria-label="Disminuir cantidad de ejemplo"
            onClick={() => setCount(Math.max(1, count - 1))}
          >
            <Minus size={16} />
          </button>
          <output aria-live="polite">{count}</output>
          <button
            aria-label="Aumentar cantidad de ejemplo"
            onClick={() => setCount(Math.min(9, count + 1))}
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [intro, setIntro] = useState(wantsIntro);
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null);
  const [values, setValues] = useState({
    name: "",
    business: "",
    phone: "",
    service: "",
    details: "",
    kind: "cotizacion",
    consent: false,
  });
  const heading = useRef(null);
  const page = useRef(null);
  const finish = useCallback(() => {
    setIntro(false);
    requestAnimationFrame(() =>
      heading.current?.focus({ preventScroll: true }),
    );
  }, []);
  useEffect(() => {
    if (page.current) page.current.inert = intro;
  }, [intro]);
  const choose = (service, kind = "cotizacion") => {
    setValues((v) => ({ ...v, service, kind }));
    setPrepared(null);
    setNavOpen(false);
  };
  const update = (e) => {
    const { name, value, checked, type } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    setPrepared(null);
    setErrors((v) => ({ ...v, [name]: undefined }));
  };
  const submit = (e) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document.getElementById(Object.keys(next)[0])?.focus(),
      );
      return;
    }
    setPrepared(message(values));
  };
  const sol = solutions[active];
  return (
    <MotionConfig reducedMotion="user">
      {intro && <Intro onFinish={finish} />}
      <div ref={page}>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <header className="header">
          <div className="shell header-inner">
            <Brand />
            <nav
              id="mobile-navigation"
              aria-label="Navegación principal"
              className={navOpen ? "nav open" : "nav"}
            >
              <a href="#soluciones" onClick={() => setNavOpen(false)}>
                Soluciones
              </a>
              <a href="#planes" onClick={() => setNavOpen(false)}>
                Planes
              </a>
              <a href="#sobre-mi" onClick={() => setNavOpen(false)}>
                Detrás de FLEXCORE
              </a>
            </nav>
            <a
              className="header-cta"
              href="#contacto"
              onClick={() => choose("")}
            >
              Hablemos <ArrowUpRight size={17} />
            </a>
            <button
              className="menu-toggle"
              aria-label={navOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={navOpen}
              aria-controls="mobile-navigation"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        <main id="contenido">
          <section className="hero shell" id="inicio">
            <div className="hero-copy">
              <div className="availability">
                <span /> Hecho en Lima. Pensado para tu negocio.
              </div>
              <h1 ref={heading} tabIndex="-1">
                Tu negocio.
                <br />
                Con otro <span>ritmo.</span>
              </h1>
              <p>
                Webs, asistentes de WhatsApp y sistemas que te ayudan a atender
                mejor y a tener todo bajo control.
              </p>
              <div className="hero-actions">
                <a
                  className="button primary"
                  href="#contacto"
                  onClick={() => choose("")}
                >
                  Hablemos de tu proyecto <ArrowUpRight size={19} />
                </a>
                <a className="text-link" href="#soluciones">
                  Explorar soluciones <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-signature">
                <span className="signature-mark">
                  FP<span>↗</span>
                </span>
                <div>
                  Fabrizzio Peláez
                  <small>
                    Desarrollador Fullstack & Automatizaciones con IA
                  </small>
                </div>
              </div>
            </div>
            <Demo />
          </section>
          <div className="expertise">
            <div className="shell expertise-inner">
              <span>DE LA IDEA A LA OPERACIÓN</span>
              <p>
                Desarrollo web <i /> Automatización <i /> Sistemas a medida{" "}
                <i /> FLEXQR
              </p>
            </div>
          </div>
          <section id="soluciones" className="section shell">
            <div className="section-heading">
              <h2>
                Menos tareas sueltas.
                <br />
                <span>Más negocio conectado.</span>
              </h2>
              <p>
                Empieza por lo que necesitas hoy.
                <br />
                Lo demás puede crecer contigo.
              </p>
            </div>
            <div
              className="solution-tabs"
              role="tablist"
              aria-label="Soluciones FLEXCORE"
            >
              {solutions.map((s, i) => (
                <button
                  key={s.short}
                  id={`solution-tab-${i}`}
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="solution-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    const next =
                      e.key === "ArrowRight"
                        ? (i + 1) % 4
                        : e.key === "ArrowLeft"
                          ? (i + 3) % 4
                          : e.key === "Home"
                            ? 0
                            : e.key === "End"
                              ? 3
                              : null;
                    if (next !== null) {
                      e.preventDefault();
                      setActive(next);
                      document.getElementById(`solution-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <s.icon size={21} />
                  <span>{s.short}</span>
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
            <div
              className="solution-panel"
              id="solution-panel"
              role="tabpanel"
              aria-labelledby={`solution-tab-${active}`}
              tabIndex="0"
            >
              <motion.div
                key={active}
                initial={{ opacity: 0.4, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="solution-copy"
              >
                <span className="solution-number">
                  SOLUCIÓN / 0{active + 1}
                </span>
                <h3>{sol.title}</h3>
                <p>{sol.description}</p>
                <ul>
                  {sol.points.map((p) => (
                    <li key={p}>
                      <Check size={16} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  className="text-link"
                  href="#contacto"
                  onClick={() => choose(sol.service)}
                >
                  Quiero esta solución <ArrowUpRight size={18} />
                </a>
                <small className="tech-note">{sol.tech}</small>
              </motion.div>
              <Demo variant={active} />
            </div>
          </section>
          <section className="qr-feature shell">
            <div className="qr-word">
              FLEX<span>QR</span>
              <QrCode aria-hidden="true" size={70} />
            </div>
            <div>
              <h2>Tu negocio en un solo QR.</h2>
              <p>
                Una carta digital que tus clientes pueden consultar desde su
                celular. Conoce el producto en funcionamiento.
              </p>
            </div>
            <a
              className="button secondary"
              href="https://flexqr.comunidadfortaleza.com/"
              target="_blank"
              rel="noreferrer"
            >
              Explorar FLEXQR <ArrowUpRight size={18} />
            </a>
          </section>
          <section className="section shell" id="planes">
            <div className="section-heading">
              <h2>
                Un asistente para atender.
                <br />
                <span>Más tiempo para avanzar.</span>
              </h2>
              <p>
                Automatización de WhatsApp con IA.
                <br />
                Conoce la inversión mensual.
              </p>
            </div>
            <div className="chatbot-plans">
              {[
                {
                  name: "Estándar",
                  hours: "16 horas diarias",
                  price: 250,
                  first: 150,
                  desc: "Para organizar tu atención en un horario definido.",
                },
                {
                  name: "Premium",
                  hours: "24 horas diarias",
                  price: 350,
                  first: 300,
                  desc: "Para mantener tu asistente disponible todo el día.",
                },
              ].map((p, i) => (
                <article
                  className={`chatbot-plan ${i ? "featured" : ""}`}
                  key={p.name}
                >
                  <div className="plan-heading">
                    <span>{p.name}</span>
                    <span className="plan-hours">
                      <span />
                      {p.hours}
                    </span>
                  </div>
                  <p>{p.desc}</p>
                  <div className="price">
                    <span>S/</span>
                    {p.price}
                    <small>/ mes</small>
                  </div>
                  <div className="first-month">
                    Primer mes promocional <strong>S/ {p.first}</strong>
                  </div>
                  <ul>
                    <li>
                      <Check size={16} />
                      Asistente personalizado para tu negocio
                    </li>
                    <li>
                      <Check size={16} />
                      Atención y solicitudes de reserva
                    </li>
                    <li>
                      <Check size={16} />
                      Resumen semanal de citas y reservas
                    </li>
                    <li>
                      <Check size={16} />
                      Soporte técnico mensual
                    </li>
                  </ul>
                  <a
                    className={`button ${i ? "primary" : "secondary"}`}
                    href="#contacto"
                    onClick={() => {
                      choose("Chatbot de WhatsApp");
                      setValues((v) => ({
                        ...v,
                        details: `Me interesa el plan ${p.name}. Quiero conocer el volumen incluido y cómo aplicaría a mi negocio.`,
                      }));
                    }}
                  >
                    Consultar plan {p.name} <ArrowUpRight size={17} />
                  </a>
                </article>
              ))}
            </div>
            <p className="plan-disclaimer">
              Precios en soles. El volumen incluido y el alcance se acuerdan
              antes de activar. No incluye consumo ilimitado. Integraciones,
              mejoras o recursos adicionales se cotizan por separado, sin cargos
              automáticos.
            </p>
          </section>
          <section className="push-section">
            <div className="shell">
              <div className="push-intro">
                <div>
                  <span className="addon-label">
                    <Bell size={15} /> ADICIONAL OPCIONAL
                  </span>
                  <h2>
                    Vuelve a estar
                    <br />
                    en su <span>pantalla.</span>
                  </h2>
                  <p>
                    Un panel para enviar tus promociones como notificaciones
                    push a clientes que aceptaron recibirlas.
                  </p>
                </div>
                <div className="notification-example">
                  <div className="notification-meta">
                    <img
                      src="/icons/flexcore.svg"
                      width="24"
                      height="24"
                      alt=""
                    />
                    <span>TU NEGOCIO</span>
                    <small>Ejemplo</small>
                  </div>
                  <strong>¿Hoy se te antoja algo rico?</strong>
                  <p>Descubre la promoción que tenemos para ti.</p>
                  <span className="notification-foot">
                    Así podría verse una promoción en el celular.
                  </span>
                </div>
              </div>
              <div className="push-plans">
                {pushPlans.map((p) => (
                  <article key={p.name}>
                    <h3>{p.name}</h3>
                    <div className="price small">
                      <span>S/</span>
                      {p.price}
                      <small>/ mes</small>
                    </div>
                    <p>
                      Hasta{" "}
                      <strong>
                        {p.daily} {p.daily === 1 ? "campaña" : "campañas"} al
                        día
                      </strong>
                    </p>
                    <div className="push-limits">
                      <span>Hasta {p.monthly} campañas al mes</span>
                      <span>Hasta {p.devices} dispositivos suscritos</span>
                    </div>
                    <a
                      href="#contacto"
                      className="text-link"
                      onClick={() => {
                        choose("Panel de promociones");
                        setValues((v) => ({
                          ...v,
                          details: `Me interesa el panel de promociones ${p.name} de S/ ${p.price} mensuales. Quiero conocer la compatibilidad con mi proyecto.`,
                        }));
                      }}
                    >
                      Añadir a mi proyecto <ArrowUpRight size={17} />
                    </a>
                  </article>
                ))}
              </div>
              <p className="plan-disclaimer">
                Se aplican ambos límites: diario y mensual. Una campaña es un
                envío promocional a tus dispositivos suscritos, no un mensaje de
                WhatsApp. Requiere permiso del cliente y compatibilidad del
                navegador. Implementación e integración se confirman por
                separado. No se garantiza la recepción inmediata.
              </p>
            </div>
          </section>
          <section className="section shell about" id="sobre-mi">
            <div className="about-art">
              <div className="about-monogram">
                F<span>C</span>
                <span className="about-cross">+</span>
              </div>
              <div className="about-location">
                <MapPin size={16} /> Lima, Perú
                <br />
                <span>Proyectos remotos y presenciales</span>
              </div>
            </div>
            <div className="about-copy">
              <span className="human-label">UNA PERSONA DETRÁS DEL CÓDIGO</span>
              <h2>
                Soy Fabrizzio.
                <br />
                <span>Construyo FLEXCORE.</span>
              </h2>
              <p>
                Desarrollador Fullstack y de automatizaciones con IA. Desarrollo
                soluciones tecnológicas para negocios reales: desde una web
                hasta un sistema que ordene tu operación.
              </p>
              <p>
                Hablamos directamente, definimos lo que necesitas y construimos
                con un alcance claro.
              </p>
              <div className="stack">
                <span>React</span>
                <span>Next.js</span>
                <span>Supabase</span>
                <span>Automatización + IA</span>
              </div>
              <div className="profile-links">
                <a
                  href="https://www.linkedin.com/in/fabrizzio-pelaez-2a29a7429/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={16} />
                </a>
                <a
                  href="https://github.com/Pelaez12"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </section>
          <section className="shell process">
            <h2>De tu idea a algo que funciona.</h2>
            <ol>
              {[
                [
                  "Conversemos",
                  "Me cuentas tu negocio y qué necesitas resolver.",
                ],
                [
                  "Definimos el alcance",
                  "Recibes una propuesta con funciones, inversión y tiempos.",
                ],
                [
                  "Construimos contigo",
                  "Desarrollamos, revisamos y preparamos la entrega.",
                ],
              ].map(([title, text], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section className="section shell faq">
            <h2>
              Antes de dar
              <br />
              <span>el siguiente paso.</span>
            </h2>
            <div>
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <ChevronDown size={19} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="contact-section" id="contacto">
            <div className="shell contact-grid">
              <div className="contact-copy">
                <span className="availability">
                  <span /> Empecemos con una conversación.
                </span>
                <h2>
                  ¿Qué necesita
                  <br />
                  tu <span>negocio?</span>
                </h2>
                <p>
                  Cuéntame tu idea. Revisamos cómo llevarla a la práctica y qué
                  solución tiene sentido para ti.
                </p>
                <a
                  className="contact-whatsapp"
                  href={whatsapp(
                    "Hola, FLEXCORE. Quiero conversar sobre un proyecto para mi negocio.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={22} />
                  <span>
                    También puedes escribirme directamente
                    <strong>+51 992 272 521</strong>
                  </span>
                  <ArrowUpRight size={20} />
                </a>
                <p className="contact-note">
                  Sin cobros automáticos. La cotización y la disponibilidad se
                  confirman personalmente.
                </p>
              </div>
              <form noValidate onSubmit={submit} className="contact-form">
                <fieldset className="kind-picker">
                  <legend>¿Cómo empezamos?</legend>
                  {[
                    ["cotizacion", "Solicitar cotización"],
                    ["asesoria", "Solicitar asesoría"],
                  ].map(([v, label]) => (
                    <label key={v}>
                      <input
                        type="radio"
                        name="kind"
                        value={v}
                        checked={values.kind === v}
                        onChange={update}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </fieldset>
                <div className="form-row">
                  {[
                    ["name", "Tu nombre", "Fabrizzio", "name"],
                    [
                      "business",
                      "Tu negocio",
                      "Nombre de tu negocio",
                      "organization",
                    ],
                  ].map(([key, label, placeholder, autocomplete]) => (
                    <label key={key} htmlFor={key}>
                      {label} <span aria-hidden="true">*</span>
                      <input
                        id={key}
                        name={key}
                        autoComplete={autocomplete}
                        maxLength="100"
                        required
                        value={values[key]}
                        onChange={update}
                        placeholder={placeholder}
                        aria-invalid={!!errors[key]}
                        aria-describedby={
                          errors[key] ? `${key}-error` : undefined
                        }
                      />
                      {errors[key] && (
                        <small className="error" id={`${key}-error`}>
                          {errors[key]}
                        </small>
                      )}
                    </label>
                  ))}
                </div>
                <div className="form-row">
                  <label htmlFor="phone">
                    Tu WhatsApp <span aria-hidden="true">*</span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength="22"
                      placeholder="+51 992 272 521"
                      required
                      value={values.phone}
                      onChange={update}
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <small className="error" id="phone-error">
                        {errors.phone}
                      </small>
                    )}
                  </label>
                  <label htmlFor="service">
                    ¿Qué necesitas? <span aria-hidden="true">*</span>
                    <select
                      id="service"
                      name="service"
                      required
                      value={values.service}
                      onChange={update}
                      aria-invalid={!!errors.service}
                      aria-describedby={
                        errors.service ? "service-error" : undefined
                      }
                    >
                      <option value="">Elige una solución</option>
                      {services.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <small className="error" id="service-error">
                        {errors.service}
                      </small>
                    )}
                  </label>
                </div>
                <label htmlFor="details">
                  Cuéntame tu idea <span aria-hidden="true">*</span>
                  <textarea
                    id="details"
                    name="details"
                    rows="4"
                    maxLength="1800"
                    placeholder="¿Qué hace tu negocio y qué te gustaría mejorar?"
                    required
                    value={values.details}
                    onChange={update}
                    aria-invalid={!!errors.details}
                    aria-describedby={
                      errors.details ? "details-error" : undefined
                    }
                  />
                  {errors.details && (
                    <small className="error" id="details-error">
                      {errors.details}
                    </small>
                  )}
                </label>
                <label className="consent" htmlFor="consent">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={values.consent}
                    onChange={update}
                    required
                    aria-invalid={!!errors.consent}
                    aria-describedby="privacy-note"
                  />
                  <span>
                    Acepto compartir estos datos con Fabrizzio Peláez a través
                    de WhatsApp para responder mi solicitud.
                  </span>
                </label>
                {errors.consent && (
                  <small className="error">{errors.consent}</small>
                )}
                <small id="privacy-note" className="privacy-note">
                  Este formulario no guarda tus datos en una base de datos. Solo
                  prepara el mensaje; tú decides enviarlo en WhatsApp. Todos los
                  campos con * son obligatorios.
                </small>
                <button className="button primary" type="submit">
                  Preparar mi solicitud <ArrowRight size={18} />
                </button>
                {Object.values(errors).some(Boolean) && (
                  <p className="error" role="alert">
                    Revisa los campos indicados antes de continuar.
                  </p>
                )}
                {prepared && (
                  <div className="message-preview" role="status">
                    <strong>Tu mensaje está listo, aún no se envió.</strong>
                    <pre>{prepared}</pre>
                    <a
                      className="button whatsapp-button"
                      href={whatsapp(prepared)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir WhatsApp y enviar <ArrowUpRight size={18} />
                    </a>
                  </div>
                )}
              </form>
            </div>
          </section>
        </main>
        <footer className="footer shell">
          <div>
            <Brand footer />
            <p>Tecnología para negocios reales.</p>
          </div>
          <div className="footer-links">
            <a href="#soluciones">Soluciones</a>
            <a href="#planes">Planes</a>
            <a href="/icons/flexcore-1024.png" download="FLEXCORE.png">
              Descargar logo <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} FLEXCORE · Fabrizzio Peláez
            </span>
            <span>Lima, Perú. Todos los derechos reservados.</span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
createRoot(document.getElementById("root")).render(<App />);
