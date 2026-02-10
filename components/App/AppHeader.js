import Link from "next/link";
import Logout from "@/utils/logout";
import { parseCookies } from "nookies";
import CreateName from "@/utils/createName";
import { Condition } from "@/utils/condition/Condition";
import { useEffect, useState } from "react";

export default function AppHeader() {
	const { firstName, middleName, lastName } = parseCookies();
	const [isClient, setIsClient] = useState(false);

	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreenToggle = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().then(() => setIsFullScreen(true));
		} else {
			document.exitFullscreen().then(() => setIsFullScreen(false));
		}
	};

	useEffect(() => {
		const handleFullScreenChange = () => {
			setIsFullScreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullScreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullScreenChange);
		};
	}, []);

	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		<div>
			<nav className="navbar border-0 p-1" style={{ backgroundColor: "#2B333E" }}>
				<div className="container-lg-fluid w-100 text-white">
					<div className="row">
						<div className="col d-none d-lg-flex">
							<span className="navbar-brand mb-0 ms-1 h2 text-white">
								P.I.E.T (Phulwari)
							</span>
						</div>
						<div className="col d-flex align-items-center justify-content-end me-1">
							<span className="me-2" style={{ fontSize: "13px", cursor: "pointer" }} data-bs-toggle="dropdown">
								<Condition>
									<Condition.When isTrue={isClient}>
										<span>{CreateName({ firstName, middleName, lastName })}</span>
									</Condition.When>
								</Condition>
							</span>
							{/* view dropdown */}
							<div className="dropdown dropstart me-1" id="myDropdown">
								<i className="bi bi-chevron-down" style={{ cursor: "pointer" }} type="icon" data-bs-toggle="dropdown" aria-expanded="false" ></i>
								<ul className="dropdown-menu mt-5">
									<li>
										<Link className="dropdown-item small user-select-none" href="/app/profile">
											<i className="bi bi-person-fill me-2"></i>
											<span>My Profile</span>
										</Link>
									</li>
									<li>
										<Link className="dropdown-item small user-select-none" href="/app/profile">
											<i className="bi bi-key-fill me-2"></i>
											<span>Change Password</span>
										</Link>
									</li>
									<li onClick={Logout}>
										<span className="dropdown-item small user-select-none" style={{ cursor: "pointer" }}>
											<i className="bi bi-box-arrow-right text-danger me-2"></i>
											<span>Sign Out</span>
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<nav className="navbar bg-white py-0 px-3 px-lg-0 border-bottom" style={{ height: 40 }}>
				<div className="row g-0 w-100">
					<div className="col d-flex d-lg-none align-items-center">
						<Link className="text-decoration-none text-dark app-sidebar-toggle" href="#AppMobileSidebar" data-bs-toggle="offcanvas" role="button" aria-controls="AppMobileSidebar">
							<i className="ti ti-menu-2"></i>
						</Link>
					</div>
					<div className="col d-flex align-items-center justify-content-end">
						<Link className="text-decoration-none text-dark me-3" href="/app">
							<i className="ti ti-home"></i>
						</Link>
						<Link className="text-decoration-none text-dark me-3" href="/app/profile">
							<i className="ti ti-settings"></i>
						</Link>
						<span className="text-decoration-none text-dark me-lg-3" onClick={handleFullScreenToggle} style={{ cursor: "pointer" }}>
							<i className={`ti ti-${isFullScreen ? "arrows-minimize" : "arrows-maximize"}`}></i>
						</span>
					</div>
				</div>
			</nav>
		</div>
	)
}