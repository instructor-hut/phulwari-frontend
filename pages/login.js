import dynamic from "next/dynamic";
import { Condition } from "@/utils/condition/Condition";
import IsEmail from "@/utils/validators/isEmail.validator";
import IsEmpty from "@/utils/validators/isEmpty.validator";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { ToastFunction } from "@/utils/response";
import { useRouter } from "next/navigation";

const AuthLayout = dynamic(() => import("@/layouts/AuthLayout"));

export default function Login() {
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        rememberMe: false,
        toggleType: "password"
    });

    const [validations, setValidations] = useState({
        invalidEmail: "",
        invalidPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            if (credentials.rememberMe) {
                setCookie(null, "rememberedUsername", encodeURIComponent(credentials.email), { maxAge: 30 * 24 * 60 * 60, path: "/" });
                setCookie(null, "rememberedPassword", encodeURIComponent(credentials.password), { maxAge: 30 * 24 * 60 * 60, path: "/" });
            }
            else {
                destroyCookie(null, "rememberedUsername");
                destroyCookie(null, "rememberedUsername");
            }

            if (IsEmpty(credentials.email)) {
                setValidations(prev => ({ ...prev, invalidEmail: "Email is required." }));
                return;
            }
            else if (!IsEmail(credentials.email)) {
                setValidations(prev => ({ ...prev, invalidEmail: "Email is invalid. e.g, john@example.com" }));
                return;
            }
            else {
                setValidations(prev => ({ ...prev, invalidEmail: "" }));
            }

            if (IsEmpty(credentials.password)) {
                setValidations(prev => ({ ...prev, invalidPassword: "Password is required." }));
                return;
            }
            else {
                setValidations(prev => ({ ...prev, invalidPassword: "" }));
            }

            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/authentication/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const status = await response.json();

            if (status.success) {
                setCookie(null, "token", status?.data?.token, { maxAge: 7 * 24 * 60 * 60, path: "/" });
                setCookie(null, "userId", status?.data?.user?._id, { maxAge: 7 * 24 * 60 * 60, path: "/" });
                setCookie(null, "firstName", status?.data?.user?.name?.firstName, { maxAge: 7 * 24 * 60 * 60, path: "/" });
                setCookie(null, "lastName", status?.data?.user?.name?.lastName, { maxAge: 7 * 24 * 60 * 60, path: "/" });
                setCookie(null, "middleName", status?.data?.user?.name?.middleName, { maxAge: 7 * 24 * 60 * 60, path: "/" });
                setCookie(null, "email", status?.data?.user?.email?.address, { maxAge: 7 * 24 * 60 * 60, path: "/" });

                ToastFunction("success", "Login successful, Redirecting...");

                router.push("/app");
            }
            else {
                status.error.map(error => {
                    ToastFunction("error", error?.message);
                });
            }
        }
        catch (error) {
            ToastFunction("error", error?.message);
        }

        setLoading(false);
    }

    const handleTogglePassword = () => {
        if (credentials.toggleType === "password") {
            setCredentials({ ...credentials, toggleType: "text" });
        }
        else {
            setCredentials({ ...credentials, toggleType: "password" });
        }
    }

    useEffect(() => {
        const { rememberedUsername, rememberedPassword } = parseCookies();

        if (rememberedUsername && rememberedPassword) {
            setCredentials({
                ...credentials,
                email: decodeURIComponent(rememberedUsername),
                password: decodeURIComponent(rememberedPassword),
                rememberMe: true
            });
        }
    }, []);


    return (
        <AuthLayout>
            <div className="mb-5">
                <h3 className="text-center mb-2">Login Account</h3>
                <p className="text-center mb-0 small">
                    <span className="me-1">Yes PIET</span>
                    <i className="ti ti-heart-filled text-danger"></i>
                </p>
            </div>
            <div className="row row-cols-1 gy-3">
                <div className="col">
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control form-control-sm"
                            placeholder="example@gmail.com"
                            name="email"
                            id="email"
                            required={true}
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            disabled={loading}
                        />
                    </div>
                    <Condition>
                        <Condition.When isTrue={!IsEmpty(validations.invalidEmail)}>
                            <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                <i className="ti ti-circle-x-filled"></i>
                                <span className="ms-1">{validations.invalidEmail}</span>
                            </p>
                        </Condition.When>
                    </Condition>
                </div>
                <div className="col">
                    <div className="input-group" data-bs-toggle="password">
                        <input
                            type={credentials.toggleType}
                            className="form-control form-control-sm"
                            placeholder="********"
                            name="password"
                            id="password"
                            required={true}
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            disabled={loading}
                        />
                        <span className="bg-white rounded-1 input-group-text toggle-password-hide" onClick={handleTogglePassword}></span>
                    </div>
                    <Condition>
                        <Condition.When isTrue={!IsEmpty(validations.invalidPassword)}>
                            <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                <i className="ti ti-circle-x-filled"></i>
                                <span className="ms-1">{validations.invalidPassword}</span>
                            </p>
                        </Condition.When>
                    </Condition>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-6">
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                name="save-password"
                                id="save-password"
                                checked={credentials.rememberMe}
                                onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                                disabled={loading}
                            />
                            <span className="small">Save Password</span>
                        </div>
                        <div className="col-6 text-end">
                            <span className="small">
                                {/* <Link href="/forgot-password" className="text-decoration-none text-regular">Forgot Password?</Link> */}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            <Condition>
                                <Condition.When isTrue={loading}>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    <span>Log In...</span>
                                </Condition.When>
                                <Condition.Else>
                                    <span>Log In</span>
                                </Condition.Else>
                            </Condition>
                        </button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}