# 🔄 Revertir Cambios con Git

## 📋 Opciones para Volver Atrás

### Opción 1: Reset Suave (Recomendado - Mantiene los Cambios)

Esto revierte los commits pero mantiene los cambios en tu directorio para revisarlos:

```bash
# Volver 3 commits atrás (antes de los cambios de GitHub Pages)
git reset --soft HEAD~3

# O volver a un commit específico
git reset --soft 40209a8  # "Configure Github Pages"
```

**Ventaja:** Mantiene todos los cambios, puedes revisarlos y decidir qué conservar.

---

### Opción 2: Reset Duro (Cuidado - Elimina Cambios)

Esto revierte los commits y **elimina todos los cambios**:

```bash
# Volver 3 commits atrás
git reset --hard HEAD~3

# O volver a un commit específico
git reset --hard 40209a8  # "Configure Github Pages"
```

**⚠️ ADVERTENCIA:** Esto elimina permanentemente los cambios no guardados.

---

### Opción 3: Revertir Commits Específicos (Mantiene Historial)

Esto crea nuevos commits que deshacen los cambios anteriores:

```bash
# Revertir los últimos 3 commits
git revert HEAD~2..HEAD

# O revertir un commit específico
git revert 8af392b
```

**Ventaja:** Mantiene el historial completo, más seguro para trabajo en equipo.

---

## 🎯 Recomendación

Te sugiero usar **Opción 1 (Reset Suave)** para volver al commit "Configure Github Pages":

```bash
# 1. Ver qué cambios se perderían
git log --oneline 40209a8..HEAD

# 2. Hacer reset suave
git reset --soft 40209a8

# 3. Ver los cambios que quedaron
git status

# 4. Si quieres descartar todo, hacer reset duro
git reset --hard 40209a8

# 5. Forzar push (CUIDADO: esto reescribe el historial)
git push --force
```

---

## ⚠️ Advertencia sobre Force Push

Si haces `git push --force`, estarás reescribiendo el historial en GitHub. Esto está bien si:
- ✅ Trabajas solo en este proyecto
- ✅ No hay otros colaboradores
- ✅ Estás seguro de querer eliminar esos commits

---

## 🔍 Ver Qué Hay en Cada Commit

```bash
# Ver cambios en un commit específico
git show 40209a8

# Ver qué archivos cambiaron
git show 40209a8 --stat

# Ver el contenido de un archivo en un commit anterior
git show 40209a8:index.html
```

---

## ✅ Después de Revertir

1. Verifica que el código funcione localmente
2. Haz los cambios necesarios de forma más cuidadosa
3. Haz commit y push

---

¿A qué commit quieres volver? Te recomiendo `40209a8` (Configure Github Pages) 🚀

