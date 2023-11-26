import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import './Table.css';
import { columnDef } from "./TableColumn";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Title from "../../ui/Title";

const EmployeeTable = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { refetch, data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => axiosPublic.get("/users")
    })

    const handleCellClick = (rowData, column) => {
        if (column.columnDef && column.columnDef.onClick && typeof column.columnDef.onClick === 'function') {
            if (column.columnDef.header === 'Verified') {
                axiosPublic.patch(`/user-verification/${rowData._id}`, { verified: rowData.verified })
                    .then(res => {
                        console.log(res)
                        refetch();
                        refetch();
                    })
            }
            else if (column.columnDef.header === 'Pay') {
                if (!rowData.verified) {
                    return
                }
                let payment;
                let method;

                Swal.fire({
                    title: `What payment do you want to be done to ${rowData.name}?`,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#5bb286',
                    confirmButtonText: `Monthly at ${rowData.salary}`,
                    denyButtonText: `Yearly at ${rowData.salary * 12}`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        Swal.fire("Done", `Monthly payment done to ${rowData.name}`, "success");
                        payment = rowData.salary * 1;
                        method = 'monthly';
                    } else if (result.isDenied) {
                        Swal.fire("Done", `Yearly payment done to ${rowData.name}`, "success");
                        payment = rowData.salary * 12;
                        method = 'yearly';
                    }
                    if (payment) {
                        let range;
                        const currentDate = new Date();
                        if (method === 'monthly') {
                            const month = currentDate.toString().slice(4, 7)
                            range = month;
                        }
                        else if (method === 'yearly') {
                            const year = currentDate.getFullYear();
                            range = year;
                        }
                        // console.log(range);
                        // console.log(rowData.payments)
                        const paymentInfo = {
                            range: range,
                            payment: payment
                        }
                        let payments = rowData.payments || [];
                        payments.unshift(paymentInfo)
                        console.log(payments)
                        axiosPublic.patch(`/user-payment/${rowData._id}`, payments)
                            .then(res => {
                                console.log(res)
                            })
                    }
                });
            }
            else if (column.columnDef.header === 'Details') {
                console.log('details');
                navigate(`/employeeDetails/${rowData._id}`)
            }
        }
    };

    const tableInstance = useReactTable({
        data: users.data,
        columns: columnDef,
        getCoreRowModel: getCoreRowModel(),
    }, [users.data]);

    return (
        <div className="mt-[50px]">
            <Title
                title={'HR Dashboard'}
            ></Title>
            <div className="w-[80%] mx-auto mt-[0px]">
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

export default EmployeeTable;