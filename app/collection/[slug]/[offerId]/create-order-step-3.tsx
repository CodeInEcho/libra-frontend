import loading from "@/public/Spin-1s-200px.gif"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CreateOrderStep_3() {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <p className="text-2xl font-bold">$2487</p>
        <h2 className="text-lg">Payment Success</h2>
      </div>
      <div className="space-y-4 text-sm">
        <div className="flex items-center">
          <p className="text-zinc-500">Order Number</p>
          <div className="ml-auto font-medium">21088793</div>
        </div>
        <div className="flex items-center">
          <p className="text-zinc-500">Payment Status</p>
          <div className="ml-auto font-medium">Success</div>
        </div>
        <div className="flex items-center">
          <p className="text-zinc-500">Payment Time</p>
          <div className="ml-auto font-medium">2023-07-12 12:31:12</div>
        </div>
        <div className="flex items-center">
          <p className="text-zinc-500">Total payment</p>
          <div className="ml-auto font-medium">2023-07-12 12:31:12</div>
        </div>
      </div>
      <div className="flex w-full space-x-4">
        <Button className="flex-1">View Transtion</Button>
        <Button className="flex-1">View Order</Button>
      </div> 
    </>
  )
}