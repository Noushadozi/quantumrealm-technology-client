import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import './Table.css';
import { columnDef } from "./TableColumn";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const EmployeeTable = () => {
    const axiosPublic = useAxiosPublic();

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
                    })
            }
            else if (column.columnDef.header === 'Pay') {
                if (!rowData.verified) {
                    return
                }
                let salary;
                let range;

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
                        salary = rowData.salary * 1;
                        range = 1;
                    } else if (result.isDenied) {
                        Swal.fire("Done", `Yearly payment done to ${rowData.name}`, "success");
                        salary = rowData.salary * 12;
                        range = 12;
                    }
                    if (salary) {
                        console.log(salary);
                        console.log(range);
                        new Date()
                        // axiosPublic.patch(`/user-paying`, salary)
                        const currentDate = new Date();
                        const day = currentDate.getDate();
                        const month = currentDate.getMonth();
                        const year = currentDate.getFullYear();

                        console.log(`${day}, ${month}, ${year}`);
                        console.log(currentDate.toString().slice(4, 7));

                    }
                });
            }
        }
    };

    const tableInstance = useReactTable({
        data: users.data,
        columns: columnDef,
        getCoreRowModel: getCoreRowModel(),
    }, [users.data]);

    return (
        <div>
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
    );
};

export default EmployeeTable;