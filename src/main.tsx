import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './styles.css'

// Fix GitHub Pages SPA routing
const params = new URLSearchParams(window.location.search)
const path = params.get('path')
if (path) {
  window.history.replaceState(null, '', '/BarEstilo' + path)
}

const queryClient = new QueryClient()
const router = createRouter({
  routeTree,
  context: { queryClient },
  basepath: '/BarEstilo',
})

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)