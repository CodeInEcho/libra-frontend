"use client"
import { ethers } from "ethers"
import http from '@/lib/request'
import { useSignTypedData } from 'wagmi'
import Deliver from "@/components/deliver"
import { LibraAbi } from "@/lib/libra-abi"
import { writeContract } from '@wagmi/core'
import { CardFooter } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import { buttonVariants } from "@/components/ui/button"

export function OrderAction({ orderInfo, onUpdate, isCard = false }: any) {
    const childRef = useRef<any>(null);
    const [userId, setUserId] = useState('')

    const domain = {
        version: '1',
        name: 'Payment',
        chainId: 11155111,
        verifyingContract: process.env.NEXT_PUBLIC_LIBRA_CONTRACT as `0x${string}`
    } as const

    const types = {
        OrderParams: [
            {
                name: "id",
                type: "string",
            },
            {
                name: "buyer",
                type: "address",
            },
            {
                name: "seller",
                type: "address",
            },
            {
                name: "price",
                type: "uint256",
            },
            {
                name: "quantity",
                type: "uint256",
            },
            {
                name: "feesRatio",
                type: "uint256",
            },
            {
                name: "securityDeposit",
                type: "uint256",
            },
            {
                name: "fundReleasePeriod",
                type: "uint256",
            },
        ],
    } as const

    const message = {
        id: orderInfo.id,
        price: ethers.parseEther(String(orderInfo.price)),
        buyer: orderInfo.buyer_address,
        seller: orderInfo.seller_address,
        quantity: ethers.parseUnits(String(orderInfo.quantity), 'wei'),
        feesRatio: ethers.parseUnits(String(2), 'wei'),
        securityDeposit: ethers.parseUnits(String(0), 'wei'),
        fundReleasePeriod: ethers.parseUnits(String(7), 'wei'),
    } as const

    const { signTypedData } =
        useSignTypedData({
            domain,
            types,
            message,
            primaryType: 'OrderParams',
            onSuccess: async (data) => {
                console.log(domain, types, message);
                const res = await http.post('/order/create-order-signature', {
                    order_id: orderInfo.id,
                    signature: data,
                });
                const amount = orderInfo.price * orderInfo.quantity;
                const value = ethers.parseEther(String(amount + amount / 100));
                const { hash } = await writeContract({
                    value: value,
                    abi: LibraAbi,
                    functionName: 'createOrder',
                    args: [message, res.data.data],
                    address: process.env.NEXT_PUBLIC_LIBRA_CONTRACT as `0x${string}`,
                })
            }
        })

    useEffect(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            const user_id = userInfo && JSON.parse(userInfo).userId;
            setUserId(user_id);
        } catch (error) { }
    }, [])

    const cancel = (val: boolean) => {
        childRef.current?.changeOpen(val);
        childRef.current?.changeloading(false);
    }

    const confirmDeliver = () => {
        childRef.current?.changeloading(true);
        http.post('/order/confirm-deliver', {
            order_id: orderInfo.id
        }).then(async (res) => {
            const signature = res.data.data;
            const { hash } = await writeContract({
                abi: LibraAbi,
                functionName: 'confirmDeliver',
                args: [orderInfo.id, signature],
                address: process.env.NEXT_PUBLIC_LIBRA_CONTRACT as `0x${string}`,
            });
            onUpdate()
        }).finally(() => {
            cancel(false)
        })
    }

    const confirmReceipt = () => {
        childRef.current?.changeloading(true);
        http.post('/order/confirm-receipt', {
            order_id: orderInfo.id
        }).then(async (res) => {
            const signature = res.data.data;
            const { hash } = await writeContract({
                abi: LibraAbi,
                functionName: 'confirmReceipt',
                args: [orderInfo.id, signature],
                address: process.env.NEXT_PUBLIC_LIBRA_CONTRACT as `0x${string}`,
            });
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
                    <div className={buttonVariants({ size: "sm" })} onClick={() => signTypedData()}>Payment</div>
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
                {orderInfo.status === "Pending" && <CardFooter className="p-4 border-t space-x-4">{Action}</CardFooter>}
                {orderInfo.status === "Processing" && userId === orderInfo.seller_id && <CardFooter className="p-4 border-t space-x-4">{Action}</CardFooter>}
                {orderInfo.status === "Shipped" && userId === orderInfo.buyer_id && <CardFooter className="p-4 border-t space-x-4">{Action}</CardFooter>}
            </>
        )
    } else {
        return Action;
    }
}