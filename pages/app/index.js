import AppLayout from "@/layouts/AppLayout";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function AppHome() {
    const { token } = parseCookies();

    const [dashboardValues, setDashboardValues] = useState({
        allMembers: 0,
        checkedIn: 0,
        notCheckedIn: 0,
        students: 0,
        guests: 0
    });

    useEffect(() => {
        async function FetchDashboardValues() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/phulwari/dashboard`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const status = await response.json();

                console.log(status?.data)

                if (status?.success) {
                    setDashboardValues({
                        allMembers: status?.data?.allMembers || 0,
                        checkedIn: status?.data?.checkedIn || 0,
                        notCheckedIn: status?.data?.notCheckedIn || 0,
                        students: status?.data?.students || 0,
                        guests: status?.data?.guests || 0,
                    });
                }

            } catch (error) {
                ToastFunction("error", error?.message);
            }
        }

        if (token) FetchDashboardValues();
    }, [token]);
    return (
        <AppLayout>
            <nav>
                <div className="border-bottom p-1 d-flex align-items-center" style={{ backgroundColor: "rgb(246 246 246)", padding: "0px", minHeight: "36px" }}>
                    <div className="row d-flex justify-content-between">
                        <div className="col page-heading">
                            <span style={{ fontWeight: "500" }}>Dashboard</span>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="p-4" style={{ backgroundColor: "#f6f6f6", minHeight: "calc(100% - 38px)" }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="me-3 rounded-3 p-4 shadow-sm" style={{ width: 200, height: 130, backgroundColor: "rgb(183 231 243)" }}>
                        <p className="mb-2 text-black small">All Members</p>
                        <p className="mb-0 text-black h1">{dashboardValues?.allMembers}</p>
                    </div>
                    <div className="me-3 rounded-3 p-4 shadow-sm" style={{ width: 200, height: 130, backgroundColor: "rgb(166 245 216)" }}>
                        <p className="mb-2 text-black small">Checked In</p>
                        <p className="mb-0 text-black h1">{dashboardValues?.checkedIn}</p>
                    </div>
                    <div className="me-3 rounded-3 p-4 shadow-sm" style={{ width: 200, height: 130, backgroundColor: "rgb(233 237 152)" }}>
                        <p className="mb-2 text-black small">Not Checked In</p>
                        <p className="mb-0 text-black h1">{dashboardValues?.notCheckedIn}</p>
                    </div>
                    <div className="me-3 rounded-3 p-4 shadow-sm" style={{ width: 200, height: 130, backgroundColor: "rgb(250 173 165)" }}>
                        <p className="mb-2 text-black small">Students</p>
                        <p className="mb-0 text-black h1">{dashboardValues?.students}</p>
                    </div>
                    <div className="rounded-3 p-4 shadow-sm" style={{ width: 200, height: 130, backgroundColor: "rgb(213 188 254)" }}>
                        <p className="mb-2 text-black small">Guest</p>
                        <p className="mb-0 text-black h1">{dashboardValues?.guests}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}