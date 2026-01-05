/**
 * Google Apps Script para crear eventos en Google Calendar
 * 
 * INSTRUCCIONES:
 * 1. Ve a https://script.google.com/
 * 2. Crea un nuevo proyecto
 * 3. Pega este código
 * 4. Guarda el proyecto
 * 5. Despliega como aplicación web:
 *    - Haz clic en "Desplegar" > "Nueva implementación"
 *    - Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo"
 *    - Acceso: "Cualquier persona"
 *    - Copia la URL que se genera
 * 6. Pega esa URL en tu archivo .env como VITE_GOOGLE_APPS_SCRIPT_URL
 */

// Función principal - soporta tanto GET como POST
function doGet(e) {
  return createCalendarEvent(e.parameter);
}

function doPost(e) {
  let data;
  try {
    // Intentar parsear como JSON
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      // Si viene de formulario HTML, usar parámetros
      data = e.parameter;
    }
  } catch (error) {
    // Si falla, usar parámetros del formulario
    data = e.parameter;
  }
  return createCalendarEvent(data);
}

function createCalendarEvent(data) {
  try {
    // Log detallado para debugging (ver en Ver > Logs de ejecución)
    Logger.log('=== INICIO CREACIÓN DE EVENTO ===');
    Logger.log('Datos recibidos: ' + JSON.stringify(data));
    Logger.log('Tipo de datos: ' + typeof data);
    Logger.log('Keys disponibles: ' + Object.keys(data || {}));
    
    // Validar que tengamos los datos necesarios
    if (!data) {
      throw new Error('No se recibieron datos');
    }
    
    if (!data.summary) {
      throw new Error('Falta el campo requerido: summary');
    }
    
    if (!data.startDateTime) {
      throw new Error('Falta el campo requerido: startDateTime');
    }
    
    if (!data.endDateTime) {
      throw new Error('Falta el campo requerido: endDateTime');
    }
    
    Logger.log('Validación de datos: OK');
    
    // Obtener el calendario principal
    Logger.log('Obteniendo calendario...');
    const calendar = CalendarApp.getDefaultCalendar();
    Logger.log('Calendario obtenido: ' + calendar.getName());
    
    // Convertir fechas
    const startDate = new Date(data.startDateTime);
    const endDate = new Date(data.endDateTime);
    
    Logger.log('Fecha inicio: ' + startDate.toString());
    Logger.log('Fecha fin: ' + endDate.toString());
    
    // Crear el evento con Google Meet
    Logger.log('Creando evento en Calendar...');
    const event = calendar.createEvent(
      data.summary,
      startDate,
      endDate,
      {
        description: data.description || '',
        guests: data.attendeeEmail || '',
        sendInvites: true
      }
    );
    
    Logger.log('Evento creado. ID: ' + event.getId());
    
    // Agregar Google Meet al evento
    Logger.log('Agregando Google Meet...');
    let meetLink = '';
    try {
      // Agregar Google Meet al evento
      event.addConferenceLink(CalendarApp.ConferenceServiceType.MEET);
      Logger.log('Google Meet agregado exitosamente');
      
      // Esperar un momento para que Google genere el link (aumentado a 2 segundos)
      Utilities.sleep(2000);
      
      // Método 1: Obtener desde getConferenceLink() (más confiable)
      try {
        meetLink = event.getConferenceLink();
        if (meetLink) {
          Logger.log('Link de Meet obtenido (getConferenceLink): ' + meetLink);
        }
      } catch (e) {
        Logger.log('getConferenceLink no disponible: ' + e.toString());
      }
      
      // Método 2: Obtener desde ConferenceData
      if (!meetLink) {
        try {
          const conferenceData = event.getConferenceData();
          if (conferenceData) {
            const entryPoints = conferenceData.getEntryPoints();
            if (entryPoints && entryPoints.length > 0) {
              meetLink = entryPoints[0].getUri();
              Logger.log('Link de Meet obtenido (ConferenceData): ' + meetLink);
            }
          }
        } catch (e) {
          Logger.log('ConferenceData no disponible: ' + e.toString());
        }
      }
      
      // Método 3: Obtener desde la descripción (Google a veces lo agrega ahí)
      if (!meetLink) {
        try {
          const description = event.getDescription();
          if (description) {
            // Buscar patrón de link de Meet en la descripción
            const meetPattern = /https?:\/\/meet\.google\.com\/[a-z-]+/i;
            const match = description.match(meetPattern);
            if (match) {
              meetLink = match[0];
              Logger.log('Link de Meet obtenido (descripción): ' + meetLink);
            }
          }
        } catch (e) {
          Logger.log('No se pudo obtener de descripción: ' + e.toString());
        }
      }
      
      // Método 4: Obtener desde location
      if (!meetLink) {
        try {
          const location = event.getLocation();
          if (location && location.includes('meet.google.com')) {
            meetLink = location;
            Logger.log('Link de Meet obtenido (location): ' + meetLink);
          }
        } catch (e) {
          Logger.log('No se pudo obtener de location: ' + e.toString());
        }
      }
      
      // Método 5: Refrescar el evento y volver a intentar
      if (!meetLink) {
        Logger.log('Link de Meet no disponible aún, refrescando evento...');
        Utilities.sleep(1000);
        try {
          const refreshedEvent = calendar.getEventById(event.getId());
          meetLink = refreshedEvent.getConferenceLink();
          if (meetLink) {
            Logger.log('Link de Meet obtenido después de refrescar: ' + meetLink);
          }
        } catch (refreshError) {
          Logger.log('Error al refrescar evento: ' + refreshError.toString());
        }
      }
      
      // Asegurar que el link tenga el formato correcto
      if (meetLink && !meetLink.startsWith('http')) {
        meetLink = 'https://' + meetLink.replace(/^https?:\/\//, '');
      }
      
    } catch (meetError) {
      Logger.log('Error al agregar Meet: ' + meetError.toString());
      Logger.log('Stack trace: ' + meetError.stack);
      // Continuar aunque falle Meet
    }
    
    Logger.log('=== EVENTO CREADO EXITOSAMENTE ===');
    Logger.log('Event ID: ' + event.getId());
    Logger.log('Meet Link: ' + (meetLink || 'NO DISPONIBLE'));
    Logger.log('HTML Link: ' + event.getHtmlLink());
    
    // Si aún no tenemos el link, usar el HTML link del evento (el cliente puede hacer clic ahí)
    // O indicar que el link estará en la invitación de Calendar
    let finalMeetLink = meetLink;
    if (!finalMeetLink) {
      // El link estará disponible en la invitación de Calendar que Google envía automáticamente
      finalMeetLink = event.getHtmlLink() || 'El link de Google Meet estará en la invitación de Calendar que recibirás por email';
      Logger.log('⚠️ Link de Meet no disponible, usando HTML link o mensaje alternativo');
    }
    
    // Retornar respuesta JSON con HTML para que se muestre en el iframe
    const response = {
      success: true,
      eventId: event.getId(),
      meetLink: finalMeetLink,
      htmlLink: event.getHtmlLink(),
      hasMeetLink: !!meetLink // Indica si tenemos el link directo de Meet
    };
    
    Logger.log('Respuesta a enviar: ' + JSON.stringify(response));
    
    // Retornar como HTML para que se pueda leer en el iframe
    const htmlOutput = HtmlService.createHtmlOutput(
      '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><script>try { parent.postMessage(' + 
      JSON.stringify(response) + 
      ', "*"); } catch(e) { console.error("Error en postMessage:", e); }</script><p>Evento creado. Revisa la consola del navegador.</p></body></html>'
    );
    
    return htmlOutput;
      
  } catch (error) {
    Logger.log('=== ERROR AL CREAR EVENTO ===');
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    Logger.log('Datos recibidos: ' + JSON.stringify(data));
    
    // Retornar error como HTML también
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: 'No se pudo crear el evento en Google Calendar. Verifica los logs en Google Apps Script.'
    };
    
    const htmlOutput = HtmlService.createHtmlOutput(
      '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><script>try { parent.postMessage(' + 
      JSON.stringify(errorResponse) + 
      ', "*"); } catch(e) { console.error("Error en postMessage:", e); }</script><p>Error al crear evento. Revisa la consola del navegador.</p></body></html>'
    );
    
    return htmlOutput;
  }
}

// Función de prueba (opcional)
function testCreateEvent() {
  const testData = {
    summary: 'Reunión de Prueba',
    description: 'Esta es una reunión de prueba',
    startDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Mañana
    endDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60000).toISOString(), // 30 min después
    attendeeEmail: 'b.neculfilo@gmail.com'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

