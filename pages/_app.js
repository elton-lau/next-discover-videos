import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useRef, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools /> */}
      </Hydrate>
    </QueryClientProvider>

  )

}

export default MyApp
