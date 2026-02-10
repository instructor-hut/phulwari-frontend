import dynamic from "next/dynamic";
import AppLayout from "@/layouts/AppLayout";
import ReactPaginate from "react-paginate";

const TableLayout = dynamic(() => import("@/layouts/TableLayout"));

export default function Registrations() {
    return (
        <AppLayout>
            <nav>
                <div className="border-bottom p-1 d-flex align-items-center" style={{ backgroundColor: "rgb(246 246 246)", padding: "0px", maxHeight: "36px" }}>
                    <div className="row d-flex justify-content-between">
                        <div className="col page-heading">
                            <span style={{ fontWeight: "500" }}>User Role</span>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end me-2">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={{}}
                            pageRangeDisplayed={1}
                            pageCount={1}
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
                <nav className="container-fluid navbar border-bottom bg-white p-1">
                    <button className="btn btn-primary btn-sm-top ms-1" data-bs-toggle="modal" data-bs-target="#AddUserRoleModal"> + Add User Role</button>
                </nav>
                <TableLayout tableHeadings={["Name", "Designation", "Subject Teaching", "Load", "Status", "Actions"]}>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                        </tr>
                    </tbody>
                </TableLayout>
            </div>
        </AppLayout>
    )
}