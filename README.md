# Cocos Capital — React Native Challenge

App React Native creada con Expo para el Cocos Capital challenge. Permite buscar instrumentos financieros, ver el portafolio de inversiones y simular órdenes de compra y venta de instrumentos.

---

## Prerequisitos

| Tool | Version | Notes |
|---|---|---|
| Node.js | 18+ | Required by Expo SDK 55 |
| npm | 10+ | Lockfile is `package-lock.json` |
| Xcode | 16+ | iOS builds only |
| CocoaPods | latest | iOS native deps — `brew install cocoapods` |
| Android Studio | latest | Android builds only |

---

## Setup y correr la app

<details open>
  <summary>Mostrar/Ocultar: Setup</summary>

```bash
# initial setup
git clone <repo-url> && cd rn-cc-challenge
npm install

# fill in EXPO_PUBLIC_API_URL
cp .env.example .env          

# generates ios/ and android/ native folders
npx expo prebuild             

# iOS Simulator (macOS only)
npm run ios

# Android Emulator
npm run android

# Web browser (no prebuild needed)
npm run web

# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch
```

### Variables de entorno

```env
EXPO_PUBLIC_API_URL=https://dummy-api-topaz.vercel.app # required — the challenge API base URL
EXPO_PUBLIC_SENTRY_DSN= # optional — leave blank to disable error monitoring
```
---

### Build de la app

**Android APK:**
- [Download APK - TBD](https://expo.dev/accounts/ezeed/projects/rn-cc-challenge/builds/2781748c-4c58-4879-9260-c1cd845df432)

Crear un nuevo build:

```bash
# Install EAS CLI 
npm install -g eas-cli

# Login to Expo
eas login

# Build Android APK for internal distribution
eas build --platform android --profile preview

# Build iOS
eas build --platform ios --profile preview
```
</details>

## Estructura de carpetas

<details open>
  <summary>Mostrar/Ocultar: Estructura de carpetas</summary>

### Navegación

Expo Router, ruteo basado en carpetas:

```
app/
  _layout.tsx
  (tabs)/
    _layout.tsx
    index.tsx      # Home screen - Instruments list
    portfolio.tsx 
    settings.tsx   
  (modals)/
    order.tsx      # Buy/Sell order modal
```

### Estructura por Feature 

Cada feature tiene mapeada su carpeta que corresponde con la pantalla. Dentro de la carpeta están los recursos del feature: hooks, components, types, etc. El index exporta todos los recursos para facilitar el import.

```
features/
  instruments/ 
  orders/
  portfolio/
  settings/ 
```

### Estructuras compartidas

```
lib/
  # funciones helper cross
  api/        # Instancia client de Axios
  errors/     # Custom errors y mapeo de mensajes de error
  query/      # Configuración de TanStack Query
  monitoring/ # Wrapper para monitoreo, se usa Sentry
  theme/      # Contexto del theme provider y definición de color tokens

components/
  # componentes genéricos cross
  ui/ # Implementación de componentes primitivos UI
```
</details>

---

## Decisiones técnicas

<details open>
  <summary>Mostrar/Ocultar: Decisiones técnicas</summary>

### Stack Principal

| Tech | Motivo |
|---|---|
| Expo SDK 55 | Integración con entorno de desarrollo cómodo y fácil distribución |
| Expo Router v4 | Ruteo basado en carpetas claro y simple |
| TanStack Query v5 | Integración de estados para los requests, fácil refetch y manejo de cache |
| Axios | Interceptor para manejo de errores y fácil integración con TanStack (versión estable) |
| Sentry | Estándar de industria, fácil integración con Expo, opcional |
| Jest + Testing Library | Buenas utilidades para integrar tests como `renderHook` |

> Otras dependencias usadas para mejorar experiencia y features
> - @expo/vector-icons              # integración con varias libs de iconos 
> - @react-native-async-storage     # manejo de storage para el theme 
> - expo-haptics                    # feedback on tap de principales acciones

### Estrategia de manejo de errores

Todos los HTTP errors están normalizados en `AppError` en el Axios response interceptor (`lib/api/api-client.ts`). Los errores tienen mapeados mensajes custom y son enviados a Sentry para monitoreo a través de los handlers globales de `QueryCache` y `MutationCache`. Los mensajes de error son expuestos a la UI con `getErrorMessage()`.
Los errores de crash de la app son manejados por `ErrorBoundary` y también emitidos a Sentry para monitoreo.

### Features y conclusiones

- **Local asset logos** — Las imágenes fueron generadas a partir del CDN de Cocos para los tickers en web. Se generó un script que solo se corrió una vez al momento de generar el proyecto y no es parte de ningún pipeline. Está a modo de ejemplo en `scripts/download-logos.mjs`. El formato fue convertido a `.webp` por performance.
- **Tab bar** — Teniendo la última versión de Expo SDK, opté por usar `NativeTabs` que cuenta con algunos features destacados como glass effect e integración de iconos con `sf` y `md` para integración con iOS y Android.
- **Settings Screen Theme** — Se agregó una pantalla de configuración para seleccionar la opción de theme: sistema, light o dark mode. Recuerda la opción seleccionada guardada en local storage.
- **Settings Screen Error Tester** — Con motivo de facilitar el trigger de errores y probar el error boundary y mensajes de error HTTP, agregué una sección para generarlos y visualizar el comportamiento. No es un feature para producción, solo un facilitador de testeo.
- **Web** — El formato web es soportado pero no está enteramente adaptado para ese escenario.
- **Features** - 
  - Listar instrumentos y mostrar su información. Buscar por ticker y ordernar segun precio, rendimiento y nombre.
  - Listar portafolio y mostrar su información. Buscar por ticker
  - Comprar y vender órdenes según criterio teniendo en cuenta el tipo de operación, cantidad y monto.
</details>