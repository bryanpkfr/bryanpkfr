# 🚀 Guía Completa: Desplegar en GitHub Pages

Esta guía te ayudará a desplegar tu proyecto React + Vite en GitHub Pages paso a paso.

---

## 📋 Requisitos Previos

- ✅ Cuenta de GitHub
- ✅ Git instalado en tu computadora
- ✅ Proyecto funcionando localmente

---

## 🔧 Paso 1: Configurar el Proyecto

### 1.1 Actualizar `vite.config.ts`

El archivo ya está configurado, pero necesitamos asegurarnos de que tenga el `base` correcto. Si tu repositorio se llama `bryanpkfr`, el base será `/bryanpkfr/`.

**Nota:** Si tu repositorio se llama diferente, cambia el nombre en el `base` del `vite.config.ts`.

### 1.2 Instalar gh-pages (opcional, para método manual)

Si prefieres el método manual, puedes instalar:
```bash
npm install --save-dev gh-pages
```

---

## 📦 Paso 2: Preparar el Repositorio en GitHub

### 2.1 Crear el repositorio (si no existe)

1. Ve a https://github.com/new
2. Nombre del repositorio: `bryanpkfr` (o el que prefieras)
3. **NO marques** "Initialize this repository with a README"
4. Haz clic en "Create repository"

### 2.2 Subir tu código (si aún no lo has hecho)

Si tu proyecto aún no está en GitHub:

```bash
# En la raíz de tu proyecto
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bryanpkfr.git
git push -u origin main
```

**Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.**

---

## ⚙️ Paso 3: Configurar GitHub Actions (Recomendado)

Este método despliega automáticamente cada vez que haces push a `main`.

### 3.1 Crear el workflow

El archivo `.github/workflows/deploy.yml` ya está creado. Solo necesitas:

1. **Hacer push del código a GitHub** (si aún no lo has hecho)
2. **Ir a tu repositorio en GitHub**
3. **Ir a la pestaña "Actions"**
4. **Habilitar GitHub Actions** si te lo pide

### 3.2 Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **Source**, selecciona **GitHub Actions**
5. Guarda los cambios

### 3.3 Hacer un push para activar el despliegue

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push
```

El despliegue comenzará automáticamente. Puedes ver el progreso en la pestaña **Actions** de tu repositorio.

---

## 🔄 Paso 4: Verificar el Despliegue

### 4.1 Esperar a que termine el workflow

1. Ve a la pestaña **Actions** de tu repositorio
2. Verás un workflow llamado "Deploy to GitHub Pages"
3. Espera a que termine (puede tardar 1-2 minutos)
4. Deberías ver un ✅ verde cuando termine

### 4.2 Acceder a tu sitio

Tu sitio estará disponible en:
```
https://TU_USUARIO.github.io/bryanpkfr/
```

**Reemplaza:**
- `TU_USUARIO` con tu nombre de usuario de GitHub
- `bryanpkfr` con el nombre de tu repositorio (si es diferente)

---

## 🐛 Solución de Problemas

### El sitio muestra una página en blanco

**Problema:** Las rutas de React Router no funcionan en GitHub Pages.

**Solución:** Ya está configurado en el workflow. Si persiste:
1. Verifica que el `base` en `vite.config.ts` sea correcto
2. Asegúrate de que el workflow se ejecutó correctamente

### Error 404 en las rutas

**Problema:** GitHub Pages no soporta rutas del lado del cliente por defecto.

**Solución:** El workflow ya crea un archivo `404.html` que redirige a `index.html`. Si persiste:
1. Verifica que el archivo `404.html` se creó en la carpeta `dist`
2. Verifica que el workflow se ejecutó correctamente

### Las imágenes no aparecen

**Problema:** Las rutas de las imágenes pueden estar incorrectas.

**Solución:**
1. Asegúrate de que las imágenes estén en `public/images/`
2. Las rutas deben empezar con `/` (ej: `/images/devneon.webp`)
3. No uses rutas relativas como `./images/`

### El despliegue falla

**Problema:** Puede haber errores en el build.

**Solución:**
1. Revisa los logs en la pestaña **Actions**
2. Prueba hacer build localmente: `npm run build`
3. Verifica que no haya errores de TypeScript: `npm run build`

---

## 🔐 Paso 5: Configurar Variables de Entorno (Importante)

GitHub Pages es estático, así que las variables de entorno deben estar en el código o usar otro método.

### Opción 1: Usar variables públicas (no recomendado para secretos)

Puedes hardcodear las variables en el código (solo para valores públicos).

### Opción 2: Usar GitHub Secrets (para producción)

1. Ve a tu repositorio > **Settings** > **Secrets and variables** > **Actions**
2. Agrega cada variable como un secret
3. El workflow las usará automáticamente

**Nota:** Para EmailJS y Google Apps Script, considera usar variables de entorno en el build o configurarlas directamente en el código si son públicas.

---

## 📝 Paso 6: Actualizar el Base Path (Si cambias el nombre del repo)

Si cambias el nombre de tu repositorio, actualiza:

1. **`vite.config.ts`**: Cambia el `base` a `'/NUEVO_NOMBRE/'`
2. **`.github/workflows/deploy.yml`**: Cambia `base: '/bryanpkfr/'` a `'/NUEVO_NOMBRE/'`

---

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] Código subido a GitHub
- [ ] Workflow de GitHub Actions creado
- [ ] GitHub Pages configurado (Source: GitHub Actions)
- [ ] Primer despliegue exitoso (verificado en Actions)
- [ ] Sitio accesible en `https://TU_USUARIO.github.io/bryanpkfr/`
- [ ] Todas las rutas funcionan correctamente
- [ ] Las imágenes se cargan correctamente
- [ ] El formulario funciona (verificar variables de entorno)

---

## 🎉 ¡Listo!

Tu sitio debería estar funcionando en GitHub Pages. Cada vez que hagas push a `main`, se desplegará automáticamente.

**URL de tu sitio:**
```
https://TU_USUARIO.github.io/bryanpkfr/
```

---

## 📚 Recursos Adicionales

- [Documentación de GitHub Pages](https://docs.github.com/en/pages)
- [Documentación de Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [React Router y GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)

---

¿Necesitas ayuda con algún paso? ¡Dime y te ayudo! 🚀

