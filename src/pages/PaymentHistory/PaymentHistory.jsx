import { useQuery } from "@tanstack/react-query";
import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { paymentHistoryColumnDef } from "./PaymentTableColumn";
import Title from "../../ui/Title";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: () => axiosSecure.get(`/privateInfo/${user.email}`)
    })

    const tableInstance = useReactTable({
        data: data?.data[0]?.payments || [],
        columns: paymentHistoryColumnDef,
        getCoreRowModel: getCoreRowModel(),
    }, [data?.data[0]?.payments]);

    if (isLoading) {
        return
    }


    return (
        <div className="mt-[50px] xl:mx-[150px] pb-[80px] bg-[url('https://i.ibb.co/GQ57fvD/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0003-Photo-Room-png-Phot.png')] bg-no-repeat bg-left-top">
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