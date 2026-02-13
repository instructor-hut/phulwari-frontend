import Head from "next/head";
import { useRouter } from "next/router";

export default function SEO({ title = "" }) {
    const AppName = "Phulwari Piet";
    const Author = "PIET Schools"
    const Developer = "Gourav Nagpal";
    const webAddress = process.env.NEXT_PUBLIC_APP;
    const FullTitle = title ? `${title} - ${AppName}` : AppName;
    const router = useRouter();
    const uri = webAddress + router.pathname;
    const icon = `${process.env.NEXT_PUBLIC_APP}/favicon.svg`;
    return (
        <Head>
            <title>{FullTitle}</title>

            {/* Basic Information */}
            <meta charSet="UTF-8" />
            <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
            <meta httpEquiv="content-language" content="en" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta name="msapplication-config" content="none" />

            {/* Favicon Icons */}
            <link rel="apple-touch-icon" href={icon} />
            <link rel="apple-touch-icon-precomposed apple-touch-icon" href={icon} />
            <link rel="icon" href={icon} type="image/x-icon" />

            {/* Basic Meta Tags */}
            <meta name="title" content={FullTitle} />
            <meta name="owner" content={AppName} />
            <meta name="author" content={Author} />
            <meta name="generator" content={Developer} />

            {/* !-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={uri} />
            <meta property="og:title" content={AppName} />
            <meta property="og:description" content="" />
            <meta property="og:site_name" content={AppName} />
            <meta property="og:image" content="https://pub-2286be779c3642049b13f4c53d776380.r2.dev/assets/home-page-banner-1.jpg" />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={uri} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content="" />
            <meta property="twitter:image" content="https://pub-2286be779c3642049b13f4c53d776380.r2.dev/assets/home-page-banner-1.jpg" />

            {/* Canonical URL */}
            <link rel="canonical" href={uri} />
        </Head>
    )
}