# Sistema de Gestión de Inventario con Análisis Predictivo

Este proyecto es un sistema completo de gestión de inventario que combina una API REST en Node.js, un servicio de predicción en Python y un frontend web. El sistema permite manejar inventarios, realizar seguimiento de productos, y utiliza análisis predictivo para sugerir reabastecimientos.

## Características

- API RESTful en Node.js/Express
- Servicio de predicción en Python
- Frontend web
- Base de datos MySQL
- Arquitectura containerizada con Docker

## Requisitos previos

- Docker y Docker Compose
- Git

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/inventory-system.git
   cd inventory-system
   ```

2. Copia el archivo de variables de entorno:
   ```
   cp .env.example .env
   ```

3. Edita el archivo `.env` con tus configuraciones preferidas.

4. Inicia el sistema:
   ```
   docker-compose up -d
   ```

## Estructura del proyecto

```
inventory-system/
├── api/                # API en Node.js
├── prediction-service/ # Servicio de predicción en Python
├── frontend/           # Aplicación frontend
├── db/                 # Scripts de inicialización de BD
├── docker-compose.yml  # Configuración de Docker
├── .env.example        # Ejemplo de variables de entorno
└── README.md           # Este archivo
```

## Desarrollo

Para comenzar a desarrollar:

1. Cada servicio se ejecuta en su propio contenedor
2. Los cambios en el código fuente se reflejan automáticamente gracias a los volúmenes
3. Los logs se pueden ver con `docker-compose logs -f [servicio]`

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
