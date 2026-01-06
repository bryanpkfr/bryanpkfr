# 📄 Configurar GitHub Pages - Pasos Rápidos

## ✅ Pasos para Activar GitHub Pages

### Paso 1: Ir a Settings del Repositorio

1. Ve a tu repositorio en GitHub: `https://github.com/bryanpkfr/bryanpkfr`
2. Haz clic en la pestaña **"Settings"** (Configuración)
   - Está en la barra superior del repositorio, junto a "Code", "Issues", etc.

### Paso 2: Ir a la Sección Pages

1. En el menú lateral izquierdo, busca y haz clic en **"Pages"**
   - Está en la sección "Code and automation"

### Paso 3: Configurar el Source

1. En la sección **"Source"**, verás un dropdown
2. Selecciona **"GitHub Actions"** (NO selecciones "Deploy from a branch")
3. **No necesitas cambiar nada más**
4. GitHub guardará automáticamente

### Paso 4: Verificar que el Workflow Está Activo

1. Ve a la pestaña **"Actions"** de tu repositorio
2. Deberías ver un workflow llamado **"Deploy to GitHub Pages"**
3. Si ya hiciste un push, debería estar ejecutándose o haber terminado

### Paso 5: Esperar el Despliegue

1. El workflow tarda aproximadamente **1-2 minutos**
2. Verás un círculo amarillo mientras se ejecuta
3. Cuando termine, verás un ✅ verde

### Paso 6: Acceder a tu Sitio

Una vez que el despliegue termine, tu sitio estará disponible en:

```
https://bryanpkfr.github.io/bryanpkfr/
```

**Nota:** Puede tardar unos minutos más en estar completamente accesible.

---

## 🔍 Verificar que Todo Está Configurado

### Checklist:

- [ ] Repositorio creado en GitHub
- [ ] Código subido (git push completado)
- [ ] Settings > Pages configurado (Source: GitHub Actions)
- [ ] Workflow ejecutándose o completado en Actions
- [ ] Sitio accesible en la URL

---

## 🐛 Si No Ves la Opción "GitHub Actions"

Si en Settings > Pages solo ves "Deploy from a branch" y no "GitHub Actions":

1. **Verifica que el workflow existe:**
   - Ve a la pestaña **"Actions"**
   - Deberías ver el workflow "Deploy to GitHub Pages"
   - Si no aparece, haz un push del código

2. **Haz un push para activar el workflow:**
   ```bash
   git add .
   git commit -m "Activate GitHub Pages"
   git push
   ```

3. **Espera unos segundos y vuelve a Settings > Pages**
   - Ahora debería aparecer la opción "GitHub Actions"

---

## 📸 Ubicación Visual

```
Repositorio GitHub
├── Code (pestaña)
├── Issues
├── Pull requests
├── Actions ← Aquí ves el workflow
├── Projects
├── Wiki
├── Security
└── Settings ← Aquí configuras Pages
    └── Pages (menú lateral izquierdo)
        └── Source: GitHub Actions ← Selecciona esto
```

---

## ⚡ Comandos Rápidos

Si necesitas hacer push del código:

```bash
# Verificar estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Configure GitHub Pages"

# Push
git push -u origin main
```

---

## 🎉 ¡Listo!

Una vez configurado, cada vez que hagas `git push` a `main`, el sitio se desplegará automáticamente.

**Tu sitio estará en:**
```
https://bryanpkfr.github.io/bryanpkfr/
```

---

¿Necesitas ayuda con algún paso específico? 🚀

