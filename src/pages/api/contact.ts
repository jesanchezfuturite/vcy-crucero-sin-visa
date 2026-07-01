import type { APIRoute } from 'astro';

export const prerender = false; // Este es un endpoint dinámico (SSR)

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validación básica
    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ message: 'Campos faltantes' }), { status: 400 });
    }

    // --- INTEGRACIÓN CON BREVO ---
    // En un entorno real, usarías la API de Brevo aquí.
    // fetch('https://api.brevo.com/v3/contacts', { ... })
    
    console.log('Datos recibidos:', { name, email, phone });

    // Simulamos un procesamiento exitoso
    return new Response(JSON.stringify({
      message: 'Solicitud procesada correctamente',
      data: body
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API:', error);
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
  }
};
