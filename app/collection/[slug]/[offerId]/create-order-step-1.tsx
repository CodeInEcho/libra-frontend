import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { account } from "aws-sdk/clients/sns";

export function CreateOrderStep_1({ price, quantity, createOrder }: { price: number, quantity: number, createOrder: any }) {
  const tax = () => {
    const amount = (price * quantity * (0 / 100)).toFixed(2)
    return amount || 0;
  }
  return (
    <div className="bg-[#F5F5F5] px-3 py-4 rounded-lg">
      <div className="font-medium text-sm">
        <div className="flex items-center py-3 px-3 pt-0">
          <p className="">Amount</p>
          <div className="ml-auto">{ quantity }</div>
        </div>
        <div className="flex items-center py-3 px-3">
          <p className="">Price</p>
          <div className="ml-auto">${ price }</div>
        </div>
        <div className="flex items-center py-3 px-3">
          <p className="">Tax</p>
          <div className="ml-auto">0%</div>
        </div>
      </div>
      <div className="flex items-center py-3 px-3 border-t border-dashed">
        <p className="text-sm text-black">Total</p>
        <div className="text-sm ml-auto text-black">${ price * quantity }</div>
      </div>
      <Button onClick={createOrder} className="w-full">Confirm</Button>
    </div>
  )
}