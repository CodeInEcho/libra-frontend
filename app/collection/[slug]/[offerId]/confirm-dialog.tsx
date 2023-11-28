"use client"
import { ethers } from "ethers"
import http from "@/lib/request"
import { StepBar } from "./step-bar"
import { useSignTypedData } from 'wagmi'
import { LibraAbi } from "@/lib/libra-abi"
import { writeContract } from '@wagmi/core'
import { useState, useEffect } from "react"
import { CreateOrderStep_1 } from "./create-order-step-1"
import { CreateOrderStep_2 } from "./create-order-step-2"
import { CreateOrderStep_3 } from "./create-order-step-3"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface TriggerProps {
    offerId: string
    orderInfo: {
        price: number
        quantity: number
        seller_address: string
    }
    children: React.ReactNode
}

export default function ConfirmDiolog({ orderInfo, offerId, children }: TriggerProps) {
    const [step, setStep] = useState(1);
    const [order, setOrder] = useState<any>({});
    const [message, setMessage] = useState<any>({
        id: '',
        buyer: '',
        seller: '',
        price: 0,
        quantity: 0,
        feesRatio: 0,
        securityDeposit: 0,
        fundReleasePeriod: 0,
    });

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

    const { signTypedData } = useSignTypedData({
        domain,
        types,
        message,
        primaryType: 'OrderParams',
        onSuccess: async (data) => {
            const res = await http.post('/order/create-order-signature', {
                order_id: order.id,
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
    });

    useEffect(() => {
        if (message.id) signTypedData();
    }, [message])

    const createOrder = async () => {
        const res = await http.post('/order/create-order', {
            offer_id: offerId,
            quantity: orderInfo.quantity,
        });
        const order = res.data.data;
        setOrder(res.data.data);
        setMessage({
            id: order.id,
            price: ethers.parseEther(String(order.price)),
            buyer: order.buyer_address,
            seller: order.seller_address,
            quantity: ethers.parseUnits(String(order.quantity), 'wei'),
            feesRatio: ethers.parseUnits(String(2), 'wei'),
            securityDeposit: ethers.parseUnits(String(0), 'wei'),
            fundReleasePeriod: ethers.parseUnits(String(7), 'wei'),
        })
        // setStep(step + 1);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader><DialogTitle>Payment Details</DialogTitle></DialogHeader>
                <StepBar step={step} />
                {step === 1 && <CreateOrderStep_1 createOrder={createOrder} quantity={orderInfo.quantity} price={orderInfo.price} />}
                {step === 2 && <CreateOrderStep_2 orderInfo={order} />}
                {step === 3 && <CreateOrderStep_3 />}
            </DialogContent>
        </Dialog>
    )
}