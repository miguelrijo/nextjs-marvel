import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import PageLayout from './layouts/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <PageLayout><Component {...pageProps} /> </PageLayout>
}

export default MyApp
