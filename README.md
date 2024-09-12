# Marvel Challenge

## Inicio

### Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/JandroCastro/jandro-itx-web-challenge.git
cd marvel-challenge
npm install
```

### Variables de entorno

Para conectarte a la API de Marvel, necesitarás crear un archivo .env.local en la raíz del proyecto y añadir las siguientes claves:

```
NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY=xxxxxxxx
NEXT_PUBLIC_MARVEL_PRIVATE_API_KEY=xxxxxxxx
```

Asegúrate de reemplazar las xxxxxxxx con tus claves de API reales obtenidas en [Marvel Developer Portal](https://developer.marvel.com/documentation/getting_started).

### Ejecutar el proyecto

Una vez configuradas las variables de entorno, puedes iniciar el servidor de desarrollo:

```
npm run dev
```

Abre http://localhost:3000 para ver la aplicación en el navegador.

### Ejecutar los test


El proyecto incluye pruebas unitarias utilizando Jest. Para ejecutarlas:

```
npm run test
```

## Estructura del proyecto

### Componentes

Los componentes principales se encuentran en la carpeta src/components. Por ejemplo:

```
marvel-challenge/
└── src/
    └── components/
        └── ComicCarousel/
            ├── ComicCarousel.js
            ├── ComicCarousel.module.css
            └── ComicCarousel.test.js
```

#### ComicCarousel

-`ComicCarousel.js`: Muestra una lista de cómics para un personaje seleccionado. Encapsula los datos de los cómics y gestiona la lógica de interacción.

-`ComicCarousel.module.css`: Contiene los estilos encapsulados específicamente para el componente ComicCarousel, asegurando que los estilos no se filtren globalmente.

-`ComicCarousel.test.js`: Incluye pruebas unitarias para el componente ComicCarousel, garantizando que el componente se comporte como se espera en varios escenarios.

Al colocar cada componente en su propia carpeta, mantenemos la lógica, estilos y pruebas acoplados de manera eficiente, mejorando la accesibilidad del código.

### Directorio App y Enrutamiento

Next.js maneja el enrutamiento a través del directorio app, lo que permite la generación automática de rutas según la estructura de los archivos.

-`src/app/page.js`: Esta es la página principal que renderiza el diseño y contenido inicial de la aplicación. Los demás archivos `page.js` serán las vistas en las rutas según la anidación en sus directorios.

-`src/app/layout.js`: Es el conjunto de componentes que se verán en la vista correspondiente a ese nivel y las anidadas.

-`src/app/providers.js`: Proveedores globales para gestionar el estado o contexto a lo largo de la aplicación.

-`src/app/api` es el directorio donde se anidan las rutas del servidor de Next que atiende a las llamadas del frontal para realizarlas a la API de Marvel.

#### Desacoplamiento de la API con Adapters

En la carpeta `src/api` se ha implementado una capa de servicio que centraliza las llamadas a la API de Marvel. El archivo `marvel.js` contiene todas las funciones necesarias para interactuar con las rutas de la API en el backend de Next.js, mientras que `adapter.js` se encarga de transformar los datos recibidos de la API en un formato adecuado para la aplicación.

Esta arquitectura ofrece varias ventajas:

- **Desacoplamiento**: Al separar las funciones que realizan las peticiones de los componentes que consumen los datos, la aplicación es más modular y fácil de mantener. Los componentes no dependen directamente de las respuestas de la API, sino que reciben datos ya adaptados, lo que simplifica su lógica.
- **Facilidad para Escalar**: Si la aplicación crece o si se requieren más endpoints, simplemente se pueden añadir nuevas funciones y adaptadores en `src/api`, sin tener que modificar la lógica de los componentes o las rutas.
- **Reutilización**: La estructura desacoplada facilita la reutilización del código, ya que las funciones de `marvel.js` y los adaptadores de `adapter.js` pueden ser reutilizados en distintas partes de la aplicación sin redundancia.

Este enfoque modular y desacoplado permite una gestión eficiente de los endpoints de la API, reduciendo la complejidad en la interacción entre el frontend y el backend.

## Escalabilidad del proyecto

Aunque esta estructura es adecuada para una aplicación pequeña, si el proyecto crece, podría requerir una estructura más compleja, como por ejemplo:

Estructura basada en características: Agrupar archivos por funcionalidad en lugar de por tipo (por ejemplo, en lugar de separar componentes, páginas y rutas de API, agruparlos por característica como "Personajes" o "Cómics"). Esto mantiene la funcionalidad relacionada junta y mejora la escalabilidad a medida que se agregan más características.

````
src/
├── app/
│   ├── characters/
│   │   ├── [id]/
│   │   │   ├── page.js
│   │   ├── page.js
│   └── layout.js
├── features/
│   ├── comics/
│   │   ├── ComicCarousel.js
│   │   ├── ComicCarousel.module.css
│   │   ├── ComicCarousel.test.js
│   ├── characters/
│   │   ├── CharacterCard.js
├── api/
│   ├── marvel.js
│   ├── adapter.js

```

