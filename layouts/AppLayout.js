import dynamic from "next/dynamic";

const AppFooter = dynamic(() => import("@/components/App/AppFooter"));
const AppHeader = dynamic(() => import("@/components/App/AppHeader"));
const AppSidebar = dynamic(() => import("@/components/App/AppSidebar"));

const RootLayout = dynamic(() => import("@/layouts/RootLayout"));

export default function AppLayout({ children }) {
    return (
        <RootLayout>
            <AppHeader />
            <div className="d-flex">
                <div className="d-none d-lg-block" style={{ width: "15%" }}>
                    <AppSidebar />
                </div>
                <div className="responsive-app">
                    {children}
                </div>
            </div>
            <AppFooter />
            <div className="offcanvas offcanvas-start app-sidebar-mobile" tabIndex="-1" id="AppMobileSidebar">
                <div className="offcanvas-body py-0 px-0" style={{ backgroundColor: "#2B333E" }}>
                    <AppSidebar />
                </div>
            </div>
        </RootLayout>
    )
}