"use client"
import Link from "next/link"
import { offerType } from '@/lib/utils'
import { ColumnDef } from "@tanstack/react-table"
import { buttonVariants } from "@/components/ui/button"

export type Payment = {
    id: string
    slug: string
    type: number
    orderId: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        size: 250,
        header: "COLLECTION",
        accessorKey: "slug",
    },
    {
        size: 200,
        header: "FEES",
        accessorKey: "fees_ratio",
        cell: ({ row }) => {
            return (<b>{row.getValue('fees_ratio')} %</b>)
        }
    },
    {
        size: 200,
        header: "TYPE",
        accessorKey: "type",
        cell: ({ row }) => {
            return offerType[row.original.type];
        }
    },
    {
        size: 300,
        header: "CREATE_TIME",
        accessorKey: "created_at",
    },
    {
        size: 180,
        header: "ACTIONS",
        accessorKey: "actions",
        cell: ({ row }) => {
            return <Link href={`/admin/collectionCreation?id=${row.original.id}&slug=${row.original.slug}`} rel="noreferrer" className={buttonVariants({ size: 'sm' })}>Edit</Link>
        },
    },
]
