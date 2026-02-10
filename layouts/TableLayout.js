const TableLayout = ({ children, tableHeadings, tableHeadingsSecond, isOverFlow = false, height = "69.2vh", model = false, stickyTop = "sticky-top" }) => {
    return (
        <div className={`border ${model ? "m-0" : "m-2"} rounded-2 table-responsive-md ${isOverFlow ? "overflow-y-auto" : ""}`} style={{ height: height, backgroundColor: "white" }}>
            <table className="table table-striped mb-0" >
                <thead style={{ borderBottom: "#0C98CD" }} className={stickyTop}>
                    <tr>
                        {
                            tableHeadings && tableHeadings?.map((heading, index) => {
                                return <th key={index} style={{ fontWeight: "500" }}>{heading}</th>
                            })
                        }
                    </tr>
                    <tr className="second-header" style={{ borderWidth: "0px" }}>
                        {
                            tableHeadingsSecond && tableHeadingsSecond?.map((heading, index) => {
                                return <th key={index} style={{ fontWeight: "500" }}>{heading}</th>
                            })
                        }
                    </tr>
                </thead>
                {children}
            </table>
        </div>
    )
}
export default TableLayout;