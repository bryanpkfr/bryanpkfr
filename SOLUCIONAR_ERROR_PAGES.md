# 🔧 Solucionar Error: "Get Pages site failed"

## ❌ Error

```
Get Pages site failed. Please verify that the repository has Pages enabled 
and configured to build using GitHub Actions
```

## ✅ Solución Paso a Paso

### Paso 1: Verificar que el Repositorio es Público

1. Ve a tu repositorio en GitHub
2. **Settings > General**
3. Verifica que el repositorio sea **Público** (no Privado)
4. Si es privado, hazlo público (ver `HACER_REPO_PUBLICO.md`)

### Paso 2: Habilitar GitHub Pages

1. Ve a **Settings > Pages**
2. En la sección **"Source"**, deberías ver un dropdown
3. **Selecciona "GitHub Actions"** (NO "Deploy from a branch")
4. Si no aparece "GitHub Actions", espera unos segundos y recarga la página
5. **Guarda** (se guarda automáticamente)

### Paso 3: Verificar Permisos

1. Ve a **Settings > Actions > General**
2. En **"Workflow permissions"**, asegúrate de que esté seleccionado:
   - **"Read and write permissions"** ✅
   - **"Allow GitHub Actions to create and approve pull requests"** ✅ (opcional pero recomendado)

### Paso 4: Re-ejecutar el Workflow

1. Ve a la pestaña **Actions**
2. Encuentra el workflow que falló
3. Haz clic en él
4. Haz clic en **"Re-run all jobs"** (botón en la esquina superior derecha)

O simplemente haz un nuevo push:

```bash
git add .
git commit -m "Trigger Pages deployment"
git push
```

---

## 🔍 Verificación Completa

### Checklist:

- [ ] Repositorio es **Público**
- [ ] **Settings > Pages** tiene **Source: GitHub Actions** seleccionado
- [ ] **Settings > Actions > General** tiene permisos de escritura habilitados
- [ ] Workflow se ejecuta sin errores de sintaxis
- [ ] El workflow tiene los permisos correctos (`pages: write`)

---

## 🐛 Si Sigue Sin Funcionar

### Opción 1: Verificar que el Workflow Tiene los Permisos Correctos

El workflow ya tiene estos permisos (están correctos):
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### Opción 2: Habilitar Pages Manualmente la Primera Vez

A veces GitHub necesita que habilites Pages manualmente la primera vez:

1. Ve a **Settings > Pages**
2. Si ves un mensaje como "Pages is disabled", haz clic en algún botón para habilitarlo
3. Luego selecciona **"GitHub Actions"** como Source

### Opción 3: Esperar unos Minutos

A veces GitHub tarda unos minutos en reconocer la configuración. Espera 2-3 minutos y vuelve a intentar.

---

## 📝 Comandos para Reintentar

```bash
# Hacer un pequeño cambio para activar el workflow
git add .
git commit -m "Enable GitHub Pages"
git push
```

---

## ✅ Después de Configurar Correctamente

Una vez que todo esté configurado:

1. El workflow debería ejecutarse sin errores
2. Verás un ✅ verde cuando termine
3. Tu sitio estará disponible en: `https://bryanpkfr.github.io/bryanpkfr/`

---

¿Necesitas ayuda con algún paso específico? 🚀

