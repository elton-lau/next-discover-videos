import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useRef, useState, useEffect } from 'react'
import { NhostNextProvider, NhostClient, isAuthenticatedAsync } from '@nhost/nextjs';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
    region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
  });

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false
      },
    },
  }))

  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          {/* <ReactQueryDevtools /> */}
        </Hydrate>
      </QueryClientProvider>
    </NhostNextProvider>

  )

}

export default MyApp
