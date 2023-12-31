import { createColumnHelper } from "@tanstack/react-table"
const columnHelper = createColumnHelper();

// let pay buton

export const paymentHistoryColumnDef = [
    columnHelper.accessor("range", {
        header: "Month/Year",
    }),
    {
        accessorFn: (row) => `${row.payment} USD`,
        header: 'Amount',
    },
    {
        accessorFn: (row) => `${row.transaction_id}`,
        header: 'Transaction Id',
        onClick: () => { },
    },
]