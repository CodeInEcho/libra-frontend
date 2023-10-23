"use client"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  price: number
  offer: string
  image?: string
  status: number
  orderId: string
  order_at: string
  quantity: number
  collection: {
    logo: string
    collection_cn: string
    collection_en: string
  }
  seller: {
    wallet_address: string
  }
}

const orderStatus: { [key: number]: string } = {
  1: 'Pending',
  2: 'Processing',
  3: 'Shipped',
  4: 'Completed',
  5: 'Cancelled',
  6: 'Returning',
  7: 'Returned',
}

const abbreviateWalletAddress = (address: string) => {
  const prefixLength = 4;
  const suffixLength = 4;
  const ellipsis = '......';

  if (address.length <= prefixLength + suffixLength) {
    return address;
  }

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return prefix + ellipsis + suffix;
}

export const columns: ColumnDef<Payment>[] = [
  {
    size: 400,
    header: "Order Title",
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <div className="w-[25rem] flex items-center truncate space-x-3">
          { row.original.collection && <img src={row.original.collection.logo} className="w-[66px] h-[66px] rounded-md object-cover"></img> }
          <div className="flex flex-col">
            <Link href={`/userCenter/myorderDetail/${row.original.id}`} rel="noreferrer" className="w-[318px] cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis flex-1 font-semibold">{ row.getValue('title') }</Link>
            <div className="my-[6px] text-[#A4A4A4]">CreateTime：{ formatDate(row.original.order_at) }</div>
            <div className="text-[#A4A4A4]">Collection：{row.original.collection.collection_cn}</div>
          </div>
        </div>
      )
    },
  },
  {
    header: "Seller",
    accessorKey: "seller",
    cell: ({ row }) => {
      return abbreviateWalletAddress(row.original.seller.wallet_address);
    }
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => {
      return `$${row.original.price}`;
    }
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => {
      return (<div className="text-orange-500">${row.original.price * row.original.quantity}</div>)
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
        <Link href={`/userCenter/myorderDetail/${row.original.id}`} rel="noreferrer">View details</Link>
      )
    },
  },
]
