import Link from "next/link";

export default function PageNotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
            <h1 className="display-1 text-primary fw-bold">404</h1>
            <p className="fs-3">
                <span className="text-primary">Oops!</span> Page not found.
            </p>
            <p className="lead">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link className="btn btn-primary btn-sm mt-3" href="/">
                Go Back Home
            </Link>
        </div>
    )
}