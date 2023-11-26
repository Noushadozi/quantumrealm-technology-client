import { createColumnHelper } from "@tanstack/react-table"
const columnHelper = createColumnHelper();

// let pay buton

export const paymentHistoryColumnDef = [
    columnHelper.accessor("range", {
        header: "Month/Year",
    }),
    {
        accessorFn: (row) => `${row.payment}`,
        header: 'Amount',
    },
    {
        accessorFn: (row) => `${'✅'}`,
        header: 'Transaction Id',
        onClick: () => { },
    },
]