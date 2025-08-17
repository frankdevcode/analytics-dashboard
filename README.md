# Analytics Dashboard

Un dashboard de analytics moderno construido con React y FastAPI que incluye visualizaciones interactivas, autenticación JWT y una API RESTful completa.

## 🚀 Características

- **Frontend React** con TailwindCSS para un diseño moderno y responsivo
- **Visualizaciones interactivas** con D3.js (gráficos de barras, líneas y pastel)
- **Autenticación JWT** segura
- **API RESTful** con FastAPI
- **Base de datos SQLite** con datos de ejemplo
- **Tabla de datos** con paginación, búsqueda y ordenamiento
- **Sistema de reportes** con exportación a CSV
- **Navegación** con React Router

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- Python (versión 3.8 o superior)
- npm o yarn
- pip

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd analytics-dashboard
```

### 2. Configurar el Backend (FastAPI)

```bash
cd backend

# Instalar dependencias de Python
pip install -r requirements.txt

# Iniciar el servidor de desarrollo
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en: `http://localhost:8000`

### 3. Configurar el Frontend (React)

En una nueva terminal:

```bash
cd frontend

# Instalar dependencias de Node.js
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🔑 Credenciales de Prueba

Para acceder al dashboard, utiliza las siguientes credenciales:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

## 📁 Estructura del Proyecto

```
analytics-dashboard/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py          # Endpoints de autenticación
│   │   │   └── data.py          # Endpoints de datos
│   │   ├── core/
│   │   │   └── security.py      # Configuración JWT y seguridad
│   │   ├── database/
│   │   │   └── database.py      # Configuración de base de datos
│   │   ├── models/
│   │   │   └── models.py        # Modelos SQLAlchemy
│   │   ├── schemas/
│   │   │   └── schemas.py       # Esquemas Pydantic
│   │   ├── services/
│   │   │   ├── auth_service.py  # Lógica de autenticación
│   │   │   └── data_service.py  # Lógica de datos
│   │   └── main.py              # Aplicación principal FastAPI
│   └── requirements.txt         # Dependencias Python
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── charts/
    │   │   │   ├── BarChart.jsx   # Gráfico de barras D3.js
    │   │   │   ├── LineChart.jsx  # Gráfico de líneas D3.js
    │   │   │   └── PieChart.jsx   # Gráfico de pastel D3.js
    │   │   ├── DataTable.jsx      # Tabla con paginación
    │   │   ├── Layout.jsx         # Layout principal
    │   │   └── StatsCard.jsx      # Tarjetas de estadísticas
    │   ├── pages/
    │   │   ├── Dashboard.jsx      # Página principal del dashboard
    │   │   ├── Login.jsx          # Página de login
    │   │   └── Reports.jsx        # Página de reportes
    │   ├── services/
    │   │   └── api.js              # Cliente API con axios
    │   └── App.jsx                 # Componente principal con routing
    ├── package.json                # Dependencias Node.js
    └── tailwind.config.js         # Configuración TailwindCSS
```

## 🔧 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/me` - Obtener usuario actual
- `POST /auth/logout` - Cerrar sesión

### Datos
- `GET /data/dashboard` - Obtener todos los datos del dashboard
- `GET /data/reports` - Obtener datos de reportes
- `GET /data/sales` - Obtener datos de ventas
- `GET /data/users` - Obtener datos de usuarios
- `GET /data/categories` - Obtener datos de categorías

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TailwindCSS** - Framework de CSS utilitario
- **D3.js** - Visualizaciones de datos
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Vite** - Herramienta de construcción

### Backend
- **FastAPI** - Framework web moderno para Python
- **SQLAlchemy** - ORM para Python
- **SQLite** - Base de datos
- **JWT** - Autenticación con tokens
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

## 📊 Funcionalidades del Dashboard

1. **Autenticación segura** con JWT
2. **Visualizaciones interactivas:**
   - Gráfico de barras para datos de ventas
   - Gráfico de líneas para crecimiento de usuarios
   - Gráfico de pastel para distribución de categorías
3. **Tabla de datos** con:
   - Paginación
   - Búsqueda en tiempo real
   - Ordenamiento por columnas
4. **Sistema de reportes** con exportación a CSV
5. **Diseño responsivo** que funciona en desktop y móvil
6. **Navegación intuitiva** entre secciones

## 🚀 Despliegue

Para desplegar en producción:

1. **Backend:** Configurar variables de entorno para la clave secreta JWT
2. **Frontend:** Ejecutar `npm run build` y servir los archivos estáticos
3. **Base de datos:** Migrar a PostgreSQL o MySQL para producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Tu Nombre - tu.email@ejemplo.com

Link del Proyecto: [https://github.com/tu-usuario/analytics-dashboard](https://github.com/tu-usuario/analytics-dashboard)