import { createColumnHelper } from "@tanstack/react-table"
const columnHelper = createColumnHelper();

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
        accessorFn: () => `Pay`,
        header: 'Pay',
        onClick: () => { },
    },
    {
        accessorFn: () => `Details`,
        header: 'Details',
        onClick: () => { },
    },
]