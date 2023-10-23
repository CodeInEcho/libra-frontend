"use client"
import Link from "next/link"
import { PartyPopper } from "lucide-react"
import { useEffect, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"

interface infoType {
  offerId: string
  collection: string
}

export default function IndexPage() {
  const [info, setInfo] = useState<infoType>();

  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect:success');
    const info = redirect ? JSON.parse(redirect) : null;
    setInfo(info);
  }, [])

  return (
    <section className="container my-20 flex items-center justify-center flex-col">
      <h1 className="text-3xl font-semibold">CONGRATULATIONS!</h1>
      <PartyPopper className="w-[6rem] h-[6rem] my-12"/>
      { info ? 
        <>
          <div className="flex items-center space-x-8">
            <div className="font-medium">Offer <span className="text-orange-500">{info?.offerId}</span> has been created.</div>
            <Button>Edit</Button>
            <Link href={`/collection/${info?.collection}/${info?.offerId}`} rel="noreferrer" className={buttonVariants()}>View</Link>
          </div>
          <div className="text-center mt-20">
            <p className="text-orange-500 font-medium text-lg">Share your offer & Sell It Faster！</p>
            <p>Share it now on your social media account and instantly enhance the exposure of your offer.</p>
          </div>
        </> : 
        <>
          <div className="font-medium mb-6">offer have been created.</div>
          <Link href={'/offerCreation'} rel="noreferrer" className={buttonVariants()}>BACK CREATE MORE OFFER</Link> 
        </>
      }
    </section>
  )
}
