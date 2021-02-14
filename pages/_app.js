import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { persistWithLocalStorage } from 'react-query/persist-localstorage-experimental'
import { FilterContextProvider } from '@/lib/FilterContext'
import '@/styles/tailwind.css'
import { LocalStorageContextProvider } from '@/lib/LocalStorageContext'

const queryClient = new QueryClient()
persistWithLocalStorage(queryClient)

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalStorageContextProvider>
        <FilterContextProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </FilterContextProvider>
      </LocalStorageContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
