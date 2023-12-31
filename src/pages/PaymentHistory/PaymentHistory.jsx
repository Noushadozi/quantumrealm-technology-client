import { useQuery } from "@tanstack/react-query";
import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { paymentHistoryColumnDef } from "./PaymentTableColumn";
import Title from "../../ui/Title";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#e9bafb");
    const { user } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: () => axiosSecure.get(`/privateInfo/${user.email}`)
    })
    console.log(data?.data[0].payments)

    const tableInstance = useReactTable({
        data: data?.data[0]?.payments || [],
        columns: paymentHistoryColumnDef,
        getCoreRowModel: getCoreRowModel(),
    }, [data?.data[0]?.payments]);

    if (isLoading) {
        return <div className="text-center mt-[150px]">
            <PulseLoader
                color={color}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }


    return (
        <>
            {
                data?.data[0]?.payments?.length !== undefined ?
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
                    </div> :
                    <Title
                        title={'No payment history found'}
                    ></Title>
            }
        </>
    );
};

export default PaymentHistory;