import Response from "@/utils/response";
import { Fragment } from "react";

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<Component {...pageProps} />
			<Response></Response>
		</Fragment>
	)
}