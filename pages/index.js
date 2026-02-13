// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
// 	return (
// 		// <div style={{ position: "relative" }}>
// 		// 	<Image
// 		// 		alt="home-page-banner"
// 		// 		width={500}
// 		// 		height={500}
// 		// 		className="vw-100 vh-100"
// 		// 		style={{ filter: "brightness(75%)" }}
// 		// 		src="/assets/img/home-page-banner-1.jpg"
// 		// 	/>

// 		// 	<Link
// 		// 		style={{
// 		// 			position: "absolute",
// 		// 			top: "84%",
// 		// 			left: "50%",
// 		// 			transform: "translate(-50%, -50%)",
// 		// 			padding: "12px 24px",
// 		// 			backgroundColor: "#ff4d4f",
// 		// 			color: "#fff",
// 		// 			border: "none",
// 		// 			borderRadius: "8px",
// 		// 			cursor: "pointer",
// 		// 			textDecoration: "none"
// 		// 		}}
// 		// 		href="/registration"
// 		// 	>
// 		// 		Register Now !!!
// 		// 	</Link>
// 		// </div>
// 	);
// }

export async function getServerSideProps() {
	return {
		redirect: {
			destination: "/registration",
			permanent: false,
		},
	};
}

export default function Home() {
	return null;
}