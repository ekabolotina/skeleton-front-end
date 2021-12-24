import 'reflect-metadata';
import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { enableStaticRendering } from 'mobx-react';
import isServer from 'helper/common/isServer';
import { ThemeProvider } from 'presentation/context/Theme';
import Layout from 'presentation/component/layout';

enableStaticRendering(isServer());

const TITLE = 'Title';
const DESCRIPTION = 'Description';

function App(props: AppProps): ReactElement {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5"
                />
                <meta name="description" key="description" content={DESCRIPTION} />
                <title>{TITLE}</title>
            </Head>
            <ThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}

export default App;
