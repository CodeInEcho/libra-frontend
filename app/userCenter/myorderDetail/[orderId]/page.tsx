"use client"
import { Card, CardTitle,  CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderHistory } from "./order-history"
import { OrderAction } from "./order-action"
import { useEffect, useState } from "react"
import http from '@/lib/request'

const order_status = {
  1: 'Pending Payment',
  2: 'Pending Shipment',
  3: 'Confirm Receipt',
  4: 'Completed',
  5: 'Cancelled',
  6: 'Returning',
  7: 'Returned'
} as any;

const collection_type = {
  1: 'NFT',
  2: 'COIN',
  3: 'GAME',
} as any;

export default function MyorderDetailPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const [orderInfo, setOrderInfo] = useState<any>({})
  const [orderHistory, setOrderHistory] = useState<any>([])

  useEffect(() => {
    getOrderDetail(orderId);
    getOrderHistory(orderId);
  }, [])

  const getOrderDetail = async (orderId: string) => {
    const res = await http.get(`/order/detail/${orderId}`);
    setOrderInfo(res.data.data)
  }

  const getOrderHistory = async (orderId: string) => {
    const res = await http.get(`/order/history/${orderId}`);
    setOrderHistory(res.data.data)
  }

  return (
    <div className="flex container my-[2.5rem]">
      <div className="flex-1">
        <Card>
          <CardHeader className="p-4 border-b">
            <h1 className="text-2xl font-semibold mb-1">{ orderInfo.offer_title }</h1>
            <div className="flex items-center mt-2 space-x-4">
              <ul className="text-xs flex space-x-2">
                <li className="bg-black text-white rounded py-[0.125rem] px-2">{ collection_type[orderInfo.collection_type] }</li>
                {/* <li className="bg-black text-white rounded py-[0.125rem] px-2">Deposit</li> */}
              </ul>
              <Separator className="h-[1rem]" orientation="vertical" />
              <div className="font-medium text-sm">Current status: <span className="text-green-500">{ order_status[orderInfo.status] }</span></div>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-8 flex justify-between">
            <div className="w-[8rem] h-[8rem] bg-[#eee]"></div>
            <div className="w-[8rem] h-[8rem] bg-[#eee]"></div>
            <div className="w-[8rem] h-[8rem] bg-[#eee]"></div>
            <div className="w-[8rem] h-[8rem] bg-[#eee]"></div>
          </CardContent>
          <OrderAction isCard orderInfo={orderInfo}/>
        </Card>
        <CardTitle className="mb-4 mt-6">Order Info</CardTitle>
        <div className="text-sm">
          <div className="flex items-center border-b border-slate-200 px-2 py-3">
            <span className="flex-1 text-slate-400">Collection</span>
            <span className="flex-1">{ orderInfo.collection_titlt_cn }</span>
          </div>
          <div className="flex items-center border-b border-slate-200 px-2 py-3">
            <span className="flex-1 text-slate-400">Mode of transaction</span>
            <span className="flex-1">Secured Transaction</span>
          </div>
          <div className="flex items-center border-b border-slate-200 px-2 py-3">
            <span className="flex-1 text-slate-400">Unit Price</span>
            <span className="flex-1">${ orderInfo.offer_price }</span>
          </div>
          <div className="flex items-center border-b border-slate-200 px-2 py-3">
            <span className="flex-1 text-slate-400">Order Quantity</span>
            <span className="flex-1">{ orderInfo.quantity }</span>
          </div>
          <div className="flex items-center border-b border-slate-200 px-2 py-3">
            <span className="flex-1 text-slate-400">Total Amount</span>
            <span className="flex-1">${ orderInfo.total_amount }</span>
          </div>
          <div className="flex items-center border-b border-slate-200 px-2 py-3">
            <span className="flex-1 text-slate-400">Seller</span>
            <span className="flex-1">{ orderInfo.seller_address }</span>
          </div>
          <div className="flex items-center border-b border-slate-200 px-2 py-3">
            <span className="flex-1 text-slate-400">Seller Social Link</span>
            <span className="flex-1">{ orderInfo.twitter || 'Not bound' }</span>
          </div>
        </div>
      </div>
      <OrderHistory orderHistory={orderHistory} status={orderInfo.status}/>
    </div>
  )
}