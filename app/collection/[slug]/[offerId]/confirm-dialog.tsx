"use client"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrderStep_1 } from "./create-order-step-1"
import { CreateOrderStep_2 } from "./create-order-step-2"
import { CreateOrderStep_3 } from "./create-order-step-3"
import { StepBar } from "./step-bar"
import { useState } from "react"
import http from "@/lib/request"

interface TriggerProps {
  price: number
  offerId: string
  quantity: number
  children: React.ReactNode
}

export default function ConfirmDiolog({ price, children, quantity, offerId }: TriggerProps) {
  const [step, setStep] = useState(1);
  const createOrder = async () => {
    await http.post('/order/create-order', {
      offer_id: offerId,
      quantity: quantity,
    });
    setStep(step + 1);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{ children }</DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader><DialogTitle>Payment Details</DialogTitle></DialogHeader>
        <StepBar step={step}/>
        { step === 1 && <CreateOrderStep_1 createOrder={createOrder} quantity={quantity} price={price}/> }
        { step === 2 && <CreateOrderStep_2 /> }
        { step === 3 && <CreateOrderStep_3 /> }
      </DialogContent>
    </Dialog>
  )
}