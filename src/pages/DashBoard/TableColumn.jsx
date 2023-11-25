import { createColumnHelper } from "@tanstack/react-table"
const columnHelper = createColumnHelper();

// let pay buton

export const columnDef = [
    columnHelper.accessor("name", {
        header: "Name",
    }),
    {
        accessorFn: (row) => `${row.email}`,
        header: 'Email',
    },
    {
        accessorFn: (row) => `${row.verified === false ? `❌` : '✅'}`,
        header: 'Verified',
        onClick: () => { },
    },
    {
        accessorKey: 'bank_account_no',
        header: 'Bank_account_no',
    },
    {
        accessorKey: 'salary',
        header: 'Salary',
    },
    {
        accessorFn: () => `💸`,
        header: 'Pay',
        onClick: () => { },
    },
    {
        accessorKey: 'designation',
        header: 'Details',
    },
]