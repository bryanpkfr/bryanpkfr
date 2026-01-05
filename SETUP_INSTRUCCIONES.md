# Instrucciones de Configuración - Sistema de Agendamiento

Este sistema permite que los clientes agenden reuniones directamente, creando automáticamente eventos en tu Google Calendar con links de Google Meet.

## 📋 Requisitos Previos

1. Cuenta de Google (para Google Calendar y Apps Script)
2. Cuenta en EmailJS (gratis hasta 200 emails/mes)

---

## 🔧 Paso 1: Configurar EmailJS

### 1.1 Crear cuenta
- Ve a https://www.emailjs.com/
- Crea una cuenta gratuita

### 1.2 Configurar servicio de email
- En el dashboard, ve a "Email Services"
- Agrega un nuevo servicio (Gmail, Outlook, etc.)
- Conecta tu cuenta de email

### 1.3 Crear templates

#### Template 1: Email para ti (notificación)
- Ve a "Email Templates" > "Create New Template"
- Nombre: "Notificación de Cliente"
- Asunto: `Nueva solicitud de Landing Page - {{business_name}}`
- Contenido:
```
Hola Bryan,

Tienes una nueva solicitud de landing page:

Nombre: {{from_name}}
Negocio: {{business_name}}
Email: {{reply_to}}
Qué vende: {{what_sell}}
Invierte en anuncios: {{invests_ads}}
Presupuesto: {{budget}}

Reunión agendada para: {{meeting_date}}

Responde a: {{reply_to}}
```

#### Template 2: Email de confirmación al cliente (opcional)
- Nombre: "Confirmación de Reunión"
- Asunto: `Confirmación: Reunión agendada para {{meeting_date}}`
- Contenido:
```
Hola {{client_name}},

Tu reunión ha sido agendada exitosamente para:

{{meeting_date}}

Link de Google Meet: {{meet_link}}

Nos vemos pronto!
Bryan Neculfilo
```

### 1.4 Obtener credenciales
- Ve a "Account" > "General"
- Copia tu "Public Key"
- Ve a "Email Services" y copia el "Service ID"
- Ve a "Email Templates" y copia el "Template ID" de cada template

---

## 📅 Paso 2: Configurar Google Apps Script

### 2.1 Crear el script
1. Ve a https://script.google.com/
2. Haz clic en "Nuevo proyecto"
3. Pega el código del archivo `google-apps-script.js`
4. Guarda el proyecto (Ctrl+S o Cmd+S)

### 2.2 Desplegar como aplicación web
1. Haz clic en "Desplegar" > "Nueva implementación"
2. Tipo: Selecciona "Aplicación web"
3. Configuración:
   - **Descripción**: "API para crear eventos en Calendar"
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: "Cualquier persona"
4. Haz clic en "Desplegar"
5. **Copia la URL** que se genera (algo como: `https://script.google.com/macros/s/.../exec`)

### 2.3 Autorizar el script
- La primera vez que se ejecute, Google pedirá autorización
- Acepta los permisos necesarios (acceso a Calendar)

---

## 🔐 Paso 3: Configurar Variables de Entorno

### 3.1 Crear archivo .env
Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_notificacion
VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID=tu_template_id_confirmacion
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

### 3.2 Agregar .env al .gitignore
Asegúrate de que `.env` esté en tu `.gitignore` para no subir las credenciales.

---

## ✅ Paso 4: Probar el Sistema

1. Ejecuta `npm run dev`
2. Llena el formulario con datos de prueba
3. Selecciona una fecha y hora
4. Envía el formulario
5. Verifica:
   - ✅ Recibes un email con los detalles
   - ✅ Se crea el evento en tu Google Calendar
   - ✅ El evento tiene link de Google Meet
   - ✅ El cliente recibe email de confirmación (si configuraste el template)

---

## 🎨 Personalización

### Cambiar horarios disponibles
Edita el array `AVAILABLE_TIMES` en `src/components/ContactForm.tsx`:

```typescript
const AVAILABLE_TIMES = [
  '09:00', '10:00', '11:00', // Tus horarios
  '14:00', '15:00', '16:00'
];
```

### Excluir fines de semana
El código ya excluye sábados y domingos. Si quieres incluirlos, elimina la función `isWeekday` y su uso en el DatePicker.

### Cambiar duración de reunión
En `ContactForm.tsx`, línea donde se calcula `endDateTime`:
```typescript
endDateTime: new Date(meetingDateTime.getTime() + 30 * 60000).toISOString()
// Cambia 30 por los minutos que quieras (30 = 30 minutos)
```

---

## 🐛 Solución de Problemas

### Error: "EmailJS not initialized"
- Verifica que `VITE_EMAILJS_PUBLIC_KEY` esté en el `.env`
- Reinicia el servidor de desarrollo después de agregar variables de entorno

### Error: "Failed to create calendar event"
- Verifica que la URL de Google Apps Script sea correcta
- Asegúrate de que el script esté desplegado como "Aplicación web"
- Verifica que hayas autorizado los permisos del script

### No se reciben emails
- Verifica que el servicio de email esté conectado en EmailJS
- Revisa la carpeta de spam
- Verifica que los IDs de template sean correctos

### El link de Meet no aparece
- Verifica que el script tenga permisos de Calendar
- Asegúrate de que el evento se esté creando correctamente
- Revisa los logs en Google Apps Script (Ver > Logs de ejecución)

---

## 📝 Notas Importantes

- **EmailJS**: Plan gratuito permite 200 emails/mes
- **Google Apps Script**: Gratis, sin límites conocidos
- **Seguridad**: Nunca subas el archivo `.env` a GitHub
- **Backup**: Guarda tus credenciales en un lugar seguro

---

## 🚀 Listo para Producción

Una vez configurado todo:
1. Verifica que todas las variables de entorno estén en tu hosting
2. Prueba el flujo completo
3. Monitorea los primeros envíos
4. Ajusta horarios y templates según necesidad

¡Listo! Tu sistema de agendamiento está funcionando. 🎉

