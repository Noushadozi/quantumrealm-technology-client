import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import './Table.css';
import { columnDef } from "./TableColumn";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Title from "../../ui/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetUser from "../../hooks/useGetUser";

const EmployeeTable = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const { user } = useGetUser();
    console.log(user?.data[0]?.bank_account_no)

    const { refetch, data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => axiosSecure.get("/employees")
    })

    const handleCellClick = (rowData, column) => {
        if (column.columnDef && column.columnDef.onClick && typeof column.columnDef.onClick === 'function') {
            if (column.columnDef.header === 'Verified') {
                axiosSecure.patch(`/user-verification/${rowData._id}`, { verified: rowData.verified })
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
                        const paymentInfo = {
                            range: range,
                            payment: payment,
                            transaction_id: user?.data[0]?.bank_account_no
                        }
                        let payments = rowData.payments || [];
                        payments.push(paymentInfo)
                        axiosSecure.patch(`/user-payment/${rowData._id}`, payments)
                            .then(res => {
                                console.log(res)
                            })
                    }
                });
            }
            else if (column.columnDef.header === 'Details') {
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
        <div className="mt-[60px] pb-[50px] bg-[url('https://i.ibb.co/gJBZzgk/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0017-Photo-Room-png-Phot.png')] bg-no-repeat bg-right-bottom xl:mx-[150px]">
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