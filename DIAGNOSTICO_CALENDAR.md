# 🔍 Guía de Diagnóstico: Google Calendar y Meet

Esta guía te ayudará a identificar y solucionar el problema de que no se crean eventos en Google Calendar ni links de Meet.

---

## 📋 Paso 1: Verificar que el Script esté Desplegado Correctamente

### 1.1 Verificar la URL del Script
1. Ve a https://script.google.com/
2. Abre tu proyecto del script
3. Haz clic en "Desplegar" > "Gestionar implementaciones"
4. Verifica que haya una implementación activa
5. **Copia la URL** (debe terminar en `/exec`)
6. Compara esta URL con la que tienes en tu `.env` como `VITE_GOOGLE_APPS_SCRIPT_URL`

**✅ Si la URL es diferente:** Actualiza tu `.env` con la URL correcta y reinicia el servidor.

---

## 📋 Paso 2: Verificar Permisos del Script

### 2.1 Autorizar el Script Manualmente
1. Ve a https://script.google.com/
2. Abre tu proyecto
3. Haz clic en "Ejecutar" (▶️) en la barra superior
4. Selecciona la función `testCreateEvent` (si existe) o `doPost`
5. Si te pide autorización:
   - Haz clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado" > "Ir a [nombre del proyecto] (no seguro)"
   - Acepta los permisos necesarios:
     - ✅ Acceso a Google Calendar
     - ✅ Acceso a Google Meet (si se solicita)

**✅ Si no te pide autorización:** Los permisos ya están configurados, pasa al siguiente paso.

---

## 📋 Paso 3: Probar el Script Manualmente

### 3.1 Ejecutar Función de Prueba
1. En Google Apps Script, abre el editor
2. En la barra superior, selecciona la función `testCreateEvent` del dropdown
3. Haz clic en "Ejecutar" (▶️)
4. Revisa los logs:
   - Ve a "Ver" > "Logs de ejecución"
   - Deberías ver mensajes como:
     ```
     === INICIO CREACIÓN DE EVENTO ===
     Datos recibidos: {...}
     Evento creado. ID: ...
     === EVENTO CREADO EXITOSAMENTE ===
     ```

**✅ Si ves errores en los logs:**
- Copia el mensaje de error completo
- Verifica que tu cuenta de Google tenga acceso a Calendar
- Verifica que no haya restricciones de organización/empresa

**✅ Si funciona:** El script está bien, el problema está en la comunicación con el frontend.

---

## 📋 Paso 4: Verificar Logs en Tiempo Real

### 4.1 Abrir Logs de Ejecución
1. En Google Apps Script, ve a "Ver" > "Logs de ejecución"
2. Deja esta ventana abierta
3. En otra pestaña, envía un formulario desde tu landing page
4. Vuelve a los logs y verifica:
   - ¿Se recibieron los datos?
   - ¿Hay algún error?
   - ¿Se creó el evento?

**✅ Si no ves ningún log:** El formulario no está llegando al script. Verifica:
- La URL en `.env` es correcta
- El formulario se está enviando (revisa la consola del navegador)

**✅ Si ves errores:** Copia el error completo y busca la solución en la sección "Errores Comunes" más abajo.

---

## 📋 Paso 5: Verificar en Google Calendar

### 5.1 Revisar Calendario
1. Ve a https://calendar.google.com/
2. Busca eventos recientes
3. Verifica si se creó el evento:
   - ¿Aparece el evento?
   - ¿Tiene link de Google Meet?
   - ¿Está en el calendario correcto?

**✅ Si el evento NO aparece:**
- Verifica que estés usando el calendario por defecto
- Verifica que no haya filtros aplicados en la vista
- Verifica que la fecha del evento no sea en el pasado

**✅ Si el evento aparece pero NO tiene Meet:**
- Ve al evento y haz clic en "Editar"
- Verifica si hay una opción para "Agregar videollamada de Google Meet"
- Si no aparece, puede ser un problema de permisos o configuración de tu cuenta

---

## 📋 Paso 6: Verificar Consola del Navegador

### 6.1 Abrir DevTools
1. En tu landing page, abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Envía un formulario
4. Busca mensajes como:
   - `Evento creado en Calendar: {...}`
   - `✅ Email de confirmación enviado al cliente`
   - O errores en rojo

**✅ Si ves errores de CORS:**
- Esto es normal con Google Apps Script
- El código ya usa un iframe oculto para evitar CORS
- Si persiste, verifica que el script esté desplegado como "Aplicación web" con acceso "Cualquier persona"

**✅ Si no ves ningún mensaje:**
- El formulario puede no estar enviándose
- Verifica que todos los campos estén llenos
- Verifica que la fecha y hora estén seleccionadas

---

## 🐛 Errores Comunes y Soluciones

### Error: "Faltan datos requeridos"
**Causa:** El formulario no está enviando todos los campos necesarios.

**Solución:**
1. Verifica en los logs de Google Apps Script qué datos se recibieron
2. Compara con lo que se envía en `ContactForm.tsx` (líneas 109-122)
3. Asegúrate de que los nombres de los campos coincidan

---

### Error: "Calendar not found" o "No se puede acceder al calendario"
**Causa:** El script no tiene permisos o no puede acceder al calendario.

**Solución:**
1. Ve a "Ejecutar" > "Revisar permisos"
2. Acepta todos los permisos necesarios
3. Si usas una cuenta de Google Workspace, verifica que no haya restricciones de administrador

---

### Error: "Meet link not available"
**Causa:** Google Meet no se está agregando correctamente al evento.

**Solución:**
1. Verifica que tu cuenta de Google tenga acceso a Google Meet
2. Verifica que no haya restricciones de organización
3. Intenta crear un evento manualmente en Calendar con Meet para verificar que funcione

---

### El evento se crea pero no aparece el link de Meet
**Causa:** Google puede tardar unos segundos en generar el link.

**Solución:**
1. El código ya incluye un `Utilities.sleep(1000)` para esperar
2. Si persiste, el link puede estar en la descripción del evento
3. Verifica en Calendar si el evento tiene el botón "Unirse a la videollamada"

---

### No se recibe respuesta del iframe
**Causa:** El `postMessage` no está funcionando correctamente.

**Solución:**
1. Verifica que el iframe se esté creando correctamente
2. Verifica en la consola del navegador si hay errores de JavaScript
3. El código incluye un timeout de 5 segundos como respaldo

---

## ✅ Checklist Final

Antes de reportar un problema, verifica:

- [ ] La URL de Google Apps Script en `.env` es correcta y termina en `/exec`
- [ ] El script está desplegado como "Aplicación web" con acceso "Cualquier persona"
- [ ] Los permisos del script están autorizados (Calendar y Meet)
- [ ] La función `testCreateEvent` funciona cuando la ejecutas manualmente
- [ ] Los logs de Google Apps Script muestran que se recibieron los datos
- [ ] El evento aparece en Google Calendar (aunque no tenga Meet)
- [ ] La consola del navegador no muestra errores críticos
- [ ] El email de notificación llega correctamente

---

## 🆘 Si Nada Funciona

Si después de seguir todos los pasos el problema persiste:

1. **Copia estos datos:**
   - Mensajes de error completos de los logs de Google Apps Script
   - Mensajes de error de la consola del navegador
   - Screenshot de la configuración de despliegue del script
   - URL exacta que estás usando

2. **Verifica tu configuración:**
   - ¿Usas una cuenta personal de Google o Google Workspace?
   - ¿Hay restricciones de administrador en tu cuenta?
   - ¿El calendario por defecto es accesible?

3. **Prueba una solución alternativa:**
   - Crea un nuevo proyecto de Google Apps Script desde cero
   - Copia el código actualizado de `google-apps-script.js`
   - Despliega nuevamente y prueba

---

## 📝 Notas Importantes

- **Google Apps Script puede tardar unos segundos** en procesar la solicitud
- **El link de Meet puede tardar en generarse**, especialmente en la primera ejecución
- **Los logs se actualizan en tiempo real**, pero a veces hay un pequeño retraso
- **Si cambias el código del script**, debes crear una "Nueva implementación" para que los cambios surtan efecto

---

¡Buena suerte! 🚀

