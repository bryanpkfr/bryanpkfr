# Configuración del Formulario de Contacto

El formulario de la landing page actualmente usa un fallback con `mailto:`. Para que funcione correctamente en producción, necesitas integrar un servicio de email.

## Opción 1: EmailJS (Recomendado - Gratis hasta 200 emails/mes)

### Pasos:

1. **Crear cuenta en EmailJS**: https://www.emailjs.com/

2. **Instalar el paquete**:
```bash
npm install @emailjs/browser
```

3. **Actualizar `src/components/ContactForm.tsx`**:

```typescript
import emailjs from '@emailjs/browser';

// Inicializar (en useEffect o al inicio)
emailjs.init('TU_PUBLIC_KEY'); // Obtener de EmailJS dashboard

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');

  try {
    await emailjs.send(
      'TU_SERVICE_ID',      // ID del servicio de email
      'TU_TEMPLATE_ID',     // ID del template
      {
        to_email: 'b.neculfilo@gmail.com',
        from_name: formData.name,
        business_name: formData.businessName,
        what_sell: formData.whatSell,
        invests_ads: formData.investsAds,
        budget: formData.budget,
        reply_to: formData.email,
        message: `Nombre: ${formData.name}\nNegocio: ${formData.businessName}\n...`,
      }
    );
    
    setStatus('success');
    // Reset form...
  } catch (error) {
    setStatus('error');
  }
};
```

4. **Configurar template en EmailJS** con estos campos:
   - `{{to_email}}`
   - `{{from_name}}`
   - `{{business_name}}`
   - `{{what_sell}}`
   - `{{invests_ads}}`
   - `{{budget}}`
   - `{{reply_to}}`

## Opción 2: Formspree (Gratis hasta 50 submissions/mes)

1. **Crear cuenta**: https://formspree.io/

2. **Actualizar el formulario**:

```tsx
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
  {/* campos del formulario */}
</form>
```

O usar fetch:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');

  const response = await fetch('https://formspree.io/f/TU_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setStatus('success');
  } else {
    setStatus('error');
  }
};
```

## Opción 3: Backend propio

Si tienes un backend (Node.js, PHP, etc.), puedes crear un endpoint que envíe el email usando nodemailer, sendgrid, o cualquier servicio SMTP.

---

**Nota**: Actualmente el formulario usa `mailto:` como fallback temporal, que abrirá el cliente de email del usuario.

