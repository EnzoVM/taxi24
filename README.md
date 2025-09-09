# Taxi24 API

API RESTful construida con [NestJS](https://nestjs.com/), TypeScript y PostgreSQL para la gestión de servicios de taxi.

**Documentación de la API:** [Enlace aquí](https://documenter.getpostman.com/view/23778209/2sB3HnJzKa)

## Requisitos previos

- Node.js
- npm
- Docker y Docker Compose (opcional, para el método automatizado)
- PostgreSQL

---
### Instalar Docker y Docker Compose

Si no tienes Docker y Docker Compose instalados, sigue la guía oficial:
- [Instalar Docker](https://docs.docker.com/get-started/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

---
## 1. Levantar el proyecto usando Docker Compose (recomendado)

Este método automatiza la instalación de dependencias, ejecución de migraciones y levantamiento del servidor.

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/EnzoVM/taxi24.git
   cd taxi24
   ```

2. Copia el archivo de entorno:
   ```bash
   cp .env.example .env
   ```
   Ajusta las siguientes variables de entorno.
    ```bash
    DATABASE_USER=
    DATABASE_PASSWORD=
    DATABASE_NAME=
    ```

3. Levanta los servicios:
   ```bash
   docker-compose up --build
   ```
   Esto construirá la imagen, instalará dependencias, ejecutará migraciones y levantará la API en el puerto `3000`.

4. Accede a la API en [http://localhost:3000](http://localhost:3000).
5. Si deseas acceder a la BD de datos, seria con las siguientes credenciales.
   ```bash
    Host: localhost
    Port: 5432
    Usuario: (el valor de `DATABASE_USER` en tu archivo de entorno)
    Contraseña: (el valor de `DATABASE_PASSWORD` en tu archivo de entorno)
    Base de datos: (el valor de `DATABASE_NAME` en tu archivo de entorno)
   ```
   Los valores de usuario, contraseña y nombre de base de datos corresponden a los que definiste en tu archivo .env.

---

## 2. Levantar el proyecto de forma manual

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/EnzoVM/taxi24.git
   cd taxi24
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Copia el archivo de entorno:
   ```bash
   cp .env.example .env
   ```
   Configura todas las variables de conexión a la base de datos PostgreSQL.

4. Ejecuta las migraciones:
   ```bash
   npm run migration:run
   ```

5. Levanta el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```
   O en modo producción:
   ```bash
   npm run build
   npm run start:prod
   ```

6. Accede a la API en [http://localhost:3000](http://localhost:3000).

---

## Pruebas

- **Ejecutar todas las pruebas con cobertura:**  
  ```bash
  npm run test
  ```
- **Ejecutar pruebas unitarias:**  
  ```bash
  npm run test:unit
  ```
- **Ejecutar pruebas de integración:**  
  ```bash
  npm run test:integration
  ```
---
## Migraciones

- Crear una nueva migración:
  ```bash
  npm run migration:create src/database/migrations/{Nombre de la migración}
  ```
- Ejecutar todas las migraciones:
  ```bash
  npm run migration:run
  ```
- Revertir la última migración:
  ```bash
  npm run migration:revert
  ```
- Ver migraciones ejecutadas:
  ```bash
  npm run migration:show
  ```