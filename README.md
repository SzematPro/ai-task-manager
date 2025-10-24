# AI Task Manager

<div align="center">
  <h3>Transforma tus pensamientos en tareas organizadas con Inteligencia Artificial</h3>
  <p>Una aplicación moderna de gestión de tareas potenciada por IA que procesa lenguaje natural en múltiples idiomas</p>
</div>

## 🚀 Características Principales

> Esta aplicación utiliza **GPT-4** para transformar pensamientos naturales en tareas estructuradas con **25+ campos de análisis**, incluyendo contexto emocional, herramientas necesarias, criterios de éxito y posibles bloqueadores. Todo esto con **seguridad de nivel empresarial** mediante Row Level Security (RLS) y autenticación OAuth.

### 🤖 **Procesamiento de IA Avanzado**
- **Análisis Inteligente**: Utiliza GPT-4 para extraer información estructurada de texto natural
- **Múltiples Idiomas**: Detecta automáticamente el idioma y traduce al inglés para procesamiento
- **Análisis Contextual**: Identifica prioridad, urgencia, complejidad y contexto emocional
- **Sugerencias Inteligentes**: Genera acciones sugeridas, criterios de éxito y posibles bloqueadores
- **Sistema de Fallback**: Análisis básico automático si OpenAI no está disponible
- **Validación de Fechas**: Corrección inteligente de fechas inválidas o pasadas
- **Prompt Engineering Avanzado**: Implementa 10+ técnicas modernas de prompt engineering

### 🌍 **Soporte Multilingüe**
- **Detección Automática**: Reconoce 6 idiomas principales: español, inglés, francés, alemán, italiano y portugués entre otros
- **Traducción Inteligente**: Convierte automáticamente el texto al inglés para procesamiento con GPT-4
- **Títulos Profesionales**: Genera títulos optimizados para almacenamiento en base de datos
- **Fallback Robusto**: Sistema de traducción de respaldo para frases comunes

### 🎯 **Gestión Inteligente de Tareas**
- **Análisis Completo**: Cada tarea incluye:
  - Título y descripción
  - Prioridad (baja, media, alta)
  - Urgencia e importancia (escala 1-10)
  - Complejidad (simple, moderada, compleja)
  - Fecha de vencimiento
  - Categoría y etiquetas
  - Duración estimada
  - Subtareas sugeridas
  - Contexto emocional y laboral
  - Herramientas necesarias
  - Criterios de éxito
  - Posibles bloqueadores

### 🎨 **Interfaz Moderna y Responsiva**
- **Diseño Adaptativo**: Optimizado para móviles, tablets y escritorio
- **Tema Oscuro/Claro**: Cambio automático basado en preferencias del sistema
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **UI/UX Optimizada**: Botones de acción separados para evitar errores accidentales

### 🔐 **Autenticación y Seguridad**
- **Google OAuth**: Inicio de sesión seguro con Google
- **Supabase Auth**: Autenticación robusta con Row Level Security (RLS)
- **Datos Privados**: Cada usuario solo puede ver y gestionar sus propias tareas
- **Políticas de Seguridad**: 4 políticas RLS que garantizan aislamiento total de datos
- **Manejo de Errores**: Gestión robusta de errores de autenticación y redirección
- **Modo Demo**: Funcionamiento sin autenticación para demostración

### 📊 **Monitoreo y Estado**
- **Estado de Servicios**: Monitoreo en tiempo real de Supabase, OpenAI y almacenamiento local
- **Indicadores Visuales**: Estado de conexión con colores y iconos intuitivos
- **Estado de Conexión**: Verificación automática del estado de los servicios backend

### 🎛️ **Funcionalidades Avanzadas**
- **Filtrado Inteligente**: Por estado, prioridad y categoría
- **Ordenamiento**: Por fecha de vencimiento, prioridad o fecha de creación
- **Búsqueda**: Búsqueda en tiempo real por título, categoría y etiquetas
- **Colapso/Expansión**: Análisis de IA expandible para cada tarea
- **Gestión de Estado**: Zustand para manejo eficiente del estado global

### 🚧 **Modo Demo con Límites**
- **Límite Configurable**: Número máximo de tareas por usuario
- **Modal Informativo**: Notificación elegante cuando se alcanza el límite
- **Contacto de Soporte**: Enlace directo para solicitar versión completa

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Next.js 14**: Framework React con App Router
- **React 18**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de estilos utilitarios
- **Framer Motion**: Animaciones y transiciones
- **Lucide React**: Iconografía moderna

### **Backend y Servicios**
- **Supabase**: Base de datos PostgreSQL y autenticación
- **OpenAI GPT-4**: Procesamiento de lenguaje natural
- **Zustand**: Gestión de estado global
- **Next.js API Routes**: Endpoints del servidor

### **Capacidades Técnicas Avanzadas**
- **Análisis de IA con 25+ campos**: title, priority, category, due_date, urgency, importance, complexity, tags, estimatedDuration, subtasks, context, suggestedActions, confidence, reasoning, timeSensitivity, emotionalContext, workContext, energyLevel, socialContext, locationContext, toolsNeeded, blockers, successCriteria
- **Detección de idioma con IA**: Utiliza GPT-3.5-turbo para detección inteligente de idiomas
- **Traducción con GPT-4**: Traducción contextual y profesional al inglés
- **Validación de fechas inteligente**: Corrección automática de fechas inválidas o pasadas
- **Sistema de fallback robusto**: Funcionamiento completo sin OpenAI
- **Seguridad RLS**: 4 políticas de Row Level Security para aislamiento total de datos

### **🧠 Técnicas Avanzadas de Prompt Engineering**
- **Structured Outputs**: Especificación JSON detallada para respuestas consistentes
- **Chain-of-Thought**: Razonamiento paso a paso para análisis complejos
- **Few-Shot Learning**: Ejemplos específicos para mejor comprensión
- **Context Injection**: Inyección dinámica de contexto temporal y de usuario
- **Role-Based Prompting**: Prompts especializados por dominio (análisis, traducción, redacción)
- **Constraint-Based Prompting**: Reglas específicas de negocio (cálculo de fechas, validaciones)
- **Multi-Step Processing**: Pipeline de 3 etapas (detección → traducción → análisis)
- **Temperature Optimization**: Temperaturas optimizadas por tarea (0.1-0.2 para consistencia)
- **Error Handling**: Sistemas de fallback robustos para máxima disponibilidad
- **Domain-Specific Prompting**: Prompts especializados para gestión de tareas y productividad

### **Herramientas de Desarrollo**
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Jest**: Testing framework
- **Docker**: Containerización

## 📦 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- API Key de OpenAI

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/ai-task-manager.git
cd ai-task-manager
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**
Crea un archivo `.env.local` basado en `env.example`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=tu_openai_api_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_nextauth_secret

# Task Limiting Configuration (Demo Mode)
NEXT_PUBLIC_ENABLE_TASK_LIMIT=false
NEXT_PUBLIC_MAX_TASKS_PER_USER=5
NEXT_PUBLIC_SUPPORT_EMAIL=support@tu-empresa.com
```

### **4. Configurar Supabase**
1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script SQL en `supabase/schema.sql`
3. Configura la autenticación con Google OAuth

### **5. Ejecutar en Desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🚀 Despliegue

### **Vercel (Recomendado)**
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### **🐳 Docker - Despliegue en Contenedor**

#### **Prerrequisitos para Docker**
- Docker 20.10+ instalado
- Docker Compose 2.0+ (para opción completa)
- Al menos 2GB de RAM disponible
- Puerto 3000 libre (o cambiar a otro puerto)

#### **Opción 1: Docker Simple (Solo Aplicación)**
```bash
# 1. Configurar variables de entorno
cp env.docker.example .env.docker
# Editar .env.docker con tus valores reales

# 2. Construir imagen
docker build -t ai-task-manager .

# 3. Ejecutar contenedor
docker run -d \
  --name ai-task-manager \
  -p 3000:3000 \
  --env-file .env.docker \
  --restart unless-stopped \
  ai-task-manager

# 4. Verificar funcionamiento
docker logs ai-task-manager
curl http://localhost:3000/api/health
```

#### **Opción 2: Docker Compose (Aplicación + Base de Datos)**
```bash
# 1. Configurar variables de entorno
cp env.docker.example .env.docker
# Editar .env.docker con tus valores reales

# 2. Iniciar todos los servicios
docker-compose up -d

# 3. Verificar estado de servicios
docker-compose ps
docker-compose logs app

# 4. Acceder a la aplicación
# Aplicación: http://localhost:3000
# Base de datos: localhost:5432
# Redis: localhost:6379
```

#### **Comandos de Gestión Docker**

**Detener servicios:**
```bash
# Docker simple
docker stop ai-task-manager

# Docker Compose
docker-compose down
```

**Reiniciar servicios:**
```bash
# Docker simple
docker restart ai-task-manager

# Docker Compose
docker-compose restart
```

**Ver logs:**
```bash
# Docker simple
docker logs -f ai-task-manager

# Docker Compose
docker-compose logs -f app
```

**Eliminar completamente:**
```bash
# Docker simple
docker stop ai-task-manager
docker rm ai-task-manager
docker rmi ai-task-manager

# Docker Compose
docker-compose down -v  # Elimina también volúmenes
docker-compose down --rmi all  # Elimina también imágenes
```

**Actualizar aplicación:**
```bash
# Docker simple
docker stop ai-task-manager
docker rm ai-task-manager
docker build -t ai-task-manager .
docker run -d --name ai-task-manager -p 3000:3000 --env-file .env.docker --restart unless-stopped ai-task-manager

# Docker Compose
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### **Servicios Opcionales (Docker Compose)**

**Habilitar monitoreo:**
```bash
docker-compose --profile monitoring up -d
# Grafana: http://localhost:3001
# Prometheus: http://localhost:9090
```

**Habilitar Nginx (producción):**
```bash
docker-compose --profile production up -d
# Aplicación: http://localhost (puerto 80)
```

#### **⚡ Comandos Rápidos de Gestión**

**Inicio rápido:**
```bash
# Construir y ejecutar en un comando
docker build -t ai-task-manager . && docker run -d --name ai-task-manager -p 3000:3000 --env-file .env.docker --restart unless-stopped ai-task-manager
```

**Verificación rápida:**
```bash
# Verificar estado
docker ps | grep ai-task-manager

# Ver logs en tiempo real
docker logs -f ai-task-manager

# Verificar salud
curl http://localhost:3000/api/health
```

**Limpieza rápida:**
```bash
# Parar y eliminar todo
docker stop ai-task-manager && docker rm ai-task-manager && docker rmi ai-task-manager

# Limpiar sistema Docker
docker system prune -a
```

**Backup rápido:**
```bash
# Exportar imagen
docker save ai-task-manager > ai-task-manager-backup.tar

# Importar imagen
docker load < ai-task-manager-backup.tar
```

#### **🔧 Troubleshooting Docker**

**Problema: Contenedor no inicia**
```bash
# Ver logs detallados
docker logs ai-task-manager

# Verificar variables de entorno
docker exec ai-task-manager env | grep -E "(SUPABASE|OPENAI|NEXTAUTH)"

# Verificar conectividad
docker exec ai-task-manager curl -f http://localhost:3000/api/health
```

**Problema: Variables de entorno no cargan**
```bash
# Verificar archivo .env.docker
cat .env.docker

# Recrear contenedor con variables
docker run -d --name ai-task-manager -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL="tu_url" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_key" \
  -e OPENAI_API_KEY="tu_key" \
  ai-task-manager
```

**Problema: Puerto 3000 ocupado**
```bash
# Usar puerto diferente
docker run -d --name ai-task-manager -p 3001:3000 ai-task-manager
# Acceder en http://localhost:3001
```

**Problema: Base de datos no conecta (Docker Compose)**
```bash
# Verificar estado de PostgreSQL
docker-compose logs postgres

# Reiniciar solo la base de datos
docker-compose restart postgres

# Verificar conectividad
docker-compose exec postgres pg_isready -U postgres
```

**Problema: Imagen no se construye**
```bash
# Limpiar cache de Docker
docker system prune -a

# Construir sin cache
docker build --no-cache -t ai-task-manager .

# Verificar Dockerfile
docker build --progress=plain -t ai-task-manager .
```

**Problema: Permisos en volúmenes**
```bash
# Arreglar permisos
sudo chown -R $USER:$USER ./logs
sudo chmod -R 755 ./logs
```

#### **✅ Verificación de Funcionamiento**

**Paso a paso para verificar que todo funciona:**

1. **Verificar que el contenedor está corriendo:**
```bash
docker ps | grep ai-task-manager
# Debe mostrar el contenedor en estado "Up"
```

2. **Verificar logs de la aplicación:**
```bash
docker logs ai-task-manager
# Debe mostrar "Ready - started server on 0.0.0.0:3000"
```

3. **Verificar endpoint de salud:**
```bash
curl http://localhost:3000/api/health
# Debe devolver: {"status":"ok","timestamp":"..."}
```

4. **Verificar que la aplicación carga:**
```bash
curl -I http://localhost:3000
# Debe devolver: HTTP/1.1 200 OK
```

5. **Verificar variables de entorno:**
```bash
docker exec ai-task-manager env | grep -E "(SUPABASE|OPENAI|NEXTAUTH)"
# Debe mostrar tus variables configuradas
```

6. **Acceder a la aplicación:**
- Abrir navegador en `http://localhost:3000`
- Debe cargar la página principal de AI Task Manager
- Debe mostrar el botón "Continue with Google"

**Si todo funciona correctamente, tienes una versión de producción completamente funcional en Docker! 🎉**

#### **📋 Checklist de Verificación Completa**

**✅ Configuración inicial:**
- [ ] Docker instalado y funcionando
- [ ] Archivo `.env.docker` configurado con valores reales
- [ ] Puerto 3000 disponible

**✅ Build exitoso:**
- [ ] `docker build -t ai-task-manager .` ejecuta sin errores
- [ ] Imagen se crea correctamente
- [ ] No hay warnings críticos en el build

**✅ Contenedor funcionando:**
- [ ] Contenedor inicia sin errores
- [ ] Logs muestran "Ready in XXms"
- [ ] Health check responde correctamente
- [ ] Aplicación accesible en navegador

**✅ Funcionalidades verificadas:**
- [ ] Página principal carga correctamente
- [ ] Botón "Continue with Google" visible
- [ ] API de salud responde
- [ ] Variables de entorno cargadas

**✅ Producción lista:**
- [ ] Contenedor configurado con `--restart unless-stopped`
- [ ] Health check funcionando
- [ ] Logs monitoreables
- [ ] Backup de datos configurado (si aplica)

## 📱 Uso de la Aplicación

### **1. Inicio de Sesión**
- Haz clic en "Continue with Google" para autenticarte
- La aplicación detectará automáticamente tu configuración

### **2. Crear Tareas**
- Escribe tu tarea en lenguaje natural (ej: "Preparar presentación para el cliente el viernes")
- La IA analizará automáticamente:
  - Prioridad y urgencia
  - Fecha de vencimiento
  - Categoría y etiquetas
  - Contexto emocional y laboral
  - Herramientas necesarias
  - Criterios de éxito

### **3. Gestionar Tareas**
- **Filtrar**: Por estado, prioridad o categoría
- **Ordenar**: Por fecha, prioridad o urgencia
- **Buscar**: En tiempo real por título o contenido
- **Expandir**: Ver análisis detallado de IA
- **Completar**: Marcar tareas como completadas
- **Eliminar**: Remover tareas no deseadas

### **4. Idiomas Soportados**
La aplicación procesa automáticamente texto en:
- **Español**: "Llamar a mamá este fin de semana"
- **English**: "Prepare quarterly report for board meeting"
- **Français**: "Préparer le rapport trimestriel"
- **Deutsch**: "Quartalsbericht für Vorstandssitzung vorbereiten"
- **Italiano**: "Preparare il rapporto trimestrale"
- **Português**: "Preparar relatório trimestral"

*Nota: La detección de idioma utiliza IA avanzada y puede reconocer otros idiomas, pero la traducción está optimizada para estos 6 idiomas principales.*

## 🔧 Configuración Avanzada

### **Límites de Tareas (Modo Demo)**
```bash
# Habilitar límites
NEXT_PUBLIC_ENABLE_TASK_LIMIT=true
NEXT_PUBLIC_MAX_TASKS_PER_USER=5
NEXT_PUBLIC_SUPPORT_EMAIL=support@tu-empresa.com
```

### **Personalización de IA**
- Modifica `lib/ai-enhanced.ts` para ajustar el análisis
- Configura `lib/language-detection.ts` para nuevos idiomas
- Ajusta prompts en `app/api/process-task/route.ts`

### **Técnicas de Prompt Engineering Implementadas**
- **Structured Outputs**: JSON schema detallado en `lib/ai-enhanced.ts` líneas 60-84
- **Chain-of-Thought**: Razonamiento estructurado en líneas 86-94
- **Few-Shot Learning**: Ejemplos específicos en `lib/language-detection.ts` líneas 404-408
- **Context Injection**: Contexto temporal dinámico en líneas 52-58
- **Role-Based Prompting**: Prompts especializados por dominio
- **Temperature Optimization**: 0.1-0.2 para consistencia máxima
- **Multi-Step Processing**: Pipeline de 3 etapas especializadas
- **Error Handling**: Sistemas de fallback robustos
- **Domain-Specific**: Prompts optimizados para gestión de tareas
- **Constraint-Based**: Reglas de negocio específicas (fechas, validaciones)

### **Temas y Estilos**
- Personaliza colores en `tailwind.config.js`
- Modifica estilos móviles en `app/mobile-styles.css`
- Ajusta animaciones en `components/theme-toggle.tsx`

## 📊 Estructura del Proyecto

```
ai-task-manager/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── health/       # Health check endpoint
│   │   └── process-task/ # AI task processing
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── mobile-styles.css  # Mobile-specific styles
│   └── page.tsx          # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── providers.tsx     # Context providers
│   ├── task-limit-modal.tsx # Demo limit modal
│   └── theme-toggle.tsx  # Theme switching
├── hooks/                # Custom React hooks
│   ├── use-backend-status.ts # Service monitoring
│   └── use-task-store.ts # Task state management
├── lib/                  # Utility libraries
│   ├── ai-enhanced.ts    # AI processing logic
│   ├── language-detection.ts # Multilingual support
│   ├── openai.ts         # OpenAI client
│   ├── supabase.ts       # Supabase client
│   ├── theme-provider.tsx # Theme management
│   └── utils.ts          # Utility functions
├── public/               # Static assets
│   ├── favicon files     # App icons
│   └── site.webmanifest  # PWA manifest
├── supabase/             # Database schema
│   └── schema.sql        # PostgreSQL schema
├── types/                # TypeScript definitions
│   └── task.ts           # Task type definitions
└── Configuration files   # Project configuration
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests con cobertura
npm run test:coverage

# Tests en modo watch
npm run test:watch

# Verificación de tipos
npm run type-check
```

## 📈 Rendimiento

### **Optimizaciones Implementadas**
- **Lazy Loading**: Componentes cargados bajo demanda
- **Memoización**: Optimización de re-renders
- **Caching**: Cache inteligente para respuestas de IA
- **Bundle Splitting**: Código dividido por rutas
- **Image Optimization**: Optimización automática de imágenes
- **Fallback Systems**: Sistemas de respaldo para IA y traducción
- **Error Boundaries**: Manejo robusto de errores de IA

### **Métricas de Build**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    98.6 kB         193 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ○ /api/health                          0 B                0 B
├ ƒ /api/process-task                    0 B                0 B
├ ○ /auth/auth-code-error                1.65 kB          96 kB
└ ƒ /auth/callback                       0 B                0 B
```

## 🤝 Contribución

### **Cómo Contribuir**
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### **Guías de Contribución**
- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Asegúrate de que todos los tests pasen

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🙏 Agradecimientos

- **OpenAI** por GPT-4 y las capacidades de procesamiento de lenguaje natural
- **Supabase** por la infraestructura de base de datos y autenticación
- **Vercel** por la plataforma de despliegue
- **Next.js Team** por el framework React
- **Tailwind CSS** por el sistema de diseño
- **Framer Motion** por las animaciones fluidas

## 📞 Soporte

- **Email**: waldemar@szemat.pro
- **Issues**: [GitHub Issues](https://github.com/SzematPro/ai-task-manager/issues)

---

<div align="center">
  <p>Hecho con ❤️</p>
  <p>⭐ Si te gusta este proyecto, ¡dale una estrella!</p>
</div>