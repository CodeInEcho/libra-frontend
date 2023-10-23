import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"

export default async function Success() {

  return (
    <section className="container flex flex-col pb-8 space-y-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">CONGRATULATIONS!</h1>
        </div>
        <p className="max-w-[1400px] text-justify text-lg text-muted-foreground">Offer #5123123 has beem created.</p>
      </div>
    </section>
  )
}
