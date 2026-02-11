import Logout from "@/utils/logout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AppSidebar() {
    return (
        <div className="sidebar-body" style={{ minHeight: "100vh", maxHeight: "100vh ", overflowY: "scroll", scrollbarWidth: "none", paddingBottom: "25vh" }}>
            <ul className="nav flex-column">
                <Tab
                    path="/app"
                    title="Dashboard"
                    icon="dashboard"
                />
                <Tab
                    path="/app/registrations"
                    title="Registrations"
                    icon="file-description"
                />
                <Tab
                    path="/logout"
                    title="Logout"
                    icon="logout"
                    onClick={Logout}
                />
            </ul>
        </div>
    )
}

const DropdownTab = (props) => {
    const [active, setActive] = useState(true);
    return (
        <li className={`nav-item ${active ? "active-list" : ""}`} onClick={() => setActive(!active)}>
            <Link href={`#${props.src}`} className={`nav-link position-relative nav-heading`} data-bs-toggle="collapse" aria-expanded={active} aria-controls={props.src}>
                <i className={`ti ti-${props.icon}`}></i>
                <span className="ms-2">{props.title}</span>
                <span className="position-absolute end-0 me-4">
                    <i className={`ti ti-chevron-${active ? "down fw-bolder" : "right"}`} style={{ fontSize: 12 }}></i>
                </span>
            </Link>
            <div className={`collapse ${active ? "show" : ""}`} id={props.src}>
                <ul className="list-unstyled">
                    {
                        props.submenus.map((menu, index) => (
                            <li className="nav-item" key={index}>
                                <Link href={menu.path} className="nav-link bg-hover-orange active" style={{ paddingLeft: 40 }}>
                                    <span className="ms-1">{menu.title}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </li>
    )
}

function Tab(props) {
    const router = useRouter();

    function stripDynamicSegments(url) {
        let strippedUrl = url.replace(/\[.*?\]/g, '');
        strippedUrl = strippedUrl.replace(/\/$/, '');
        return strippedUrl
    }

    return (
        <li className="nav-item mb-3 mb-lg-2" onClick={props.onClick}>
            <Link className={`${props.className} nav-link position-relative ${stripDynamicSegments(router.pathname) === props.path ? "active-tab" : ""}`} href={props.path}>
                <i className={`ti ti-${props.icon}`}></i>
                <span className="ms-2">{props.title}</span>
                {props.badge ? <span className="badge bg-primary rounded-pill position-absolute end-0 me-4" style={{ marginTop: "0.1rem" }}>{props.badge}</span> : ""}
            </Link>
        </li>
    )
}