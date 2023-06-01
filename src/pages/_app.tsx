import React from "react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import "antd/dist/reset.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps & { Component: any }) {
  const Layout = Component.Layout || React.Fragment;
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>CloudMix</title>
      </Head>
      <RecoilRoot>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ConfigProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
