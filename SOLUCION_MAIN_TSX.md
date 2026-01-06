# 🔧 Solución: Error "Failed to load /src/main.tsx"

## ❌ Problema

El error `GET https://bryanpkfr.github.io/src/main.tsx net::ERR_ABORTED 404` indica que el navegador está intentando cargar el archivo de desarrollo en lugar del archivo compilado.

Esto significa que el `index.html` en GitHub Pages todavía tiene:
```html
<script type="module" src="/src/main.tsx"></script>  <!-- ❌ Incorrecto -->
```

En lugar de:
```html
<script type="module" crossorigin src="/bryanpkfr/assets/index-XXXXX.js"></script>  <!-- ✅ Correcto -->
```

## ✅ Solución

### Paso 1: Verificar el Último Build en GitHub Actions

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Actions"**
3. Encuentra el último workflow "Deploy to GitHub Pages"
4. **Verifica que el build se completó exitosamente** (debe tener ✅ verde)
5. Si hay errores, cópialos y compártelos

### Paso 2: Forzar un Nuevo Build

Si el último build falló o no usó el base path correcto:

1. Ve a **Actions** > **"Deploy to GitHub Pages"**
2. Haz clic en **"Run workflow"** (botón en la esquina superior derecha)
3. Selecciona la rama **"main"**
4. Haz clic en **"Run workflow"**
5. Espera 1-2 minutos a que termine

### Paso 3: Verificar el index.html Generado

Después del build, verifica en los logs del workflow que el `index.html` generado tenga:

```html
<script type="module" crossorigin src="/bryanpkfr/assets/index-XXXXX.js"></script>
<link rel="stylesheet" crossorigin href="/bryanpkfr/assets/index-XXXXX.css">
```

**NO debería tener:**
```html
<script type="module" src="/src/main.tsx"></script>  <!-- ❌ Esto es para desarrollo -->
```

### Paso 4: Limpiar la Caché

Después del despliegue:
1. Abre tu sitio en **modo incógnito**, O
2. Limpia la caché: `Ctrl+Shift+Delete` → Limpiar caché
3. O usa `Ctrl+F5` para forzar recarga

## 🔍 Verificar que el Build Funciona

### En los Logs del Workflow

Busca en los logs del paso "Build":
- Debe decir `✓ built in X.XXs`
- No debe haber errores
- El archivo `dist/index.html` debe generarse

### Verificar el index.html en GitHub Pages

1. Ve a tu sitio: `https://bryanpkfr.github.io/bryanpkfr/`
2. Haz clic derecho > **"Ver código fuente"** (o `Ctrl+U`)
3. Busca la línea con `<script`
4. Debe decir: `<script type="module" crossorigin src="/bryanpkfr/assets/...`
5. **NO debe decir**: `<script type="module" src="/src/main.tsx"`

## 🐛 Si el Problema Persiste

### Verificar que CI=true esté Configurado

El workflow ya tiene `CI: true` configurado. Verifica en los logs que se está usando.

### Verificar el Base Path

En los logs del build, verifica que Vite esté usando el base path correcto. Deberías ver algo como:
```
vite v5.4.21 building for production...
base: /bryanpkfr/
```

### Verificar que el Artifact se Subió Correctamente

En los logs del workflow, verifica que el paso "Upload artifact" se completó exitosamente.

---

## 📝 Nota Importante

El `index.html` en tu repositorio tiene `<script src="/src/main.tsx">` que es **correcto para desarrollo**. Vite automáticamente lo reemplaza durante el build con las rutas correctas a los archivos compilados.

Si ves el error de `main.tsx`, significa que el build no se ejecutó correctamente o el `index.html` generado no se está sirviendo.

---

¿El último build en GitHub Actions se completó exitosamente? Si no, ¿qué error muestra? 🚀

