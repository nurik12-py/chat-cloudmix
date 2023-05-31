import "antd/dist/reset.css";
import "@/styles/globals.css";

import App from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || React.Fragment;
    const queryClient = new QueryClient({});

    return (
      <RecoilRoot>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ConfigProvider>
      </RecoilRoot>
    );
  }
}

export default MyApp;
