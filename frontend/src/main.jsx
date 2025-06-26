import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{
  QueryClient,
  QueryClientProvider
}from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialsOpen={false}/>
    <App />
    </QueryClientProvider>
  </StrictMode>
  </Provider>
)
