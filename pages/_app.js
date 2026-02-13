import Response from "@/utils/response";
import { Fragment } from "react";
import SEO from "@/meta/seo";

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<SEO />
			<Component {...pageProps} />
			<Response></Response>
		</Fragment>
	)
}