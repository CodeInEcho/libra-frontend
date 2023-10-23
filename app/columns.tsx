"use client"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { buttonVariants } from "@/components/ui/button"

export type Collection = {
  id: string
  slug: string
  image?: string
  quantity: number
}

export const columns: ColumnDef<Collection>[] = [
  {
    size: 600,
    header: "Collection",
    accessorKey: "collection_cn",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          { row.original.image && <div style={{
            background: `url("${row.original.image}") center center / cover no-repeat`,
          }} className="w-10 h-10 rounded-full"></div> }
          <Link rel="noreferrer" href={`/collection/${row.original.slug}`} className="cursor-pointer text-base font-bold flex-1">{row.getValue('collection_cn')}</Link>
        </div>
      )
    },
  },
  {
    header: "1D Change",
    accessorKey: "price1",
  },
  {
    header: "7D Change",
    accessorKey: "price2",
  },
  {
    header: "Volume",
    accessorKey: "quantity3",
  },
  {
    header: "Sales",
    accessorKey: "quantity4",
  },
  {
    header: "Items",
    accessorKey: "quantity5",
  },
]
