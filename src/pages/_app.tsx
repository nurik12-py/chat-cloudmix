import "antd/dist/reset.css";
import "@/styles/globals.css";

import App from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

class MyApp extends App {
  queryClient = new QueryClient();

  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || React.Fragment;

    return (
      <>
        <Head>
          <title>CloudMix</title>
        </Head>
        <RecoilRoot>
          <ConfigProvider>
            <QueryClientProvider client={this.queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </ConfigProvider>
        </RecoilRoot>
      </>
    );
  }
}

export default MyApp;
