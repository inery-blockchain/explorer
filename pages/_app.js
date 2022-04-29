import { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import MenuContextProvider from '../context/MenuContextProvider'
import EndpointContextProvider from '../context/EndpointContextProvider'
import styles from '../styles/app.css'

export default function App({ Component, pageProps }) {

  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <meta name="description" content="Next generation INERY Blockchain explorer built in Next.js with cutting-edge precision and performance." />
        <meta property="og:image" content="/img/sign-blue-cyan.png" />
        <meta property="og:description" content="Next generation INERY Blockchain explorer built in Next.js with cutting-edge precision and performance." />
        <meta property="og:title" content="Inery Blockchain Explorer" />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <EndpointContextProvider>
        <MenuContextProvider>
          <Component {...pageProps} />
        </MenuContextProvider>
      </EndpointContextProvider>
    </Fragment>
  )
}