import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { workSheetTableColumnDef } from "./WorkSheetTableCoumn";

const WorkSheetTable = ({ data, isLoading }) => {


    const tasks = data?.data[0]?.tasks || [];

    const tableInstance = useReactTable({
        data: tasks,
        enabled: !isLoading,
        columns: workSheetTableColumnDef,
        getCoreRowModel: getCoreRowModel(),
    }, [tasks]);

    if (isLoading) {
        return <progress></progress>
    }
    console.log(data);

    return (
        <div className="mt-[50px]">
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
                                        {rowEl.getVisibleCells()?.map((cellEl, index) => (
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

export default WorkSheetTable;