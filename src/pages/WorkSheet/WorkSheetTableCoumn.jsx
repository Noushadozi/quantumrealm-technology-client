import { createColumnHelper } from "@tanstack/react-table"
const columnHelper = createColumnHelper();

export const workSheetTableColumnDef = [
    columnHelper.accessor("task", {
        header: 'Tasks',
    }),
    {
        accessorKey: 'duration',
        header: "Hours Worked",
    },
    {
        accessorKey: 'date',
        header: 'Date',
    },
]