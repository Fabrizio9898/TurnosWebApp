# TurnosWebApp

Plataforma de gestión de citas médicas y automatización de flujos de comunicación con pacientes a través de WhatsApp.

Este proyecto utiliza una arquitectura de Monorepo gestionada con **NPM Workspaces**, separando los servicios core y la interfaz de usuario en paquetes independientes.

## 🛠️ Stack Tecnológico

- **Arquitectura:** Monorepo (NPM Workspaces)
- **Backend (`apps/api-backend`):** NestJS, TypeScript, TypeORM.
- **Base de Datos:** PostgreSQL (alojada en Supabase).
- **Frontend (`apps/web-pacientes`):** App cliente para agendamiento de pacientes.
- **Automatización & Mensajería:** n8n (Webhooks, flujos de WhatsApp, Google Calendar API).

---

## 📁 Estructura del Proyecto
```text
turnosWebApp/
├── apps/
│   ├── api-backend/       # API REST principal (NestJS)
│   └── web-pacientes/     # Interfaz pública de reservas
├── packages/              # (Opcional) Código compartido (interfaces, utilidades)
├── package.json           # Configuración raíz de 
```

---

## ⚙️ Instalación y Gestión de Dependencias

La gestión de dependencias está centralizada en la raíz mediante NPM Workspaces (`hoisting`).

**Instalar todas las dependencias del proyecto:**
```bash
# Ejecutar en la RAÍZ del proyecto
npm install
```

**Instalar un paquete en un workspace específico:**
```bash
# Ejemplo: Instalar 'dayjs' solo en la API
npm install dayjs -w api-backend
```

---

## 🚀 Entorno de Desarrollo

**API Backend:**
```bash
cd apps/api-backend
npm run start:dev
```
El servidor escuchará en el puerto configurado (por defecto: `3000`).

**Frontend Pacientes:**
```bash
cd apps/web-pacientes
npm run dev
```

---

## 🗄️ Base de Datos y Migraciones (TypeORM)

El esquema de base de datos se maneja mediante migraciones de TypeORM conectadas a Supabase. Todos los comandos deben ejecutarse dentro del directorio de la API:
```bash
cd apps/api-backend
```

**Generar una migración a partir de cambios en las entidades:**
```bash
npm run migration:generate -- src/migrations/NombreDeLaMigracion
```

**Ejecutar migraciones pendientes:**
```bash
npm run migration:run
```

**Revertir la última migración:**
```bash
npm run migration:revert
```

---

## 🤖 Integración con n8n (Flujos de Automatización)

El sistema delega la capa de notificación y gestión interactiva a n8n. El backend se comunica con n8n mediante webhooks salientes y recibe comandos por endpoints específicos.

### Flujos principales

1. **Onboarding de Profesionales**
   - Alta en DB (status `PENDING`) → Webhook a n8n.
   - n8n solicita datos faltantes vía WhatsApp y aprovisiona cuenta de Google Calendar.
   - n8n actualiza la entidad `User` vía API.

2. **Reserva de Turnos (`Appointment`)**
   - Paciente agenda turno (virtual/presencial) → API genera el registro.
   - Webhook a n8n → generación de link de Meet (si aplica) → notificación de confirmación por WhatsApp al paciente (`patientPhone`).

3. **Gestión de Turnos (WhatsApp)**
   - Modificaciones o cancelaciones gestionadas por el paciente/doctor interactuando con el bot de n8n, el cual impacta la DB del backend.