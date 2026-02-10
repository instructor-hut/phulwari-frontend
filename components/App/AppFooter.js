import Link from "next/link";

export default function AppFooter() {
    return (
        <div className="bg-white border-top py-2 px-3 px-md-4 px-lg-5 fixed-bottom dashboard-footer print-remove" style={{ height: 40 }}>
            <div className="row">
                <div className="col d-none d-md-block">
                    <span className="text-body" style={{ fontSize: 13 }}>Version: 1.0.0</span>
                </div>
                <div className="col text-center text-md-end">
                    <Link target="_blank" className="text-decoration-none text-body" style={{ fontSize: 13 }} href="https://piet.co.in">
                        Developed by P.I.E.T
                    </Link>
                </div>
            </div>
        </div>
    )
}