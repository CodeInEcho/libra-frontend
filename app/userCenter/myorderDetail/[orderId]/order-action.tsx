"use client"
import http from '@/lib/request'
import Deliver from "@/components/deliver"
import { useEffect, useState, useRef } from "react"
import { CardFooter } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

export function OrderAction({ orderInfo, onUpdate, isCard = false }: any) {
  const childRef = useRef<any>(null);
  const [userId, setUserId] = useState('')

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      const user_id = userInfo && JSON.parse(userInfo).userId;
      setUserId(user_id);
    } catch (error) {}
  }, [])

  const cancel = (val: boolean) => {
    childRef.current?.changeOpen(val);
    childRef.current?.changeloading(false);
  }

  const confirmDeliver = () => {
    childRef.current?.changeloading(true);
    http.post('/order/confirm-deliver', {
      order_id: orderInfo.id
    }).then(() => {
      onUpdate()
    }).finally(() => {
      cancel(false)
    })
  }

  const confirmReceipt = () => {
    childRef.current?.changeloading(true);
    http.post('/order/confirm-receipt', {
      order_id: orderInfo.id
    }).then(() => {
      onUpdate()
    }).finally(() => {
      cancel(false)
    })
  }

  const cancelOrder = async () => {
    childRef.current?.changeloading(true);
    http.post('/order/cancel-order', {
      order_id: orderInfo.id
    }).then(() => {
      onUpdate()
    }).finally(() => {
      cancel(false)
    })
  }

  const Action = (
    <>
      {orderInfo.status === "Pending" && 
        <>
          <div className={buttonVariants({ size: "sm" })}>Payment</div>
          <Deliver 
          cRef={childRef}
          confirm={cancelOrder}
          title="Are you sure to cancel order?"
          description="Please ensure action, as this action cannot be undone once confirmed.">
            <div className={buttonVariants({ size: "sm", variant: 'outline' })}>Cancel order</div>
          </Deliver>
        </>
      }
      {orderInfo.status === "Processing" && userId === orderInfo.seller_id && <>
        <Deliver 
        cRef={childRef}
        confirm={confirmDeliver}
        title="Are you sure to deliver?"
        description="Please ensure accurate delivery, as this action cannot be undone once confirmed.">
          <div className={buttonVariants({ size: "sm" })}>Ship Now</div>
        </Deliver>
        {/* <div className={buttonVariants({ size: "sm", variant: 'outline'  })}>Upload Deliver Screenshot</div> */}
        <div className={buttonVariants({ size: "sm", variant: 'outline' })}>Apply Cancellation</div>
      </>}
      {orderInfo.status === "Shipped" && userId === orderInfo.buyer_id && 
      <>
        <Deliver 
        cRef={childRef}
        confirm={confirmReceipt}
        title="Are you sure to receipt?"
        description="Please ensure that you have received the item correctly, as this action cannot be undone once confirmed.">
          <div className={buttonVariants({ size: "sm" })}>Confirm Receipt</div>
        </Deliver>
      </>}
    </>
  )
  if (isCard) {
    return (
      <>
      { orderInfo.status === "Pending" && <CardFooter className="p-4 border-t space-x-4">{Action}</CardFooter> }
      { orderInfo.status === "Processing" && userId === orderInfo.seller_id && <CardFooter className="p-4 border-t space-x-4">{Action}</CardFooter> }
      { orderInfo.status === "Shipped" && userId === orderInfo.buyer_id && <CardFooter className="p-4 border-t space-x-4">{Action}</CardFooter> }
      </>
    )
  } else {
    return Action;
  }
}