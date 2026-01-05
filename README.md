# Bryan Neculfilo - Portfolio

Portfolio personal de Bryan Neculfilo, desarrollador web y coach de parkour.

## 🚀 Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos
- **React Router** - Navegación
- **i18next** - Internacionalización (ES/EN)
- **EmailJS** - Envío de emails
- **Google Apps Script** - Integración con Google Calendar

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🌐 Despliegue en GitHub Pages

El proyecto está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions.

### Configuración Inicial

1. **Actualizar el nombre del repositorio** (si es diferente a `bryanpkfr`):
   - Edita `vite.config.ts` y cambia `base: '/bryanpkfr/'` por tu nombre de repo
   - Edita `.github/workflows/deploy.yml` y actualiza los comentarios si es necesario
   - Edita `public/404.html` y cambia `var repoName = 'bryanpkfr';`

2. **Subir el código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/bryanpkfr.git
   git push -u origin main
   ```

3. **Configurar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Settings > Pages
   - Source: GitHub Actions
   - Guarda

4. **El despliegue comenzará automáticamente**

### Variables de Entorno

Para producción, configura los secrets en GitHub:
- Settings > Secrets and variables > Actions
- Agrega los secrets necesarios (ver `.github/workflows/deploy.yml`)

**Variables necesarias:**
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_GOOGLE_APPS_SCRIPT_URL`

## 📁 Estructura del Proyecto

```
├── public/
│   ├── images/          # Imágenes estáticas
│   ├── videos/          # Videos
│   └── 404.html         # Redirección para GitHub Pages
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── locales/       # Traducciones (i18n)
│   └── assets/         # Assets del proyecto
├── .github/
│   └── workflows/
│       └── deploy.yml   # Workflow de GitHub Actions
└── vite.config.ts      # Configuración de Vite
```

## 🎨 Páginas

- `/` - Página principal (Home)
- `/web` - Desarrollo Web (En construcción)
- `/parkour` - Parkour Coach (En construcción)
- `/landing-ads` - Landing Page para anuncios
- `/contact` - Página de contacto
- `/video` - Página de video

## 📝 Notas

- Las imágenes deben estar en `public/images/`
- Los videos deben estar en `public/videos/`
- El proyecto usa React Router con rutas del lado del cliente
- GitHub Pages está configurado para manejar las rutas correctamente

## 📄 Licencia

Este proyecto es privado.

---

Desarrollado con ❤️ por Bryan Neculfilo
