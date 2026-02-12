import { Condition } from "@/utils/condition/Condition";
import { ToastFunction } from "@/utils/response";
import IsEmpty from "@/utils/validators/isEmpty.validator";
import IsPhoneNumber from "@/utils/validators/isPhoneNumber.validator";
import Image from "next/image";
import moment from "moment";
import { useState } from "react";

export default function Registration() {
    const [values, setValues] = useState({
        registerAs: "",
        name: "",
        admissionNumber: "",
        phoneNumber: "",
        referredBy: "",
        address: "",
        className: "",
        school: "",
        fatherName: "",
        fatherPhoneNumber: "",
        motherName: "",
        motherPhoneNumber: "",
        siblingOneName: "",
        siblingOneDOB: "",
        siblingTwoName: "",
        siblingTwoDOB: ""
    });

    const [validations, setValidations] = useState({
        invalidName: "",
        invalidAdmissionNumber: "",
        invalidPhoneNumber: "",
        invalidReferredBy: "",
        invalidAddress: "",
        invalidClassName: "",
        invalidSchool: "",
        invalidFatherName: "",
        invalidFatherPhoneNumber: "",
        invalidMotherName: "",
        invalidMotherPhoneNumber: "",
        invalidSiblingOneName: "",
        invalidSiblingOneDOB: "",
        invalidSiblingTwoName: "",
        invalidSiblingTwoDOB: ""
    });

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);

    const PrevStep = () => {
        if (step - 1 !== 0) {
            setStep(step - 1);
        }
    }

    const NextStep = () => {
        if (step === 1) {
            if (IsEmpty(values.registerAs)) {
                ToastFunction("warning", "Select one option.");
                return;
            }
        }

        if (step === 2) {
            if (IsEmpty(values.name)) {
                setValidations({ ...validations, invalidName: "Please enter your name." });
                return;
            }
            else {
                validations.invalidName = "";
            }

            if (values.registerAs === "guest") {
                if (IsEmpty(values.phoneNumber)) {
                    setValidations({ ...validations, invalidPhoneNumber: "Please enter your phone number." });
                    return;
                }
                else if (!IsPhoneNumber(values.phoneNumber)) {
                    setValidations({ ...validations, invalidPhoneNumber: "Please enter a valid phone number of 10 digits." });
                    return;
                }
                else {
                    validations.invalidPhoneNumber = "";
                }

                if (IsEmpty(values.address)) {
                    setValidations({ ...validations, invalidAddress: "Please enter your address." });
                    return;
                }
                else {
                    validations.invalidAddress = "";
                }

                if (IsEmpty(values.referredBy)) {
                    setValidations({ ...validations, invalidReferredBy: "Please select reference." });
                    return;
                }
                else {
                    validations.invalidReferredBy = "";
                }
            }

            if (values.registerAs === "piet-student") {
                if (IsEmpty(values.admissionNumber)) {
                    setValidations({ ...validations, invalidAdmissionNumber: "Please enter your admission number." });
                    return;
                }
                else {
                    validations.invalidAdmissionNumber = "";
                }

                if (IsEmpty(values.school)) {
                    setValidations({ ...validations, invalidSchool: "Please select your school." });
                    return;
                }
                else {
                    validations.invalidSchool = "";
                }

                if (IsEmpty(values.className)) {
                    setValidations({ ...validations, invalidClassName: "Please select your class." });
                    return;
                }
                else {
                    validations.invalidClassName = "";
                }

                if (!IsEmpty(values.fatherName) || !IsEmpty(values.fatherPhoneNumber)) {
                    if (IsEmpty(values.fatherName)) {
                        setValidations({ ...validations, invalidFatherName: "Please enter your father's name." });
                        return;
                    }
                    else {
                        validations.invalidFatherName = "";
                    }

                    if (IsEmpty(values.fatherPhoneNumber)) {
                        setValidations({ ...validations, invalidFatherPhoneNumber: "Please enter your father's phone number." });
                        return;
                    }
                    else if (!IsPhoneNumber(values.fatherPhoneNumber)) {
                        setValidations({ ...validations, invalidFatherPhoneNumber: "Please enter your father's valid phone number of 10 digits." });
                        return;
                    }
                    else {
                        validations.invalidFatherPhoneNumber = "";
                    }
                }

                if (!IsEmpty(values.motherName) || !IsEmpty(values.motherPhoneNumber)) {
                    if (IsEmpty(values.motherName)) {
                        setValidations({ ...validations, invalidMotherName: "Please enter your mother's name." });
                        return;
                    }
                    else {
                        validations.invalidMotherName = "";
                    }

                    if (IsEmpty(values.motherPhoneNumber)) {
                        setValidations({ ...validations, invalidMotherPhoneNumber: "Please enter your mother's phone number." });
                        return;
                    }
                    else if (!IsPhoneNumber(values.motherPhoneNumber)) {
                        setValidations({ ...validations, invalidMotherPhoneNumber: "Please enter your mother's valid phone number of 10 digits." });
                        return;
                    }
                    else {
                        validations.invalidMotherPhoneNumber = "";
                    }
                }

                if (!IsEmpty(values.siblingOneName) || !IsEmpty(values.siblingOneDOB)) {
                    if (IsEmpty(values.siblingOneName)) {
                        setValidations({ ...validations, invalidSiblingOneName: "Please enter your sibling's name." });
                        return;
                    }
                    else {
                        validations.invalidSiblingOneName = "";
                    }

                    if (IsEmpty(values.siblingOneDOB)) {
                        setValidations({ ...validations, invalidSiblingOneDOB: "Please enter your sibling's date of birth." });
                        return;
                    }
                    else {
                        validations.invalidSiblingOneDOB = "";
                    }
                }

                if (!IsEmpty(values.siblingTwoName) || !IsEmpty(values.siblingTwoDOB)) {
                    if (IsEmpty(values.siblingTwoName)) {
                        setValidations({ ...validations, invalidSiblingTwoName: "Please enter your sibling's name." });
                        return;
                    }
                    else {
                        validations.invalidSiblingTwoName = "";
                    }

                    if (IsEmpty(values.siblingTwoDOB)) {
                        setValidations({ ...validations, invalidSiblingTwoDOB: "Please enter your sibling's date of birth." });
                        return;
                    }
                    else {
                        validations.invalidSiblingTwoDOB = "";
                    }
                }

                if (IsEmpty(values.fatherName) && IsEmpty(values.fatherPhoneNumber) && IsEmpty(values.motherName) && IsEmpty(values.motherPhoneNumber)) {
                    ToastFunction("warning", "One Parent is mandatory.");
                    return;
                }
            }
        }

        validations.invalidFatherName = "";
        validations.invalidFatherPhoneNumber = "";
        validations.invalidMotherName = "";
        validations.invalidMotherPhoneNumber = "";
        validations.invalidSiblingOneName = "";
        validations.invalidSiblingOneDOB = "";
        validations.invalidSiblingTwoName = "";
        validations.invalidSiblingTwoDOB = "";

        if (step + 1 <= 3) {
            setStep(step + 1);
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/phulwari/registrations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const status = await response.json();

            if (status.success) {
                ToastFunction("success", "Registration successful.");

                values.registerAs = "";
                values.name = "";
                values.admissionNumber = "";
                values.phoneNumber = "";
                values.referredBy = "";
                values.address = "";
                values.className = "";
                values.school = "";
                values.fatherName = "";
                values.fatherPhoneNumber = "";
                values.motherName = "";
                values.motherPhoneNumber = "";
                values.siblingOneName = "";
                values.siblingOneDOB = "";
                values.siblingTwoName = "";
                values.siblingTwoDOB = "";

                validations.invalidName = "";
                validations.invalidAdmissionNumber = "";
                validations.invalidPhoneNumber = "";
                validations.invalidReferredBy = "";
                validations.invalidAddress = "";
                validations.invalidClassName = "";
                validations.invalidSchool = "";
                validations.invalidFatherName = "";
                validations.invalidFatherPhoneNumber = "";
                validations.invalidMotherName = "";
                validations.invalidMotherPhoneNumber = "";
                validations.invalidSiblingOneName = "";
                validations.invalidSiblingOneDOB = "";
                validations.invalidSiblingTwoName = "";
                validations.invalidSiblingTwoDOB = "";

                setStep(1);
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

    return (
        <div className="row g-0">
            <div className="d-none d-lg-block col-5">
                <Image
                    src="/assets/img/registration-banner-2.jpg"
                    width={500}
                    height={500}
                    className="w-100 h-100"
                    style={{ filter: "brightness(60%)" }}
                    alt="Keshavam Rock Banner"
                />
            </div>
            <div className="col-12 col-lg-7 container-sm bg-light" style={{ maxHeight: "100vh", overflowY: "auto" }}>
                <div className={`d-flex align-items-center justify-content-center min-vh-100 ${step === 2 && values.registerAs === "piet-student" ? "my-5" : ""}`}>
                    <div style={{ maxWidth: "30rem" }}>
                        <div id="step-1" className={step === 1 ? "d-block" : "d-none"}>
                            <h5 className="text-regular mb-5">Register As?</h5>
                            <div className="content-center">
                                <div
                                    className={`
                                        shadow-sm border rounded-3 content-center me-4 fw-bolder
                                        ${values.registerAs === "piet-student" ? "bg-primary border-0 text-white" : ""}
                                    `}
                                    onClick={() => setValues({ ...values, registerAs: "piet-student" })}
                                    style={{ width: 175, height: 150 }}
                                >
                                    <span>P.I.E.T Student</span>
                                </div>
                                <div
                                    className={`
                                        shadow-sm border rounded-3 content-center fw-bolder
                                        ${values.registerAs === "guest" ? "bg-primary border-0 text-white" : ""}
                                    `}
                                    onClick={() => setValues({ ...values, registerAs: "guest" })}
                                    style={{ width: 175, height: 150 }}
                                >
                                    <span>Guest</span>
                                </div>
                            </div>
                        </div>
                        <div id="step-2" className={step === 2 ? "d-block" : "d-none"}>
                            <Condition>
                                <Condition.When isTrue={values.registerAs === "piet-student"}>
                                    <h5 className="text-regular mb-5">Student Details</h5>
                                    <div className="row row-cols-1 gy-3">
                                        <div className="col">
                                            <label htmlFor="name" className="small mb-1">Your Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="name"
                                                id="name"
                                                required={true}
                                                value={values.name}
                                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidName)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidName}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="admission-number" className="small mb-1">Admission Number</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="admission-number"
                                                id="admission-number"
                                                required={true}
                                                value={values.admissionNumber}
                                                onChange={(e) => setValues({ ...values, admissionNumber: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidAdmissionNumber)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidAdmissionNumber}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="school" className="small mb-1">School Name</label>
                                            <select
                                                className="form-select form-select-sm"
                                                name="school"
                                                id="school"
                                                required={true}
                                                value={values.school}
                                                onChange={(e) => setValues({ ...values, school: e.target.value })}
                                                disabled={loading}
                                            >
                                                <option value="">-- Select School --</option>
                                                <option value="PIET Huda">PIET Huda</option>
                                                <option value="PIET Ansal">PIET Ansal</option>
                                                <option value="PIET NFL">PIET NFL</option>
                                            </select>
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidSchool)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidSchool}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="className" className="small mb-1">Your Class</label>
                                            <select
                                                className="form-select form-select-sm"
                                                name="className"
                                                id="className"
                                                required={true}
                                                value={values.className}
                                                onChange={(e) => setValues({ ...values, className: e.target.value })}
                                                disabled={loading}
                                            >
                                                <option value="">-- Select Class --</option>
                                                <option value="Nursery">Nursery</option>
                                                <option value="L.K.G">L.K.G</option>
                                                <option value="U.K.G">U.K.G</option>
                                                <option value="Grade 1">Grade 1</option>
                                                <option value="Grade 2">Grade 2</option>
                                                <option value="Grade 3">Grade 3</option>
                                                <option value="Grade 4">Grade 4</option>
                                                <option value="Grade 5">Grade 5</option>
                                                <option value="Grade 6">Grade 6</option>
                                                <option value="Grade 7">Grade 7</option>
                                                <option value="Grade 8">Grade 8</option>
                                                <option value="Grade 9">Grade 9</option>
                                                <option value="Grade 10">Grade 10</option>
                                                <option value="Grade 11">Grade 11</option>
                                                <option value="Grade 12">Grade 12</option>
                                            </select>
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidClassName)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidClassName}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                    </div>
                                    <h6 className="text-regular mt-5 mb-2">Accompany Details</h6>
                                    <div className="row gy-3">
                                        <div className="col-6">
                                            <label htmlFor="father-name" className="small mb-1">Father's Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="father-name"
                                                id="father-name"
                                                value={values.fatherName}
                                                onChange={(e) => setValues({ ...values, fatherName: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidFatherName)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidFatherName}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="father-phone-number" className="small mb-1">Father's Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="father-phone-number"
                                                id="father-phone-number"
                                                value={values.fatherPhoneNumber}
                                                onChange={(e) => setValues({ ...values, fatherPhoneNumber: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidFatherPhoneNumber)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidFatherPhoneNumber}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="mother-name" className="small mb-1">Mother's Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="mother-name"
                                                id="mother-name"
                                                value={values.motherName}
                                                onChange={(e) => setValues({ ...values, motherName: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidMotherName)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidMotherName}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="mother-phone-number" className="small mb-1">Mother's Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="mother-phone-number"
                                                id="mother-phone-number"
                                                value={values.motherPhoneNumber}
                                                onChange={(e) => setValues({ ...values, motherPhoneNumber: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidMotherPhoneNumber)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidMotherPhoneNumber}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="sibling-one-name" className="small mb-1">1. Sibling Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="sibling-one-name"
                                                id="sibling-one-name"
                                                value={values.siblingOneName}
                                                onChange={(e) => setValues({ ...values, siblingOneName: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidSiblingOneName)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidSiblingOneName}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="sibling-one-dob" className="small mb-1">Sibling D.O.B</label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm"
                                                name="sibling-one-dob"
                                                id="sibling-one-dob"
                                                value={values.siblingOneDOB}
                                                onChange={(e) => setValues({ ...values, siblingOneDOB: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidSiblingOneDOB)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidSiblingOneDOB}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="sibling-two-name" className="small mb-1">2. Sibling Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="sibling-two-name"
                                                id="sibling-two-name"
                                                value={values.siblingTwoName}
                                                onChange={(e) => setValues({ ...values, siblingTwoName: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidSiblingTwoName)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidSiblingTwoName}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="sibling-two-dob" className="small mb-1">Sibling D.O.B</label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm"
                                                name="sibling-two-dob"
                                                id="sibling-two-dob"
                                                value={values.siblingTwoDOB}
                                                onChange={(e) => setValues({ ...values, siblingTwoDOB: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidSiblingTwoDOB)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidSiblingTwoDOB}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                    </div>
                                    <p className="mt-4 small text-info" style={{ marginBottom: -20 }}>
                                        <i className="ti ti-info-circle"></i>
                                        <span className="ms-1">While entry Student ID card is mandatory.</span>
                                    </p>
                                </Condition.When>
                                <Condition.When isTrue={values.registerAs === "guest"}>
                                    <h5 className="text-regular mb-5">Guest Details</h5>
                                    <div className="row row-cols-1 gy-3">
                                        <div className="col">
                                            <label htmlFor="name" className="small mb-1">Your Name</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="name"
                                                id="name"
                                                required={true}
                                                value={values.name}
                                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidName)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidName}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="phone-number" className="small mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="phone-number"
                                                id="phone-number"
                                                required={true}
                                                value={values.phoneNumber}
                                                onChange={(e) => setValues({ ...values, phoneNumber: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidPhoneNumber)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidPhoneNumber}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="address" className="small mb-1">Address</label>
                                            <textarea
                                                className="form-control form-control-sm"
                                                name="address"
                                                id="address"
                                                required={true}
                                                value={values.address}
                                                onChange={(e) => setValues({ ...values, address: e.target.value })}
                                                disabled={loading}
                                            />
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidAddress)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidAddress}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="referred-by" className="small mb-1">Referred By</label>
                                            <select
                                                className="form-select form-select-sm"
                                                name="referred-by"
                                                id="referred-by"
                                                required={true}
                                                value={values.referredBy}
                                                onChange={(e) => setValues({ ...values, referredBy: e.target.value })}
                                                disabled={loading}
                                            >
                                                <option value="">-- Select Reference --</option>
                                                <option value="Mr. Hari Om Tayal">Mr. Hari Om Tayal</option>
                                                <option value="Mr. Rakesh Tayal">Mr. Rakesh Tayal</option>
                                                <option value="Mr. Shubham Tayal">Mr. Shubham Tayal</option>
                                                <option value="Mr. Suresh Tayal">Mr. Suresh Tayal</option>
                                            </select>
                                            <Condition>
                                                <Condition.When isTrue={!IsEmpty(validations.invalidReferredBy)}>
                                                    <p className="text-danger mt-1 mb-1" style={{ fontSize: 12 }}>
                                                        <i className="ti ti-circle-x-filled"></i>
                                                        <span className="ms-1">{validations.invalidReferredBy}</span>
                                                    </p>
                                                </Condition.When>
                                            </Condition>
                                        </div>
                                    </div>
                                    <p className="mt-4 small text-info" style={{ marginBottom: -20 }}>
                                        <i className="ti ti-info-circle"></i>
                                        <span className="ms-1">While entry ID Proof / Aadhar Card is mandatory.</span>
                                    </p>
                                </Condition.When>
                            </Condition>
                        </div>
                        <div id="step-3" className={step === 3 ? "d-block" : "d-none"}>
                            <Condition>
                                <Condition.When isTrue={values.registerAs === "piet-student"}>
                                    <h5 className="text-regular mb-5">Student Details</h5>
                                    <div className="row gy-3">
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">Your Name</p>
                                            <p className="mb-0 small">{values.name}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">Admission Number</p>
                                            <p className="mb-0 small">{values.admissionNumber}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">School</p>
                                            <p className="mb-0 small">{values.school}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">Class</p>
                                            <p className="mb-0 small">{values.className}</p>
                                        </div>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(values.fatherName) && !IsEmpty(values.fatherPhoneNumber)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Father's Name</p>
                                                    <p className="mb-0 small">{values.fatherName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Father's Phone Number</p>
                                                    <p className="mb-0 small">{values.fatherPhoneNumber}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(values.motherName) && !IsEmpty(values.motherPhoneNumber)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Mother's Name</p>
                                                    <p className="mb-0 small">{values.motherName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Mother's Phone Number</p>
                                                    <p className="mb-0 small">{values.motherPhoneNumber}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(values.siblingOneName) && !IsEmpty(values.siblingOneDOB)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">1. Sibling's Name</p>
                                                    <p className="mb-0 small">{values.siblingOneName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Sibling's D.O.B</p>
                                                    <p className="mb-0 small">{moment(values.siblingOneDOB).format("DD/MM/YYYY")}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(values.siblingTwoName) && !IsEmpty(values.siblingTwoDOB)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">2. Sibling's Name</p>
                                                    <p className="mb-0 small">{values.siblingTwoName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Sibling's D.O.B</p>
                                                    <p className="mb-0 small">{moment(values.siblingTwoDOB).format("DD/MM/YYYY")}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                    </div>
                                    <p className="mt-4 small text-info" style={{ marginBottom: -20 }}>
                                        <i className="ti ti-info-circle"></i>
                                        <span className="ms-1">While entry Student ID card is mandatory.</span>
                                    </p>
                                </Condition.When>
                                <Condition.When isTrue={values.registerAs === "guest"}>
                                    <h5 className="text-regular mb-5">Guest Details</h5>
                                    <div className="row gy-3">
                                        <div className="col-4">
                                            <p className="mb-1 fw-bolder small">Your Name</p>
                                            <p className="mb-0 small">{values.name}</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="mb-1 fw-bolder small">Phone Number</p>
                                            <p className="mb-0 small">{values.phoneNumber}</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="mb-1 fw-bolder small">Reference By</p>
                                            <p className="mb-0 small">{values.referredBy}</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-1 fw-bolder small">Your Address</p>
                                            <p className="mb-0 small">{values.address}</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 small text-info" style={{ marginBottom: -20 }}>
                                        <i className="ti ti-info-circle"></i>
                                        <span className="ms-1">While entry ID Proof / Aadhar Card is mandatory.</span>
                                    </p>
                                </Condition.When>
                            </Condition>
                        </div>
                        <div className="row mt-5">
                            <div className="col">
                                <button className="btn btn-primary btn-sm px-4 me-2" disabled={step === 1 || loading} onClick={PrevStep}>
                                    <i className="ti ti-arrow-left"></i>
                                    <span className="ms-2">Back</span>
                                </button>
                            </div>
                            <div className="col text-end">
                                <button className="btn btn-primary btn-sm px-4" disabled={loading} onClick={step < 3 ? NextStep : handleSubmit}>
                                    <Condition>
                                        <Condition.When isTrue={step < 3}>
                                            <span className="me-2">Next</span>
                                            <i className="ti ti-arrow-right"></i>
                                        </Condition.When>
                                        <Condition.When isTrue={step === 3}>
                                            <Condition>
                                                <Condition.When isTrue={loading}>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    <span>Submitting...</span>
                                                </Condition.When>
                                                <Condition.Else>
                                                    <span>Submit</span>
                                                </Condition.Else>
                                            </Condition>
                                        </Condition.When>
                                    </Condition>
                                </button>
                            </div>
                        </div>
                        <div className="content-center mt-5">
                            <div
                                className={`${step === 1 ? "bg-secondary" : ""} rounded-circle`}
                                style={
                                    step === 1 ? { width: 12, height: 12, backgroundColor: "#c9c9ca" }
                                        : { width: 10, height: 10, backgroundColor: "#c9c9ca" }
                                }
                            >
                            </div>
                            <div
                                className={`${step === 2 ? "bg-secondary" : ""} rounded-circle mx-2`}
                                style={
                                    step === 2 ? { width: 12, height: 12, backgroundColor: "#c9c9ca" }
                                        : { width: 10, height: 10, backgroundColor: "#c9c9ca" }
                                }
                            >
                            </div>
                            <div
                                className={`${step === 3 ? "bg-secondary" : ""} rounded-circle`}
                                style={
                                    step === 3 ? { width: 12, height: 12, backgroundColor: "#c9c9ca" }
                                        : { width: 10, height: 10, backgroundColor: "#c9c9ca" }
                                }
                            >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}