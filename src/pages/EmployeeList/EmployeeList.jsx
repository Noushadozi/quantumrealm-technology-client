import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { employeeListCol } from "./EmployeeListColumn";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const EmployeeList = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { remove } = useContext(AuthContext);

    const { refetch, data: allVerified = [], isLoading } = useQuery({
        queryKey: ['all-verified-employee'],
        queryFn: () => axiosSecure(`/all-verified-employee`)
    })
    console.log(allVerified.data)

    const tableInstance = useReactTable({
        data: allVerified.data,
        columns: employeeListCol,
        getCoreRowModel: getCoreRowModel(),
    }, [allVerified]);

    if (isLoading) {
        return <progress></progress>
    }

    const handleCellClick = (rowData, column) => {
        if (column.columnDef && column.columnDef.onClick && typeof column.columnDef.onClick === 'function') {
            if (column.columnDef.header === 'Fire') {
                //
                console.log('fired', rowData._id);
                axiosPublic.delete(`/fire-user/${rowData._id}`)
                    .then(res => {
                        console.log(res);
                        refetch();
                        // remove()
                        //     .then(res => {

                        //     })
                    })
            }
            else if (column.columnDef.header === 'Promote') {
                if (rowData.role === "Employee") {
                    Swal.fire({
                        title: `Promote ${rowData.name} to HR?`,
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#00d26a",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, promote"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Promoted",
                                text: `${rowData.name} has been promoted to HR`,
                                icon: "success"
                            });
                            axiosPublic.patch(`/user-promote/${rowData._id}`)
                                .then(res => {
                                    console.log(res.data);
                                    refetch();
                                })
                        }
                    });
                }
            }
        }
    };

    return (
        <div>
            <div className="w-[80%] px-[80px] mx-auto py-[100px] my-[100px] bg-[url('https://i.ibb.co/bvPcW0q/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0016-Photo-Room-png-Phot.png')] bg-no-repeat bg-right-top">
                {
                    !isLoading && <table>
                        <thead>
                            {tableInstance.getHeaderGroups().map((headerEl, index) => {
                                return <tr key={index}>{headerEl.headers.map((columnEl, index) => {
                                    return (
                                        <th key={index} colSpan={columnEl.colSpan}>
                                            {
                                                flexRender(
                                                    columnEl.column.columnDef.header,
                                                    columnEl.getContext()
                                                )
                                            }
                                        </th>
                                    )
                                })}
                                </tr>
                            })}
                        </thead>
                        <tbody>
                            {tableInstance.getRowModel().rows.map((rowEl, index) => (
                                <tr key={index}>
                                    {rowEl.getVisibleCells().map((cellEl, index) => (
                                        <td key={index} onClick={() => handleCellClick(rowEl.original, cellEl.column)}>
                                            {flexRender(
                                                cellEl.column.columnDef.cell,
                                                cellEl.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
};

export default EmployeeList;