# Mentira Electoral

**Mentira Electoral** es un proyecto de concientización ciudadana diseñado para educar a los usuarios sobre la controvertida "Ley de Lemas" y su impacto en los procesos democráticos. El proyecto destaca las fallas de este sistema electoral y aboga por una alternativa más transparente y justa: la "Boleta Única".

## Descripción del Proyecto

Este proyecto es una aplicación web basada en React que utiliza herramientas y bibliotecas modernas para ofrecer una experiencia de usuario atractiva e informativa. A través de elementos visuales y textuales, explica cómo la "Ley de Lemas" distorsiona el proceso democrático y por qué la "Boleta Única" es una mejor alternativa.

### Características Principales

- **Contenido Educativo**: Explica la "Ley de Lemas" y sus consecuencias de manera clara y concisa.
- **Llamado a la Acción**: Motiva a los usuarios a compartir la información y generar conciencia sobre el tema.
- **Diseño Responsivo**: Optimizado para dispositivos de escritorio y móviles.
- **Interfaz Moderna**: Construida con TailwindCSS y componentes de Radix UI para una experiencia accesible y limpia.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
├── public/
│   ├── favicon.ico
│   ├── image-2.png
│   ├── placeholder.svg
│   ├── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/          # Componentes reutilizables de UI (botones, modales, tooltips)
│   │   ├── Footer.tsx   # Componente del pie de página con opciones para compartir
│   │   ├── HeroSection.tsx # Sección principal de la página de inicio
│   │   ├── InfoSection.tsx # Sección informativa que explica el problema
│   ├── hooks/           # Hooks personalizados de React
│   ├── lib/             # Funciones utilitarias
│   ├── pages/
│   │   ├── About.tsx    # Página "Acerca de" que explica la "Ley de Lemas"
│   │   ├── Index.tsx    # Página de inicio
│   ├── App.tsx          # Componente principal de la aplicación
│   ├── main.tsx         # Punto de entrada de la aplicación React
│   ├── index.css        # Estilos globales
├── package.json         # Dependencias y scripts del proyecto
├── tailwind.config.ts   # Configuración de TailwindCSS
├── vite.config.ts       # Configuración de Vite
```

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos web modernos.
- **TailwindCSS**: Framework CSS basado en utilidades para el diseño.
- **Radix UI**: Componentes de UI accesibles y personalizables.
- **React Router**: Para el enrutamiento del lado del cliente.
- **React Query**: Para la gestión del estado y la obtención de datos.
- **Lucide Icons**: Biblioteca de íconos para elementos visuales.

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- Node.js (>= 16)
- Gestor de paquetes (por ejemplo, `pnpm`, `npm` o `yarn`)

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/allexwentworthok/mentira-electoral.git
   cd mentira-electoral
   ```

2. Instalar las dependencias:
   ```bash
   pnpm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

4. Abrir la aplicación en el navegador en `http://localhost:3000`.

### Construir para Producción

Para construir el proyecto para producción, ejecutar:
```bash
pnpm build
```

El resultado estará en el directorio `dist/`.

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes sugerencias o mejoras, no dudes en abrir un issue o enviar un pull request.

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## Agradecimientos

- **Alejandro Bogado**: Desarrollador y creador del proyecto.
- **Colaboradores de la Comunidad**: Por su retroalimentación y apoyo.

## Contacto

Para preguntas o comentarios, contáctanos a través de [GitHub](https://github.com/allexwentworthok/mentira-electoral).