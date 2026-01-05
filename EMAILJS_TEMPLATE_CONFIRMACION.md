# Template de Confirmación de Reunión - EmailJS

## Configuración del Template

**Nombre del Template:** Confirmación de Reunión  
**Service:** (El mismo que usas para las notificaciones)  
**Template ID:** (Copia este ID y ponlo en tu .env como `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID`)

---

## Campos del Template

### To Email
```
{{to_email}}
```
**IMPORTANTE:** Usa `{{to_email}}`, NO tu correo personal. Este campo se reemplazará automáticamente con el email del cliente.

### From Name
```
Bryan Neculfilo
```

### Reply To
```
b.neculfilo@gmail.com
```

### Subject (Asunto)
```
✅ Reunión agendada: {{meeting_date}}
```

---

## Contenido del Email (HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  
  <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1a1a1a; margin: 0; font-size: 24px;">✅ Reunión Confirmada</h1>
    </div>
    
    <!-- Saludo -->
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
      Hola <strong>{{client_name}}</strong>,
    </p>
    
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
      Tu reunión ha sido agendada exitosamente. Aquí están los detalles:
    </p>
    
    <!-- Detalles de la Reunión -->
    <div style="background-color: #f8f9fa; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 4px;">
      <p style="margin: 0 0 10px 0; font-size: 16px; color: #1a1a1a;">
        <strong>📅 Fecha y Hora:</strong><br>
        <span style="color: #3b82f6; font-size: 18px;">{{meeting_date}}</span>
      </p>
      
      <p style="margin: 15px 0 10px 0; font-size: 16px; color: #1a1a1a;">
        <strong>⏱️ Duración:</strong> 15 minutos
      </p>
      
      <p style="margin: 15px 0 0 0; font-size: 16px; color: #1a1a1a;">
        <strong>🔗 Link de Google Meet:</strong><br>
        {{{meet_link}}}
      </p>
      <!-- Nota: Usamos {{{meet_link}}} (triple llave) para que EmailJS renderice el HTML sin escapar -->
      <!-- El código de ContactForm.tsx envía el link ya formateado como HTML si es válido -->
      <p style="margin: 10px 0 0 0; font-size: 13px; color: #666; font-style: italic;">
        💡 También recibirás una invitación de Google Calendar con el link de Meet. Si el link de arriba no funciona, usa el que viene en esa invitación o abre el evento en tu calendario y haz clic en "Unirse a la videollamada".
      </p>
    </div>
    
    <!-- Información Adicional -->
    <div style="margin: 25px 0;">
      <p style="font-size: 15px; color: #666; margin-bottom: 15px;">
        <strong>💡 ¿Qué esperar?</strong>
      </p>
      <p style="font-size: 15px; color: #666; margin: 0;">
        Esta es una <strong>Sesión de Diagnóstico Estratégico</strong>. Analizaré tu caso antes de vernos para ir directo a la solución. No es una llamada de ventas común.
      </p>
    </div>
    
    <!-- CTA Button - Solo se muestra si meet_link contiene "meet.google.com" -->
    <!-- Nota: EmailJS no soporta condicionales, así que el botón solo aparecerá si el link es válido -->
    <!-- El código de ContactForm.tsx se encarga de enviar solo links válidos o un mensaje alternativo -->
    
    <!-- Footer -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
      <p style="font-size: 14px; color: #666; margin: 5px 0;">
        Si tienes alguna pregunta, responde a este email.
      </p>
      <p style="font-size: 14px; color: #666; margin: 5px 0;">
        Nos vemos pronto,<br>
        <strong style="color: #1a1a1a;">Bryan Neculfilo</strong>
      </p>
    </div>
    
  </div>
  
  <!-- Footer adicional -->
  <div style="text-align: center; margin-top: 20px; padding: 15px;">
    <p style="font-size: 12px; color: #999; margin: 0;">
      Este es un email automático. Por favor, no respondas directamente a este mensaje.
    </p>
  </div>
  
</body>
</html>
```

---

## Versión Simple (Texto Plano)

Si prefieres una versión más simple sin HTML:

```
✅ Reunión Confirmada

Hola {{client_name}},

Tu reunión ha sido agendada exitosamente.

📅 Fecha y Hora: {{meeting_date}}
⏱️ Duración: 15 minutos
🔗 Link de Google Meet: {{meet_link}}

💡 ¿Qué esperar?
Esta es una Sesión de Diagnóstico Estratégico. Analizaré tu caso antes de vernos para ir directo a la solución. No es una llamada de ventas común.

💡 Nota importante: También recibirás una invitación de Google Calendar con el link de Meet. Si el link de arriba no funciona, usa el que viene en esa invitación.

Si tienes alguna pregunta, responde a este email.

Nos vemos pronto,
Bryan Neculfilo
```

---

## Variables Disponibles

El código envía estas variables al template:

- `{{to_email}}` - Email del cliente (se usa en "To Email")
- `{{client_name}}` - Nombre del cliente
- `{{meeting_date}}` - Fecha y hora formateada (ej: "lunes, 15 de enero de 2026 a las 13:00")
- `{{meet_link}}` - Link de Google Meet (o mensaje alternativo si no está disponible)

---

## Pasos para Crear el Template

1. Ve a EmailJS Dashboard → Email Templates
2. Haz clic en "Create New Template"
3. Nombre: "Confirmación de Reunión"
4. Copia el HTML de arriba en el editor
5. En "To Email", escribe: `{{to_email}}`
6. En "Subject", escribe: `✅ Reunión agendada: {{meeting_date}}`
7. Guarda el template
8. Copia el "Template ID" y ponlo en tu `.env` como `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID`

---

## Nota Importante

**NUNCA pongas tu correo fijo en "To Email"** del template de confirmación. Siempre usa `{{to_email}}` para que el email llegue al cliente correcto.

Tu correo (`b.neculfilo@gmail.com`) solo debe ir en:
- El template de **notificación** (el que te avisa cuando llega un nuevo cliente)
- El campo "Reply To" del template de confirmación

