import test from "node:test";
import assert from "node:assert/strict";
import { validate, message, whatsapp } from "../src/contact.js";
const valid = {
  name: "Ana Pérez",
  business: "Café Lima",
  phone: "+51 992 272 521",
  service: "Página web",
  details: "Quiero una web para mostrar mis productos.",
  kind: "cotizacion",
  consent: true,
};
test("accepts a complete request", () => assert.deepEqual(validate(valid), {}));
test("requires all six mandatory fields", () =>
  assert.equal(Object.keys(validate({})).length, 6));
test("rejects an invalid phone and unknown service", () => {
  const errors = validate({ ...valid, phone: "hola", service: "otro" });
  assert.ok(errors.phone);
  assert.ok(errors.service);
});
test("requires explicit consent", () =>
  assert.ok(validate({ ...valid, consent: false }).consent));
test("message contains all fields and no automatic confirmation", () => {
  const text = message(valid);
  for (const s of [
    "Ana Pérez",
    "Café Lima",
    "+51 992 272 521",
    "Página web",
    valid.details,
    "se confirman personalmente",
  ])
    assert.ok(text.includes(s));
});
test("advisory request uses the right label", () =>
  assert.ok(
    message({ ...valid, kind: "asesoria" }).includes("solicitar una asesoría"),
  ));
test("WhatsApp link round trips accents, symbols and line breaks", () => {
  const text = "Cotización & café\n+51";
  const url = new URL(whatsapp(text));
  assert.equal(url.host, "wa.me");
  assert.equal(url.pathname, "/51992272521");
  assert.equal(url.searchParams.get("text"), text);
});
