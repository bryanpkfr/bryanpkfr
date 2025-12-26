# Bryan Neculfilo - Professional Website

Página web profesional enfocada en la venta de landing pages de alta conversión para pequeños negocios y emprendedores.

## 🎯 Propósito

Este sitio web está diseñado para:
- **Vender landing pages de alta conversión** para pequeños negocios
- Mostrar el valor de soluciones simples y efectivas
- Conectar la disciplina del parkour con el desarrollo web
- Generar leads y conversiones

## ✨ Características

- 🌐 **Bilingüe**: Inglés y Español con toggle de idioma
- 📱 **Totalmente responsive**: Diseño adaptativo para todos los dispositivos
- ⚡ **Rápido**: Construido con Vite para máximo rendimiento
- 🎨 **Moderno y minimalista**: Diseño profesional orientado a conversión
- 💬 **Integración WhatsApp**: Botón directo para contacto
- 🏃 **Brand positioning**: Combina disciplina atlética con desarrollo web

## 🏗️ Estructura del Sitio

1. **Hero Section** - Propuesta de valor principal: "Landing Pages de Alta Conversión"
2. **Services** - Landing Page Express con 6 características clave
3. **Why Work With Me** - Mentalidad de atleta aplicada al desarrollo
4. **Parkour** - Sección secundaria de credibilidad (logros y background)
5. **Contact** - Formulario + botón WhatsApp

## 🚀 Instalación y Uso

### Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción

```bash
npm run build
npm run preview
```

## 📝 Configuración

### WhatsApp

Edita `src/components/Contact.tsx` y actualiza el número de WhatsApp:

```typescript
const whatsappNumber = '56912345678'; // Tu número aquí
```

Formato: código país + número (sin + ni espacios)
- Ejemplo Chile: `56912345678` (56 = código país, 9 = móvil, resto = número)

### Contenido

Edita los archivos de traducción:
- `src/locales/es.json` - Contenido en español
- `src/locales/en.json` - Contenido en inglés

## 🎨 Personalización

### Colores

Modifica `tailwind.config.js` para cambiar la paleta de colores:

```javascript
colors: {
  primary: {
    // Tus colores aquí
  }
}
```

### Estilos

- `src/index.css` - Estilos globales
- `tailwind.config.js` - Configuración de Tailwind

## 📦 Tecnologías

- **Vite** - Build tool ultra-rápido
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **React Router** - Routing
- **react-i18next** - Internacionalización

## 🚢 Despliegue

Puedes desplegar en:
- [Vercel](https://vercel.com) (recomendado)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- Cualquier hosting estático

## 📄 Licencia

Todos los derechos reservados © Bryan Neculfilo

---

**Enfoque**: Este sitio está diseñado como una herramienta de conversión, no como un portfolio. El parkour sirve como elemento de credibilidad, pero el foco principal está en los servicios de landing pages.
