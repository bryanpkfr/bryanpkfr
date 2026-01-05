import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface FormData {
  name: string;
  businessName: string;
  whatSell: string;
  investsAds: string;
  budget: string;
  email: string;
  meetingDate: Date | null;
  meetingTime: string;
}

// Configuración - Reemplaza con tus credenciales de EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';

// Horarios disponibles: 09:00 a 12:15 con intervalos de 15 minutos (14 reuniones de 15 min)
const AVAILABLE_TIMES = [
  '09:00', '09:15', '09:30', '09:45',
  '10:00', '10:15', '10:30', '10:45',
  '11:00', '11:15', '11:30', '11:45',
  '12:00', '12:15'
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    whatSell: '',
    investsAds: '',
    budget: '',
    email: '',
    meetingDate: null,
    meetingTime: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Inicializar EmailJS
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Filtrar fechas pasadas y fines de semana (opcional)
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Excluir domingo (0) y sábado (6)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (!formData.meetingDate || !formData.meetingTime) {
        alert('Por favor selecciona una fecha y hora para la reunión');
        setStatus('idle');
        return;
      }

      // Formatear fecha y hora
      const meetingDateTime = new Date(formData.meetingDate);
      const [hours, minutes] = formData.meetingTime.split(':');
      meetingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      const formattedDate = format(meetingDateTime, "EEEE, d 'de' MMMM 'de' yyyy 'a las' HH:mm");

      // 1. Enviar email con EmailJS
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_email: 'b.neculfilo@gmail.com',
            to_name: 'Bryan',
            from_name: formData.name,
            business_name: formData.businessName,
            what_sell: formData.whatSell,
            invests_ads: formData.investsAds,
            budget: formData.budget,
            reply_to: formData.email,
            from_email: formData.email,
            meeting_date: formattedDate,
            meeting_datetime: meetingDateTime.toISOString(),
            client_email: formData.email,
          }
        );
      }

      // 2. Crear evento en Google Calendar y enviar confirmación al cliente
      if (GOOGLE_APPS_SCRIPT_URL) {
        try {
          // Crear un formulario HTML oculto para enviar los datos (evita CORS)
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = GOOGLE_APPS_SCRIPT_URL;
          form.target = 'hidden_iframe';
          form.style.display = 'none';

          // Crear campos del formulario
          const fields = {
            summary: `Reunión con ${formData.name} - ${formData.businessName}`,
            description: `
Nombre: ${formData.name}
Negocio: ${formData.businessName}
Email: ${formData.email}
Qué vende: ${formData.whatSell}
Invierte en anuncios: ${formData.investsAds}
Presupuesto: ${formData.budget}
            `.trim(),
            startDateTime: meetingDateTime.toISOString(),
            endDateTime: new Date(meetingDateTime.getTime() + 15 * 60000).toISOString(),
            attendeeEmail: formData.email,
          };

          // Agregar campos al formulario
          Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = String(value);
            form.appendChild(input);
          });

          // Crear iframe oculto para recibir la respuesta
          let iframe = document.getElementById('hidden_iframe') as HTMLIFrameElement;
          if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'hidden_iframe';
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
          }

          // Escuchar mensajes del iframe usando postMessage
          let messageReceived = false;
          const messageHandler = async (event: MessageEvent) => {
            // Verificar que el mensaje viene del iframe o del origen correcto
            const isFromIframe = event.source === iframe.contentWindow;
            const isFromGoogleScript = event.origin && event.origin.includes('script.google.com');
            
            console.log('📨 Mensaje recibido:', {
              source: event.source,
              origin: event.origin,
              data: event.data,
              isFromIframe,
              isFromGoogleScript
            });
            
            if (isFromIframe || isFromGoogleScript) {
              // Evitar procesar el mismo mensaje dos veces
              if (messageReceived) {
                console.log('⚠️ Mensaje ya procesado, ignorando...');
                return;
              }
              
              messageReceived = true;
              
              try {
                let calendarData = event.data;
                
                // Si el dato es un string, intentar parsearlo
                if (typeof calendarData === 'string') {
                  try {
                    calendarData = JSON.parse(calendarData);
                  } catch (e) {
                    console.warn('No se pudo parsear el mensaje como JSON:', e);
                  }
                }
                
                console.log('📅 Datos del Calendar procesados:', calendarData);
                
                if (calendarData && calendarData.success) {
                  console.log('✅ Evento creado en Calendar:', calendarData);
                  
                  // Enviar email de confirmación al cliente con el link de Meet
                  const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || '';
                  if (confirmationTemplateId && EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY) {
                    try {
                      // Determinar el link de Meet a enviar
                      let meetLink = '';
                      let meetLinkText = '';
                      
                      if (calendarData.meetLink) {
                        // Si el link contiene "meet.google.com", es un link válido
                        if (calendarData.meetLink.includes('meet.google.com')) {
                          // Asegurar que tenga https://
                          meetLink = calendarData.meetLink.startsWith('http') 
                            ? calendarData.meetLink 
                            : 'https://' + calendarData.meetLink;
                          // Formatear como HTML para que sea clickeable en el email
                          meetLinkText = `<a href="${meetLink}" style="color: #3b82f6; text-decoration: none; word-break: break-all; font-weight: 500;">${meetLink}</a>`;
                        } else {
                          // Si no es un link válido de Meet, usar mensaje alternativo
                          meetLinkText = 'El link de Google Meet estará en la invitación de Calendar que recibirás por email. También puedes abrir el evento en tu calendario y hacer clic en "Unirse a la videollamada".';
                        }
                      } else {
                        // Si no hay link, usar mensaje alternativo
                        meetLinkText = 'El link de Google Meet estará en la invitación de Calendar que recibirás por email. También puedes abrir el evento en tu calendario y hacer clic en "Unirse a la videollamada".';
                      }
                      
                      console.log('📧 Enviando email de confirmación');
                      console.log('   - Link de Meet:', meetLink || 'No disponible');
                      console.log('   - Texto a mostrar:', meetLinkText);
                      
                      await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        confirmationTemplateId,
                        {
                          to_email: formData.email,
                          client_name: formData.name,
                          meeting_date: formattedDate,
                          meet_link: meetLinkText, // Enviar el texto (link HTML o mensaje alternativo)
                        }
                      );
                      console.log('✅ Email de confirmación enviado al cliente');
                    } catch (emailError) {
                      console.error('❌ Error al enviar email de confirmación:', emailError);
                    }
                  } else {
                    console.warn('⚠️ Template de confirmación no configurado');
                  }
                } else if (calendarData && !calendarData.success) {
                  console.error('❌ Error al crear evento:', calendarData.error || calendarData.message);
                  alert('El evento se creó pero hubo un problema. Revisa los logs para más detalles.');
                } else {
                  console.warn('⚠️ Respuesta del Calendar sin formato esperado:', calendarData);
                }
              } catch (error) {
                console.error('❌ Error al procesar respuesta del Calendar:', error);
              }
              
              // Remover el listener después de recibir el mensaje
              window.removeEventListener('message', messageHandler);
            }
          };
          
          window.addEventListener('message', messageHandler);
          console.log('👂 Listener de mensajes configurado');
          
          // Timeout de seguridad: si no recibimos respuesta en 8 segundos, enviar confirmación básica
          setTimeout(async () => {
            if (!messageReceived) {
              console.warn('⏱️ Timeout: No se recibió respuesta del Calendar en 8 segundos');
              window.removeEventListener('message', messageHandler);
              
              // Verificar si ya enviamos el email
              const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || '';
              if (confirmationTemplateId && EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY) {
                try {
                  console.log('📧 Enviando email de confirmación (timeout - sin link de Meet)');
                  await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    confirmationTemplateId,
                    {
                      to_email: formData.email,
                      client_name: formData.name,
                      meeting_date: formattedDate,
                      meet_link: 'El link de Google Meet estará en la invitación de Calendar que recibirás por email. También puedes abrir el evento en tu calendario y hacer clic en "Unirse a la videollamada".',
                    }
                  );
                  console.log('✅ Email de confirmación enviado al cliente (timeout)');
                } catch (emailError) {
                  console.error('❌ No se pudo enviar email de confirmación:', emailError);
                }
              }
            } else {
              console.log('✅ Mensaje ya recibido, cancelando timeout');
            }
          }, 8000);

          // Agregar formulario al DOM y enviarlo
          console.log('📤 Enviando formulario a Google Apps Script...');
          console.log('URL:', GOOGLE_APPS_SCRIPT_URL);
          console.log('Datos:', fields);
          
          document.body.appendChild(form);
          form.submit();
          
          console.log('✅ Formulario enviado, esperando respuesta...');
          
          // Limpiar después de un momento
          setTimeout(() => {
            if (form.parentNode) {
              document.body.removeChild(form);
              console.log('🧹 Formulario removido del DOM');
            }
          }, 10000); // Aumentado a 10 segundos para dar tiempo a la respuesta

        } catch (calendarError) {
          console.warn('No se pudo crear el evento en Calendar automáticamente:', calendarError);
          // Continuamos aunque falle el calendar, el email ya se envió
        }
      } else {
        // Si no hay URL de Google Apps Script, enviar confirmación básica
        const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || '';
        if (confirmationTemplateId && EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY) {
          try {
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              confirmationTemplateId,
              {
                to_email: formData.email,
                client_name: formData.name,
                meeting_date: formattedDate,
                meet_link: 'Te contactaré pronto para coordinar la reunión',
              }
            );
          } catch (emailError) {
            console.warn('No se pudo enviar email de confirmación:', emailError);
          }
        }
      }

      setStatus('success');
      setFormData({
        name: '',
        businessName: '',
        whatSell: '',
        investsAds: '',
        budget: '',
        email: '',
        meetingDate: null,
        meetingTime: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      meetingDate: date,
      meetingTime: '', // Reset time when date changes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
      {/* Badge de Entrada */}
      <div className="mb-8 p-4 bg-primary-900/30 border border-primary-700/50 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚡</span>
          <div className="flex-1">
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              <strong className="text-primary-400">Sesión de Diagnóstico Estratégico</strong> No es una llamada de ventas común. Analizaré tu caso antes de vernos para ir directo a la solución. Por favor, sé lo más específico posible.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium mb-2">
            Nombre del negocio
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500"
            placeholder="¿Cómo se llama tu empresa/proyecto?"
          />
        </div>

        <div>
          <label htmlFor="whatSell" className="block text-sm font-medium mb-2">
            ¿Qué vendes?
          </label>
          <textarea
            id="whatSell"
            name="whatSell"
            value={formData.whatSell}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white resize-none placeholder-gray-500"
            placeholder="Ej: Software para dentistas o Consultoría de finanzas..."
          />
          <p className="mt-2 text-sm text-gray-400">
            Dime qué vendes y a qué precio medio. Esto me ayuda a saber si el margen te da para pagarme.
          </p>
        </div>

        <div>
          <label htmlFor="investsAds" className="block text-sm font-medium mb-2">
            ¿Inviertes en anuncios?
          </label>
          <select
            id="investsAds"
            name="investsAds"
            value={formData.investsAds}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
          >
            <option value="">Selecciona una opción</option>
            <option value="si-mejorar">Sí, invierto actualmente (y quiero mejorar)</option>
            <option value="listo-invertir">Tengo todo listo para empezar a invertir</option>
            <option value="aun-no">Aún no, pero entiendo que lo necesito</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-2">
            Presupuesto estimado para la Landing
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
          >
            <option value="">Selecciona un rango</option>
            <option value="300-500">$300 - $500 USD (Inversión inicial)</option>
            <option value="500-1000">$500 - $1,000 USD (Estrategia avanzada)</option>
            <option value="1000+">Más de $1,000 USD (Escalado total)</option>
          </select>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500"
            placeholder="tu@email.com"
          />
        </div>

        {/* Selección de Fecha y Hora */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="meetingDate" className="block text-sm font-medium mb-2">
              Fecha de la reunión
            </label>
            <DatePicker
              selected={formData.meetingDate}
              onChange={handleDateChange}
              filterDate={isWeekday}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
              wrapperClassName="w-full"
            />
          </div>

          <div>
            <label htmlFor="meetingTime" className="block text-sm font-medium mb-2">
              Hora de la reunión
            </label>
            <select
              id="meetingTime"
              name="meetingTime"
              value={formData.meetingTime}
              onChange={handleChange}
              required
              disabled={!formData.meetingDate}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {formData.meetingDate ? 'Selecciona una hora' : 'Primero selecciona una fecha'}
              </option>
              {AVAILABLE_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="w-full mt-8 px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 disabled:bg-primary-800 text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none"
      >
        {status === 'sending' 
          ? 'Agendando...' 
          : status === 'success' 
          ? '¡Reunión agendada exitosamente!' 
          : 'Agendar videollamada'}
      </button>

      {status === 'error' && (
        <p className="mt-4 text-center text-red-400">
          Error al agendar. Por favor intenta de nuevo o contáctame directamente a{' '}
          <a href="mailto:b.neculfilo@gmail.com" className="text-primary-400 hover:underline">
            b.neculfilo@gmail.com
          </a>
        </p>
      )}

      {status === 'success' && (
        <div className="mt-6 p-4 bg-green-900/30 border border-green-700/50 rounded-lg">
          <p className="text-center text-green-400 mb-3">
            ✅ ¡Reunión agendada exitosamente!
          </p>
          <p className="text-center text-gray-300 mb-3">
            He recibido tu solicitud y he creado el evento en mi calendario. Te he enviado un email de confirmación con todos los detalles y el link de Google Meet.
          </p>
          <p className="text-center text-gray-400 text-sm">
            Revisa tu bandeja de entrada (y spam) para encontrar el link de la reunión.
          </p>
        </div>
      )}
    </form>
  );
}
