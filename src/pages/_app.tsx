import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import Head from "next/head"

const siteTitle = "Noexes Code Builder"
const siteDescription = "Build cheat codes from your Noexes pointer!"
const siteURL = "https://noexes.p1at.dev"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteURL} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={`${siteURL}/ogp.png`} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@p1atdev" />
                <meta name="twitter:creator" content="@p1atdev" />
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
