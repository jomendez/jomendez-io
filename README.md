# Presentify - Panorama de la IA Generativa

Una presentación interactiva sobre inteligencia artificial generativa construida con React y Vite.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Construcción para Producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`.

### Vista Previa de Producción

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
presentify/
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # Página principal con lista de presentaciones
│   │   └── AIPanorama.jsx     # Presentación: Panorama de IA Generativa
│   ├── App.jsx                # Router principal
│   └── main.jsx               # Punto de entrada
├── index.html                 # HTML principal
├── package.json               # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
└── README.md                  # Este archivo
```

## ✨ Características

### 🎯 Navegación Mejorada
- **Secciones Full-Screen**: Cada sección ocupa toda la pantalla para mejor enfoque
- **Navegación con Teclado**: Usa ↑↓ o PageUp/PageDown para navegar
- **Botones de Navegación**: Flechas laterales con indicadores de progreso
- **Notas de Transición**: Enlaces verbales entre secciones para mejor flujo
- **Barra de Progreso**: Indicador visual del avance en la presentación

### 🎨 Modos de Visualización
- **Modo Básico/Avanzado**: Cambia entre vistas simplificadas y detalladas
- **Modo Comparación**: Compara múltiples proveedores de IA lado a lado
- **Modo Presentación**: Aumenta el tamaño de fuente para presentaciones
- **Secciones Colapsables**: Navega fácilmente por el contenido

### 🔧 Herramientas Interactivas
- **Tokenizador Interactivo**: Experimenta con cómo se tokeniza el texto
- **Comparador de Precios**: Calcula costos en tiempo real
- **Selección de Proveedores**: Compara características lado a lado

## 📚 Contenido de la Presentación

La presentación "Panorama de la IA Generativa" incluye las siguientes secciones:

1. **¿Qué es la Inteligencia Artificial?** - Introducción conceptual
2. **¿Cómo funciona la IA moderna?** - Pipeline de entrenamiento y uso
3. **Tipos de IA que ves hoy** - LLM, Generativa, Analítica, Agentes
4. **Alucinaciones en LLMs** - Limitaciones y cómo detectarlas
5. **Ecosistema de Proveedores** - ChatGPT, Claude, Gemini y más
6. **Formas de Consumir un LLM** - Chat UI vs API
7. **¿Cómo funcionan los Tokens?** - Tokenización y pricing
8. **Futuro cercano** - Tendencias y próximos desarrollos

### 🎮 Simulaciones Interactivas de IA
Cada sección incluye demos visuales e interactivas:

- **LLM (🗣️)**: Predicción de siguiente token
  - Muestra el prompt del usuario como contexto visual
  - Secuencia inicial hard-coded: "El cielo nocturno"
  - Click en "Generar" añade el token con mayor probabilidad
  - 6 tokens generables para completar la frase (contador visible)
  - Resultado final: "El cielo nocturno brilla con miles de estrellas brillantes"
  - Muestra 4 opciones con probabilidades hard-coded en cada paso
  - Propósito ilustrativo/educativo

- **Alucinaciones (⚠️)**: Demostración de alucinaciones en LLMs
  - 3 ejemplos interactivos de preguntas problemáticas
  - Muestra respuesta alucinada vs. realidad
  - Medidor de confianza del modelo (siempre alto, incluso al alucinar)
  - Explicación de por qué ocurre cada alucinación
  - Tips para detectar y mitigar alucinaciones

- **Formas de Consumo (🔌)**: Chat UI vs API
  - Comparación lado a lado de ambas formas
  - Modo Chat UI: Interfaz conversacional visual
  - Modo API: Request/Response con JSON
  - Mismo ejemplo ejecutado en ambos formatos
  - Tabla comparativa de casos de uso
  - Características, ventajas y cuándo usar cada uno
  
- **Generativa (🎨)**: Proceso de Difusión (Text-to-Image)
  - Visualización interactiva del proceso de difusión
  - 20 pasos que van de ruido puro → imagen clara
  - Grid visual de 48 celdas que muestra la evolución
  - Efectos de blur y transformación en tiempo real
  - Estados descriptivos en cada fase del proceso
  - Simula cómo trabajan modelos como DALL-E y Stable Diffusion
  
- **Analítica (🧮)**: Sistema de scoring de riesgo con inputs ajustables
  
- **Agentes (🤖)**: Visualización de flujo de tareas autónomas en cadena
  - Al completar, muestra reporte ejecutivo generado automáticamente
  - Panel de resultados con hallazgos, tendencias y recomendaciones

### 📱 Experiencia
- **Diseño Responsivo**: Funciona en diferentes tamaños de pantalla
- **Animaciones Suaves**: Transiciones fluidas entre secciones
- **Hints de Navegación**: Ayuda visual que aparece al inicio

## 🎮 Controles de Navegación

- **Teclado**: 
  - `↑` o `PageUp`: Sección anterior
  - `↓` o `PageDown`: Sección siguiente
- **Mouse**: 
  - Botones laterales con flechas
  - Puntos indicadores (click para saltar a sección)
- **Touch**: Compatible con gestos táctiles en móviles

## 🗺️ Rutas

- **`/`** - Página principal con lista de todas las presentaciones
- **`/ai-panorama`** - Presentación: Panorama de la IA Generativa

## 🛠️ Tecnologías

- **React 18**: Biblioteca de UI
- **React Router 6**: Navegación entre presentaciones
- **Vite**: Herramienta de construcción y desarrollo
- **CSS-in-JS**: Estilos inline con React
- **Firebase**: Autenticación y hosting (configurado para uso futuro)

## 🔥 Configuración de Firebase

Firebase está configurado en el proyecto para autenticación y hosting futuro.

### Configuración Inicial

1. **Crear un proyecto Firebase**:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente

2. **Obtener las credenciales**:
   - En la configuración del proyecto, ve a "Configuración del proyecto"
   - En "Tus aplicaciones", selecciona la app web o crea una nueva
   - Copia los valores de configuración

3. **Configurar variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables (reemplaza con tus valores):
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### Estructura de Firebase

- **`src/config/firebase.js`**: Configuración e inicialización de Firebase
- **`src/services/auth.js`**: Servicios de autenticación (sign up, sign in, sign out, etc.)

### Uso de Autenticación

Ejemplo de uso de los servicios de autenticación:

```jsx
import { signIn, signUp, signInWithGoogle, logOut, onAuthChange } from './services/auth'

// Sign up
await signUp('user@example.com', 'password', 'Display Name')

// Sign in
await signIn('user@example.com', 'password')

// Sign in with Google
await signInWithGoogle()

// Sign out
await logOut()

// Listen to auth state changes
onAuthChange((user) => {
  if (user) {
    console.log('User is signed in:', user)
  } else {
    console.log('User is signed out')
  }
})
```

### Firebase Hosting

Para desplegar en Firebase Hosting:

1. **Instalar Firebase CLI** (si no lo tienes):
   ```bash
   npm install -g firebase-tools
   ```

2. **Iniciar sesión**:
   ```bash
   firebase login
   ```

3. **Inicializar Firebase Hosting**:
   ```bash
   firebase init hosting
   ```
   - Selecciona tu proyecto Firebase
   - Establece `dist` como directorio público
   - Configura como SPA (Single Page Application)

4. **Desplegar**:
   ```bash
   npm run build
   firebase deploy
   ```

## ➕ Agregar Nuevas Presentaciones

1. **Crear el componente** en `src/pages/NombrePresentation.jsx`
2. **Agregar la ruta** en `src/App.jsx`:
   ```jsx
   <Route path="/nombre-presentacion" element={<NombrePresentation />} />
   ```
3. **Agregar al menú** en `src/pages/Home.jsx` en el array `presentations`:
   ```jsx
   {
     id: 'nombre-presentacion',
     title: 'Título de la Presentación',
     description: 'Descripción breve...',
     icon: '🎯',
     color: 'linear-gradient(135deg, #color1, #color2)',
     tags: ['Tag1', 'Tag2'],
     path: '/nombre-presentacion'
   }
   ```

## 📝 Notas

- El proyecto usa Vite como bundler para un desarrollo rápido
- React Router para navegación entre presentaciones
- Los estilos están definidos inline en los componentes para facilitar la portabilidad
- Las fuentes se cargan desde Google Fonts
- Estructura escalable para agregar múltiples presentaciones