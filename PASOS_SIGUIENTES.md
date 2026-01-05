# 🚀 Pasos Siguientes - Actualizar URL y Probar

## Paso 1: Actualizar la URL en el archivo .env

1. **Abre el archivo `.env`** en la raíz de tu proyecto
   - Si no existe, créalo copiando `ENV_EXAMPLE.txt` y renombrándolo a `.env`

2. **Busca esta línea:**
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/...
   ```

3. **Reemplaza la URL antigua con la nueva URL** que acabas de copiar
   - Debe terminar en `/exec`
   - Ejemplo:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxmYHm-19Wya_K3UTfDGh8UYaANdQTb64l0XwwQlUEK_SjFH7DfHYteqWim6o83TG2q/exec
   ```

4. **Guarda el archivo** (Ctrl+S)

---

## Paso 2: Reiniciar el servidor de desarrollo

**IMPORTANTE:** Después de cambiar variables de entorno, siempre debes reiniciar el servidor.

1. **Detén el servidor actual:**
   - En la terminal donde está corriendo `npm run dev`, presiona `Ctrl+C`

2. **Inicia el servidor nuevamente:**
   ```bash
   npm run dev
   ```

---

## Paso 3: Probar el sistema

### 3.1 Abrir la consola del navegador
1. Abre tu landing page en el navegador
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Ve a la pestaña **"Console"**

### 3.2 Abrir los logs de Google Apps Script
1. En otra pestaña, ve a https://script.google.com/
2. Abre tu proyecto del script
3. Ve a **"Ver" > "Logs de ejecución"**
4. Deja esta ventana abierta para ver los logs en tiempo real

### 3.3 Enviar un formulario de prueba
1. Vuelve a tu landing page
2. Llena el formulario con datos de prueba:
   - Nombre: "Test Usuario"
   - Negocio: "Test Negocio"
   - Email: **Tu email personal** (para recibir la confirmación)
   - Selecciona una fecha y hora
3. Haz clic en **"Agendar videollamada"**

### 3.4 Verificar que funcione

**En la consola del navegador deberías ver:**
```
📤 Enviando formulario a Google Apps Script...
✅ Formulario enviado, esperando respuesta...
📨 Mensaje recibido: {...}
✅ Evento creado en Calendar: {...}
✅ Email de confirmación enviado al cliente
```

**En los logs de Google Apps Script deberías ver:**
```
=== INICIO CREACIÓN DE EVENTO ===
Datos recibidos: {...}
Evento creado. ID: ...
Link de Meet obtenido: ...
=== EVENTO CREADO EXITOSAMENTE ===
```

**En Google Calendar:**
1. Ve a https://calendar.google.com/
2. Busca el evento que acabas de crear
3. Verifica que tenga el link de Google Meet

**En tu email:**
- Deberías recibir el email de confirmación con el link de Meet

---

## ❌ Si algo no funciona

### No veo mensajes en la consola del navegador
- Verifica que el servidor esté corriendo
- Verifica que la URL en `.env` sea correcta
- Refresca la página (F5)

### No veo logs en Google Apps Script
- Verifica que el script esté desplegado correctamente
- Verifica que la URL termine en `/exec`
- Intenta ejecutar manualmente la función `testCreateEvent` (si existe)

### El evento no aparece en Calendar
- Verifica los logs de Google Apps Script para ver si hay errores
- Verifica que tengas permisos de Calendar
- Verifica que estés usando el calendario correcto

### No recibo el email de confirmación
- Verifica que el template de confirmación esté configurado en EmailJS
- Verifica que `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID` esté en el `.env`
- Revisa la carpeta de spam

---

## ✅ Checklist rápido

- [ ] URL actualizada en `.env`
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Consola del navegador abierta (F12)
- [ ] Logs de Google Apps Script abiertos
- [ ] Formulario enviado con datos de prueba
- [ ] Evento aparece en Google Calendar
- [ ] Email de confirmación recibido

---

¡Listo! Si sigues estos pasos y algo no funciona, comparte los mensajes de error que veas en la consola o en los logs. 🚀

