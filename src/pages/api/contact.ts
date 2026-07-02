import type { APIRoute } from 'astro';

export const prerender = false;

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validación básica
    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ message: 'Campos faltantes' }), { status: 400 });
    }

    // Cuerpo del correo para Brevo
    const emailData = {
      sender: { name: "Cruceros Caribe 2027", email: "noreply@futurite.info" },
      to: [
        { email: "ventas@viajacomoyo.net", name: "Ventas Viaja Como Yo" },
        { email: "dev@futurite.com", name: "Dev Futurite" }
      ],
      subject: `Nuevo Lead: Crucero Caribe 2027 - ${name}`,
      htmlContent: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #546e7a;">Nuevo Prospecto Registrado</h2>
          <p>Se ha recibido una nueva solicitud de información para el <strong>Crucero por el Caribe 2027</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${phone}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Este mensaje fue enviado automáticamente desde la Landing Page.</p>
        </div>
      `
    };

    // Envío a Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Error de Brevo:', errorData);
      return new Response(JSON.stringify({ message: 'Error al enviar el correo' }), { status: 502 });
    }

    return new Response(JSON.stringify({
      message: 'Lead enviado correctamente a Brevo',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en API Contact:', error);
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
  }
};
