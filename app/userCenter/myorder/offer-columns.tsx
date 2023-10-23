"use client"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

const orderStatus: { [key: number]: string } = {
  1: 'Pending',
  2: 'Processing',
  3: 'Shipped',
  4: 'Completed',
  5: 'Cancelled',
  6: 'Returning',
  7: 'Returned',
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
} 

export const offerColumns: ColumnDef<any>[] = [
  {
    size: 400,
    header: "Offer Title",
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          { row.original.collection && <img src={row.original.collection.logo} className="w-[66px] h-[66px] rounded-md object-cover"></img> }
          <div className="flex flex-col">
            <Link href={`/collection/${row.original.collection.slug}/${row.original.id}`} rel="noreferrer" className="cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis flex-1 font-semibold">{ row.getValue('title') }</Link>
            <div className="my-[6px] text-[#A4A4A4]">CreateTime：{ formatDate(row.original.created_at) }</div>
            <div className="text-[#A4A4A4]">Collection：{row.original.collection.collection_cn}</div>
          </div>
        </div>
      )
    },
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => {
      return `$${row.original.price}`;
    }
  },
  {
    header: "Stock",
    accessorKey: "stock",
    cell: ({ row }) => {
      return row.original.stock - row.original.sold_count;
    }
  },
  {
    header: "Order Status",
    accessorKey: "status",
    cell: ({ row }) => {
      return orderStatus[row.original.status]
    }
  },
  {
    header: "Action",
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <Link href={`/collection/${row.original.collection.slug}/${row.original.id}`} rel="noreferrer">View details</Link>
      )
    },
  },
]
