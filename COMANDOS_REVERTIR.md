# 🔄 Comandos para Revertir Cambios

## ⚠️ IMPORTANTE: Lee esto primero

Estos comandos revertirán los cambios. Elige la opción que prefieras.

---

## Opción 1: Reset Suave (Recomendado)

Mantiene los cambios en tu directorio para revisarlos:

```bash
# Volver al commit "Configure Github Pages"
git reset --soft 40209a8

# Ver qué cambios quedaron
git status

# Si quieres descartar todo
git reset --hard 40209a8

# Forzar push (reescribe el historial en GitHub)
git push --force
```

---

## Opción 2: Reset Duro (Más Directo)

Elimina los cambios directamente:

```bash
# Volver al commit "Configure Github Pages"
git reset --hard 40209a8

# Forzar push
git push --force
```

---

## Opción 3: Volver Más Atrás

Si quieres volver antes de configurar GitHub Pages:

```bash
# Volver a "Limpieza"
git reset --hard d87a91a

# O volver a "Migración a Vite"
git reset --hard c4b1913
```

---

## ⚠️ ADVERTENCIA sobre Force Push

`git push --force` reescribe el historial en GitHub. Solo hazlo si:
- ✅ Trabajas solo en este proyecto
- ✅ No hay otros colaboradores
- ✅ Estás seguro de querer eliminar esos commits

---

## ✅ Después de Revertir

1. Verifica que el código funcione localmente: `npm run dev`
2. Revisa qué cambios necesitas conservar
3. Aplica los cambios de forma más cuidadosa
4. Haz commit y push

---

¿Quieres que ejecute alguno de estos comandos por ti? 🚀

