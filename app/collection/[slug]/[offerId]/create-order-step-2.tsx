import Image from "next/image"
import loading from "@/public/Spin-1s-200px.gif"

export function CreateOrderStep_2({ orderInfo }: any) {

  return (
    <>
      <div className="flex items-center justify-center flex-col py-6">
        <div className="w-10 h-10 bg-slate-100 border rounded-full p-[2px] mb-2"><Image src={loading} alt="loading"/></div>
        <h2 className="text-2xl font-semibold">Transtion in process</h2>
        <p className="text-xs text-center text-slate-500 mt-3">Due to network congestion, Ethereum transactions may take longer to complete. Please wait or increase the gas price for the transaction</p>
      </div>
    </>
  )
}