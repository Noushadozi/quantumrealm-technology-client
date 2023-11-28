import { createColumnHelper } from "@tanstack/react-table"
const columnHelper = createColumnHelper();

export const employeeListCol = [
    columnHelper.accessor("name", {
        header: "Name",
    }),
    {
        accessorKey: 'designation',
        header: 'Designation',
    },
    {
        accessorFn: (row) => `${row.role === 'HR' ? 'Already HR ✅' : `Promote to HR ⬆️`}`,
        header: 'Promote',
        onClick: () => { },
    },
    {
        accessorFn: () => `Fire 🚫`,
        header: 'Fire',
        onClick: () => { },
    },
]