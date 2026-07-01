export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone } = body;
    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ message: "Campos faltantes" }), { status: 400 });
    }
    console.log("Datos recibidos:", { name, email, phone });
    return new Response(JSON.stringify({
      message: "Solicitud procesada correctamente",
      data: body
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error en API:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
