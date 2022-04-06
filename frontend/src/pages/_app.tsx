import "../styles/globals.scss";

import { theme } from "@lib";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { BaseLayout } from "../components/layout/Base";

const client = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>TryOut - Fullstack</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={client}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={theme(colorScheme)}
          >
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
