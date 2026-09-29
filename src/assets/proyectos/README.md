# Fotos de obra

Cada proyecto tiene su carpeta, nombrada igual que el `id` en `src/data/projects.ts`.

```
src/assets/proyectos/
  plaza-2867/
    antes.jpg
    despues.jpg
    01.jpg
    02.jpg
```

## Cómo agregar un proyecto

1. Creá la carpeta con el slug del proyecto (minúsculas, con guiones).
2. Poné las fotos adentro. La primera del array es la portada.
3. Importalas en `src/data/projects.ts` y sumalas a `images`.

## Antes / después

Para el slider de `beforeAfter`, las dos fotos tienen que ser **el mismo
encuadre del mismo edificio**. Si el ángulo cambia, el slider no se lee.
Nombralas `antes.jpg` y `despues.jpg`.

## Formato

- **JPG** para fotografía, **PNG** sólo para logos con transparencia.
- Lado largo máximo **2000 px**. Más que eso no se ve mejor y pesa el triple.
- Corré `npm run media` después de agregar archivos: comprime todo y genera los
  WebP. No subas PNG de 9 MB al repo.
