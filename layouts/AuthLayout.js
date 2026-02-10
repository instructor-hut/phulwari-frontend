import Image from "next/image";

export default function AuthLayout(props) {
    return (
        <div className="row g-0">
            <div className="d-none d-lg-block col-5">
                <Image
                    src="/assets/img/login-banner-2.jpg"
                    width={636}
                    height={695}
                    style={{ filter: "brightness(60%)" }}
                    alt="PIET Phulwari Login Banner"
                />
            </div>
            <div className="col-12 col-lg-7 container-sm bg-light">
                <div className="d-flex align-items-center justify-content-center min-vh-100">
                    <div style={{ maxWidth: "25rem" }}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}