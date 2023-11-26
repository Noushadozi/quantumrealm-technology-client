import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { paymentHistoryColumnDef } from "./PaymentTableColumn";
import Title from "../../ui/Title";

const PaymentHistory = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data, isLoading } = useQuery({
        queryKey: ['user', user.email],
        queryFn: () => axiosPublic(`/usersInfo/${user.email}`)
    })

    const tableInstance = useReactTable({
        data: data?.data[0]?.payments,
        columns: paymentHistoryColumnDef,
        getCoreRowModel: getCoreRowModel(),
    }, [data?.data[0]?.payments]);

    if (isLoading) {
        return
    }

    console.log(data?.data[0]?.payments);

    return (
        <div className="mt-[50px]">
            <Title
                title={'Payment history'}
            ></Title>
            <div className="w-[80%] mx-auto mt-[10px]">
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
                                {tableInstance.getRowModel()?.rows.map((rowEl, index) => (
                                    <tr key={index}>
                                        {rowEl.getVisibleCells().map((cellEl, index) => (
                                            <td key={index}>
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
        </div>
    );
};

export default PaymentHistory;