import '@/styles/globals.css';
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from '@/layout';
import { message } from 'antd';

type Props = AppProps<{ initialSession: Session }>;

const App = ({ Component, pageProps }: Props) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            onError: (error) =>
              error instanceof Error && message.error(error.message),
          },
          mutations: {
            onError: (error) =>
              error instanceof Error && message.error(error.message),
          },
        },
      })
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;
