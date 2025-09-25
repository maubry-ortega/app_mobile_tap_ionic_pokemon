# 🧙‍♂️ Pokédex App Móvil

Una aplicación móvil híbrida de Pokémon desarrollada con **Ionic React** y **TypeScript**. Esta aplicación consume la API de Pokémon para mostrar información detallada sobre tus Pokémon favoritos, permitiendo a los usuarios explorar, buscar y gestionar sus Pokémon preferidos. Está diseñada para funcionar de manera óptima en iOS, Android y Web, utilizando Capacitor para la integración nativa. Creada con pasión por tecnologías modernas y un enfoque en la experiencia de usuario.

## 🚀 Tecnologías Utilizadas

Este proyecto se basa en un conjunto de tecnologías modernas para ofrecer una experiencia de desarrollo eficiente y una aplicación robusta:

- **Ionic Framework**: Un framework de código abierto para desarrollar aplicaciones móviles híbridas de alta calidad con tecnologías web.
- **React 19**: Una biblioteca de JavaScript para construir interfaces de usuario interactivas y eficientes.
- **TypeScript**: Un superset de JavaScript que añade tipado estático, mejorando la mantenibilidad y la detección de errores en tiempo de desarrollo.
- **Capacitor**: Un runtime nativo que permite ejecutar aplicaciones web en iOS, Android y como Progressive Web Apps (PWAs), facilitando el acceso a funcionalidades nativas del dispositivo.
- **Vite**: Una herramienta de construcción de frontend de próxima generación que ofrece un arranque de servidor de desarrollo instantáneo y una recarga en caliente ultrarrápida.
- **Cypress**: Un framework de pruebas de extremo a extremo (E2E) para asegurar la funcionalidad de la aplicación.
- **ESLint**: Una herramienta de linting para mantener la calidad del código y asegurar la consistencia del estilo.

## 📱 Características Principales

La aplicación ofrece las siguientes funcionalidades clave:

- **Pokédex interactiva**: Explora y descubre información detallada sobre una vasta colección de Pokémon.
- **Consumo de la API de Pokémon**: Integra datos en tiempo real de [PokeAPI](https://pokeapi.co/) para obtener nombres, sprites, tipos, habilidades, estadísticas y más.
- **Interfaz móvil optimizada**: Diseño adaptativo y responsivo que garantiza una excelente experiencia de usuario en dispositivos iOS y Android.
- **Navegación por pestañas**: Facilita el acceso rápido a diferentes secciones de la aplicación (Lista de Pokémon, Favoritos, Perfil/Configuración).
- **Visualización de Sprites y Tipos**: Muestra los sprites oficiales de los Pokémon y sus tipos elementales.
- **Soporte multiplataforma**: Funciona sin problemas en iOS, Android y navegadores web.
- **Desarrollo optimizado**: Beneficios de hot reload y recarga automática gracias a Vite, agilizando el ciclo de desarrollo.
- **Gestión de Favoritos**: Permite a los usuarios marcar y gestionar sus Pokémon favoritos.

## 🛠️ Instalación y Uso

Para poner en marcha el proyecto, sigue los siguientes pasos:

### Prerequisitos
- **Node.js**: Versión 16 o superior (recomendado).
- **npm o yarn**: Gestores de paquetes de Node.js.
- **Ionic CLI**: (Opcional pero recomendado) Para facilitar el desarrollo con Ionic.

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/maubry-ortega/app_mobile_tap_ionic_pokemon.git

# Navegar al directorio del proyecto
cd app_mobile_tap_ionic_pokemon

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo con Ionic
ionic serve
```

### Scripts Disponibles
El archivo `package.json` define varios scripts útiles para el desarrollo y mantenimiento del proyecto:

- `npm run dev`: Inicia el servidor de desarrollo con Vite.
- `npm run build`: Compila la aplicación para producción, generando los archivos optimizados en el directorio `dist`.
- `npm run preview`: Previsualiza la construcción de producción localmente.
- `npm run test.e2e`: Ejecuta las pruebas de extremo a extremo con Cypress.
- `npm run test.unit`: Ejecuta las pruebas unitarias con Vitest.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.

### Comandos de Ionic y Capacitor
Para la gestión de plataformas nativas y la ejecución en dispositivos:

- `ionic capacitor add ios`: Añade la plataforma iOS al proyecto.
- `ionic capacitor add android`: Añade la plataforma Android al proyecto.
- `ionic capacitor run ios`: Ejecuta la aplicación en un simulador o dispositivo iOS.
- `ionic capacitor run android`: Ejecuta la aplicación en un emulador o dispositivo Android.

## 📂 Estructura del Proyecto

La estructura del proyecto sigue una organización modular, separando las responsabilidades en diferentes directorios para facilitar la escalabilidad y el mantenimiento:

- **`.vscode/`**: Contiene configuraciones específicas para Visual Studio Code.
  - `extensions.json`: Recomendaciones de extensiones para el proyecto.
- **`android/`**: Directorio de la plataforma Android, generado por Capacitor.
  - Contiene el proyecto Android nativo para la aplicación.
- **`cypress/`**: Contiene los archivos de configuración y pruebas de Cypress.
  - `e2e/`: Pruebas de extremo a extremo.
  - `fixtures/`: Datos de prueba.
  - `support/`: Comandos y configuraciones de soporte para Cypress.
- **`public/`**: Archivos estáticos que se sirven directamente.
  - `favicon.png`: Icono de la aplicación.
  - `manifest.json`: Manifiesto de la aplicación web progresiva (PWA).
- **`src/`**: El código fuente principal de la aplicación.
  - **`src/App.tsx`**: Componente principal de la aplicación que define la estructura de navegación y las rutas.
  - **`src/App.test.tsx`**: Archivo de pruebas unitarias para el componente `App.tsx`.
  - **`src/main.tsx`**: Punto de entrada de la aplicación, donde se renderiza el componente raíz.
  - **`src/vite-env.d.ts`**: Archivo de declaración de tipos para Vite.
  - **`src/setupTests.ts`**: Archivo de configuración para las pruebas (por ejemplo, Jest o Vitest).
  - **`src/components/`**: Contiene componentes reutilizables de la interfaz de usuario.
    - `ExploreContainer.css` y `ExploreContainer.tsx`: Componente de ejemplo proporcionado por Ionic.
    - `PokemonFilters.css` y `PokemonFilters.tsx`: Componentes para aplicar filtros a la lista de Pokémon.
    - `PokemonList.tsx`: Componente encargado de mostrar la lista de Pokémon.
    - `Pokemons.css` y `Pokemons.tsx`: Componentes principales para la visualización y gestión de Pokémon.
    - `RandomPokemonCard.tsx`: Componente que muestra una tarjeta de Pokémon aleatorio.
  - **`src/models/`**: Define las interfaces y tipos de datos utilizados en la aplicación.
    - `Pokemon.models.ts`: Contiene las definiciones de tipos para los objetos Pokémon y estructuras de datos relacionadas.
  - **`src/pages/`**: Contiene las páginas principales de la aplicación, que corresponden a las pestañas de navegación.
    - `Tab1.css` y `Tab1.tsx`: Página principal que muestra la lista de Pokémon.
    - `Tab2.css` y `Tab2.tsx`: Página dedicada a los Pokémon favoritos del usuario.
    - `Tab3.css` y `Tab3.tsx`: Página de perfil o configuración, personalizable según las necesidades.
  - **`src/services/`**: Módulos que encapsulan la lógica de negocio y la interacción con APIs externas.
    - `dailyPokemon.ts`: Servicio para obtener y gestionar el Pokémon del día.
    - `favorites.ts`: Servicio para añadir, eliminar y gestionar los Pokémon favoritos.
    - `wallet.ts`: Servicio relacionado con la gestión de una cartera o recursos del usuario (si aplica).
  - **`src/theme/`**: Archivos relacionados con el tema y los estilos globales de la aplicación.
    - `variables.css`: Define las variables CSS para personalizar los colores, fuentes y otros aspectos visuales del tema de Ionic.
- **`capacitor.config.ts`**: Configuración de Capacitor para la aplicación, incluyendo `appId`, `appName` y `webDir`.
- **`ionic.config.json`**: Configuración específica de Ionic para el proyecto.
- **`package.json`**: Manifiesto del proyecto que lista dependencias, scripts y metadatos.
- **`tsconfig.json`**: Configuración del compilador TypeScript para el proyecto.
- **`vite.config.ts`**: Configuración de Vite para el proceso de construcción y desarrollo.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y commitea (`git commit -am 'feat: Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 🧙 Autor

**VolleyDevByMaubry**  
Creado con pasión por WebAssembly, inteligencia artificial y computación moderna.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

Desarrollado con ❤️ usando Ionic React