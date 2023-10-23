"use client"
import Link from "next/link"
import { useRouter } from 'next/router';
import { ColumnDef } from "@tanstack/react-table"
import { buttonVariants } from "@/components/ui/button"

export type Payment = {
  id: string
  stock: number
  price: number
  offer: string
  images?: string
  orderId: string
  sold_count: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    size: 0,
    minSize: 0,
    header: "OFFER",
    accessorKey: "title",
    cell: ({ row }) => {
      const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
      return (
        <div className="flex items-center space-x-2">
          { row.original.images && <div style={{ background: `url("${row.original.images}") center center / cover no-repeat` }} className="w-14 h-14 rounded-md"></div> }
          <Link className="font-semibold" href={`${currentUrl}/${row.original.id}`}>{row.getValue('title')}</Link>
        </div>
      )
    },
  },
  {
    size: 200,
    header: "PRICE",
    accessorKey: "price",
    cell: ({ row }) => {
      return (<b>{row.getValue('price')} USDC</b>)
    }
  },
  {
    size: 200,
    header: "QUANTITY",
    accessorKey: "stock",
    cell: ({ row }) => {
      return row.original.stock - row.original.sold_count
    }
  },
  {
    size: 180,
    header: "ACTIONS",
    accessorKey: "actions",
    cell: ({ row }) => {
      return <Link href={`/order/${row.original.orderId}`} rel="noreferrer" className={buttonVariants({ size: 'sm' })}>Buy Now</Link>
    },
  },
]
