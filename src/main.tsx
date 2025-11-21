import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

import { Home } from './routes/home.tsx'
import Reentrega from './modules/devolucao/components/reentrega.tsx'
import ProcessoDevolucao from './routes/processoDevolucao.tsx'
import Devolucao from './routes/listaDevolucao.tsx'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// --- NOVA ROTA ABOUT ---
const devolucaoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/devolucao/demandas',
  component: Devolucao,
})

// ------------------------
const reentregaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/devolucao/reentrega',
  component: Reentrega,
})

const processoDevolucaoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/devolucao/$id',
  component: ProcessoDevolucao,
})


const routeTree = rootRoute.addChildren([
  indexRoute,
  devolucaoRoute,
  reentregaRoute,
  processoDevolucaoRoute,
])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})



declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

reportWebVitals()
