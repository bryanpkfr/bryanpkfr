# 📸 Instrucciones para Agregar Imágenes al Home

## 📁 Dónde colocar las imágenes

Coloca tus imágenes en la carpeta `public/images/`:

```
public/
  images/
    devneon.webp    - Imagen para Desarrollo Web
    parkour.webp    - Imagen para Parkour Coach
```

## 🖼️ Nombres de archivos

El código está configurado para usar estas imágenes:
- **`devneon.webp`** - Imagen de fondo para la sección "Desarrollo Web"
- **`parkour.webp`** - Imagen de fondo para la sección "Parkour Coach"

## 📝 Pasos para agregar imágenes

### Pasos para agregar las imágenes
1. Prepara tus imágenes en formato WebP (o JPG/PNG)
2. Nómbralas exactamente:
   - `devneon.webp` - Para Desarrollo Web
   - `parkour.webp` - Para Parkour Coach
3. Colócalas en `public/images/`
4. ¡Listo! Las imágenes aparecerán automáticamente

## 🎨 Recomendaciones de imágenes

### Para "Desarrollo Web":
- Imágenes relacionadas con código, tecnología, diseño web
- Colores que combinen con el tema oscuro/azul
- Resolución recomendada: 1920x1080px o superior

### Para "Parkour Coach":
- Imágenes de parkour, movimiento, atletismo
- Colores que combinen con el tema azul/gris
- Resolución recomendada: 1920x1080px o superior

## 🔧 Ajustes opcionales

### Cambiar la opacidad de la imagen
En `HomePage.tsx`, busca:
```tsx
opacity-60 group-hover:opacity-70
```
Puedes cambiarlo a:
- `opacity-40` - Más transparente
- `opacity-80` - Menos transparente

### Cambiar la intensidad del overlay
Busca:
```tsx
bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-primary-900/70
```
Puedes ajustar los valores `/70`, `/60` para hacer el overlay más o menos oscuro.

### Cambiar los nombres de las imágenes
Si quieres usar otros nombres, edita `src/pages/HomePage.tsx`:
- Para Desarrollo Web: busca `devneon.webp` y cámbialo
- Para Parkour: busca `parkour.webp` y cámbialo

### Desactivar imagen si no la tienes
Si no tienes una imagen, simplemente no la coloques. El gradiente de fondo seguirá funcionando.

## ✅ Verificar que funciona

1. Coloca las imágenes en `public/images/`
2. Reinicia el servidor (`npm run dev`)
3. Abre el navegador y ve a la página de inicio
4. Deberías ver las imágenes de fondo en cada sección

## 🐛 Solución de problemas

### La imagen no aparece
- Verifica que el archivo esté en `public/images/` (no en `src/assets/images/`)
- Verifica que el nombre del archivo coincida exactamente (mayúsculas/minúsculas importan)
- Verifica la extensión del archivo (.jpg, .png, .webp)
- Refresca el navegador con Ctrl+F5 (limpiar caché)

### La imagen se ve muy oscura/clara
- Ajusta la opacidad (ver sección "Ajustes opcionales")
- Ajusta el overlay oscuro

### La imagen no se ve bien en móvil
- Las imágenes se ajustan automáticamente con `bg-cover`
- Si necesitas una imagen diferente para móvil, puedes usar media queries en el CSS

---

¡Listo! Si tienes problemas, comparte el error que ves y te ayudo a solucionarlo. 🚀

