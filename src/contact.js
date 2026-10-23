export const PHONE = "51992272521";
export const services = [
  "Página web",
  "Chatbot de WhatsApp",
  "Sistema de gestión / POS",
  "FLEXQR",
  "Panel de promociones",
  "Asesoría",
];
export function validate(values) {
  const errors = {};
  if ((values.name || "").trim().length < 2)
    errors.name = "Escribe tu nombre (mínimo 2 caracteres).";
  if ((values.business || "").trim().length < 2)
    errors.business = "Indica el nombre de tu negocio.";
  if (
    !/^\+?[\d\s()-]{7,22}$/.test(values.phone || "") ||
    (values.phone || "").replace(/\D/g, "").length < 7
  )
    errors.phone =
      "Escribe tu WhatsApp con código de país, por ejemplo +51 992 272 521.";
  if (!services.includes(values.service))
    errors.service = "Selecciona un servicio.";
  if ((values.details || "").trim().length < 15)
    errors.details = "Cuéntanos un poco más (mínimo 15 caracteres).";
  if (!values.consent)
    errors.consent = "Confirma que deseas compartir estos datos por WhatsApp.";
  return errors;
}
export function message(values) {
  return `Hola, FLEXCORE. Quiero ${values.kind === "asesoria" ? "solicitar una asesoría" : "solicitar una cotización"}.\n\nNombre: ${values.name.trim()}\nNegocio: ${values.business.trim()}\nWhatsApp: ${values.phone.trim()}\nServicio: ${values.service}\n\nLo que necesito:\n${values.details.trim()}\n\nEntiendo que el alcance, el precio final y la disponibilidad se confirman personalmente.`;
}
export function whatsapp(text) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}
