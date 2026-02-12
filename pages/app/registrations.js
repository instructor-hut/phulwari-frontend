import dynamic from "next/dynamic";
import AppLayout from "@/layouts/AppLayout";
import ReactPaginate from "react-paginate";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { ToastFunction } from "@/utils/response";
import { Condition } from "@/utils/condition/Condition";
import IsEmpty from "@/utils/validators/isEmpty.validator";
import moment from "moment";

const TableLayout = dynamic(() => import("@/layouts/TableLayout"));

export default function Registrations() {
    const { token } = parseCookies();

    const [registrations, setRegistrations] = useState([]);
    const [paginationData, setPaginationData] = useState({});

    const [studentDetails, setStudentDetails] = useState({});

    const LoadPaginationData = async (e) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/phulwari?page=${e.selected + 1}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const status = await response.json();
            if (status?.success) {
                setRegistrations(status?.data?.registrations);
                setPaginationData(status?.data?.pagination);
            }
        } catch (error) {
            ToastFunction("error", error?.message);
        }
    }

    useEffect(() => {
        async function FetchRegistrations() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/phulwari?page=1`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const status = await response.json();

                if (status?.success) {
                    setRegistrations(status?.data?.registrations);
                    ToastFunction("success", status?.message);
                }

            } catch (error) {
                ToastFunction("error", error?.message);
            }

        }

        if (token) FetchRegistrations();
    }, [token]);
    return (
        <AppLayout>
            <nav>
                <div className="border-bottom p-1 d-flex align-items-center" style={{ backgroundColor: "rgb(246 246 246)", padding: "0px", maxHeight: "36px" }}>
                    <div className="row d-flex justify-content-between">
                        <div className="col page-heading">
                            <span style={{ fontWeight: "500" }}>Registrations</span>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end me-2">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={LoadPaginationData}
                            pageRangeDisplayed={1}
                            pageCount={paginationData?.pageCount ? Number(paginationData?.pageCount) : 1}
                            previousLabel="Previous"
                            renderOnZeroPageCount={null}
                            previousLinkClassName="prev_link"
                            nextLinkClassName="next_link"
                            className="react-pagination"
                            activeLinkClassName="activePage"
                            disabledClassName="disabled_btn"
                            disabledLinkClassName="disabled_link"
                        />
                    </div>
                </div>
            </nav>
            <div style={{ backgroundColor: "#f6f6f6", minHeight: "calc(100% - 38px)" }}>
                {/* <nav className="container-fluid navbar border-bottom bg-white p-1">
                    <button className="btn btn-primary btn-sm-top ms-1" data-bs-toggle="modal" data-bs-target="#AddUserRoleModal"> + Add User Role</button>
                </nav> */}

                <TableLayout tableHeadings={[
                    "Name",
                    "Register As",
                    "Admission Number",
                    "Phone Number",
                    "Referred By",
                    "School",
                    "Class",
                    "Verified",
                    "Status",
                    "Actions"
                ]}>
                    <tbody>
                        <Condition>
                            <Condition.When isTrue={registrations?.length > 0}>
                                {
                                    registrations.map(registration => {
                                        return (
                                            <tr key={registration?._id}>
                                                <td>{registration?.name}</td>
                                                <td>
                                                    <Condition>
                                                        <Condition.When isTrue={registration?.registerAs === "piet-student"}>
                                                            <span className="bg-primary badge" style={{ fontSize: 11 }}>PIET Student</span>
                                                        </Condition.When>
                                                        <Condition.When isTrue={registration?.registerAs === "guest"}>
                                                            <span className="bg-success badge" style={{ fontSize: 11 }}>Guest</span>
                                                        </Condition.When>
                                                    </Condition>
                                                </td>
                                                <td>{registration?.admissionNumber || "-"}</td>
                                                <td>{registration?.phoneNumber || "-"}</td>
                                                <td>{registration?.referredBy || "-"}</td>
                                                <td>{registration?.school || "-"}</td>
                                                <td>{registration?.className || "-"}</td>
                                                <td>
                                                    <Condition>
                                                        <Condition.When isTrue={registration?.verified === "yes"}>
                                                            <span className="bg-success badge" style={{ fontSize: 11 }}>Yes</span>
                                                        </Condition.When>
                                                        <Condition.When isTrue={registration?.verified === "no"}>
                                                            <span className="bg-danger badge" style={{ fontSize: 11 }}>No</span>
                                                        </Condition.When>
                                                    </Condition>
                                                </td>
                                                <td>
                                                    <Condition>
                                                        <Condition.When isTrue={registration?.status === "check-in"}>
                                                            <span className="bg-info badge" style={{ fontSize: 11 }}>Checked In</span>
                                                        </Condition.When>
                                                        <Condition.When isTrue={registration?.status === "not-check-in"}>
                                                            <span className="bg-warning badge" style={{ fontSize: 11 }}>Not Checked In</span>
                                                        </Condition.When>
                                                    </Condition>
                                                </td>
                                                <td>
                                                    <div className="dropdown dropdown">
                                                        <i className="ti ti-menu-2" type="icon" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                                        <ul className="dropdown-menu" aria-labelledby="actions-dropdown">
                                                            <li data-bs-toggle="modal" data-bs-target="#ViewStudentDetails" onClick={() => setStudentDetails(registration)}>
                                                                <a className="dropdown-item small" href="#">
                                                                    <i className="ti ti-eye me-3"></i>
                                                                    <span>View {registration?.registerAs === "piet-student" ? "Student" : "Guest"}</span>
                                                                </a>
                                                            </li>
                                                            <Condition>
                                                                <Condition.When isTrue={registration.verified === "no"}>
                                                                    <li data-bs-toggle="modal" data-bs-target="#VerifyBooking" onClick={() => setStudentDetails(registration)}>
                                                                        <a className="dropdown-item small" href="#">
                                                                            <i className="ti ti-checks me-3"></i>
                                                                            <span>Verify</span>
                                                                        </a>
                                                                    </li>
                                                                </Condition.When>
                                                            </Condition>
                                                            <Condition>
                                                                <Condition.When isTrue={registration.verified === "yes"}>
                                                                    <li data-bs-toggle="modal" data-bs-target="#ReshareTicket" onClick={() => setStudentDetails(registration)}>
                                                                        <a className="dropdown-item small" href="#">
                                                                            <i className="ti ti-brand-whatsapp me-3"></i>
                                                                            <span>Re-share Ticket</span>
                                                                        </a>
                                                                    </li>
                                                                </Condition.When>
                                                            </Condition>
                                                            <Condition>
                                                                <Condition.When isTrue={registration.verified === "yes" && registration.status === "not-check-in"}>
                                                                    <li data-bs-toggle="modal" data-bs-target="#CheckIn" onClick={() => setStudentDetails(registration)}>
                                                                        <a className="dropdown-item small" href="#">
                                                                            <i className="ti ti-square-check me-3"></i>
                                                                            <span>Check In</span>
                                                                        </a>
                                                                    </li>
                                                                </Condition.When>
                                                            </Condition>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </Condition.When>
                            <Condition.Else>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-end">No record found.</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </Condition.Else>
                        </Condition>
                    </tbody>
                </TableLayout>
            </div>
            <div className="modal fade" id="ViewStudentDetails" data-bs-backdrop="static">
                <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header" style={{ color: "white" }}>
                            <h6 className="modal-title text-white">
                                <span className="me-1">{studentDetails?.name}</span>
                                <Condition>
                                    <Condition.When isTrue={studentDetails?.registerAs === "piet-student"}>
                                        <span>(PIET Student)</span>
                                    </Condition.When>
                                    <Condition.When isTrue={studentDetails?.registerAs === "guest"}>
                                        <span>(Guest)</span>
                                    </Condition.When>
                                </Condition>
                            </h6>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="ViewStudentDetailsClose" onClick={() => setStudentDetails({})}></button>
                        </div>
                        <div className="modal-body p-4">
                            <Condition>
                                <Condition.When isTrue={studentDetails.registerAs === "piet-student"}>
                                    <div className="row gy-3">
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">Your Name</p>
                                            <p className="mb-0 small">{studentDetails.name}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">Admission Number</p>
                                            <p className="mb-0 small">{studentDetails.admissionNumber}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">School</p>
                                            <p className="mb-0 small">{studentDetails.school}</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-1 fw-bolder small">Class</p>
                                            <p className="mb-0 small">{studentDetails.className}</p>
                                        </div>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(studentDetails.fatherName) && !IsEmpty(studentDetails.fatherPhoneNumber)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Father's Name</p>
                                                    <p className="mb-0 small">{studentDetails.fatherName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Father's Phone Number</p>
                                                    <p className="mb-0 small">{studentDetails.fatherPhoneNumber}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(studentDetails.motherName) && !IsEmpty(studentDetails.motherPhoneNumber)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Mother's Name</p>
                                                    <p className="mb-0 small">{studentDetails.motherName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Mother's Phone Number</p>
                                                    <p className="mb-0 small">{studentDetails.motherPhoneNumber}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(studentDetails.siblingOneName) && !IsEmpty(studentDetails.siblingOneDOB)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">1. Sibling's Name</p>
                                                    <p className="mb-0 small">{studentDetails.siblingOneName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Sibling's D.O.B</p>
                                                    <p className="mb-0 small">{moment(studentDetails.siblingOneDOB).format("DD/MM/YYYY")}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                        <Condition>
                                            <Condition.When isTrue={!IsEmpty(studentDetails.siblingTwoName) && !IsEmpty(studentDetails.siblingTwoDOB)}>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">2. Sibling's Name</p>
                                                    <p className="mb-0 small">{studentDetails.siblingTwoName}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-1 fw-bolder small">Sibling's D.O.B</p>
                                                    <p className="mb-0 small">{moment(studentDetails.siblingTwoDOB).format("DD/MM/YYYY")}</p>
                                                </div>
                                            </Condition.When>
                                        </Condition>
                                    </div>
                                </Condition.When>
                                <Condition.When isTrue={studentDetails.registerAs === "guest"}>
                                    <div className="row gy-3">
                                        <div className="col-4">
                                            <p className="mb-1 fw-bolder small">Your Name</p>
                                            <p className="mb-0 small">{studentDetails.name}</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="mb-1 fw-bolder small">Phone Number</p>
                                            <p className="mb-0 small">{studentDetails.phoneNumber}</p>
                                        </div>
                                        <div className="col-4">
                                            <p className="mb-1 fw-bolder small">Reference By</p>
                                            <p className="mb-0 small">{studentDetails.referredBy}</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-1 fw-bolder small">Your Address</p>
                                            <p className="mb-0 small">{studentDetails.address}</p>
                                        </div>
                                    </div>
                                </Condition.When>
                            </Condition>
                            <div className="row mt-3">
                                <div className="col">
                                    <p className="mb-0 fw-bolder small">Ticket Id</p>
                                    <p className="mb-0 small">{studentDetails.ticketId}</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fw-bolder small">Status</p>
                                    <Condition>
                                        <Condition.When isTrue={studentDetails?.status === "check-in"}>
                                            <span className="bg-info badge" style={{ fontSize: 11 }}>Checked In</span>
                                        </Condition.When>
                                        <Condition.When isTrue={studentDetails?.status === "not-check-in"}>
                                            <span className="bg-warning badge" style={{ fontSize: 11 }}>Not Checked In</span>
                                        </Condition.When>
                                    </Condition>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fw-bolder small">Members</p>
                                    <p className="mb-0 small">{studentDetails.count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}