import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { buttonVariants, Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <div>
      <h1 className="game-title text-3xl font-bold mb-6">DUEL BLAST Ancestral Rare Two-Handed Sword (Slashing)</h1>
      <div className="flex gap-6">
        <div className="image-box w-96 h-96">
          <img style={{
            background: 'url("https://www.zhubaosheying.com/uploadfile/thumb/b450c248c3abec176eb7c4657b3b92d6.jpg") center center / cover no-repeat',
          }} className="w-96 h-96 rounded-[1.25rem]" src='https://www.zhubaosheying.com/uploadfile/thumb/b450c248c3abec176eb7c4657b3b92d6.jpg' />
        </div>
        <div className="w-[41.5rem]">
          <ul>
            <li className="flex">
              <label className="w-[10rem] pb-[0.8rem] text-lg font-semibold">Price</label>
              <div className="flex-auto pb-[0.8rem] px-8 border-b border-slate-100 font-semibold text-2xl">$ 59.99</div>
            </li>
            <li className="flex">
              <label className="w-[10rem] py-[0.8rem] text-lg font-semibold">Seller</label>
              <div className="flex-auto py-[0.8rem] px-8 border-b border-slate-100">CodeInEcho.eth</div>
            </li>
            <li className="flex">
              <label className="w-[10rem] py-[0.8rem] text-lg font-semibold">Social Links</label>
              <div className="flex-auto py-[0.8rem] px-8 border-b border-slate-100">@CodeInEcho</div>
            </li>
            <li className="flex">
              <label className="w-[10rem] py-[0.8rem] text-lg font-semibold">Offer ends</label>
              <div className="flex-auto py-[0.8rem] px-8 border-b border-slate-100">Aug-01-2023 15:35:56 PM</div>
            </li>
            <li className="flex">
              <label className="w-[10rem] py-[0.8rem] text-lg font-semibold">Delivery speed</label>
              <div className="flex-auto py-[0.8rem] px-8 border-b border-slate-100">20 Minutes</div>
            </li>
            <li className="flex">
              <label className="w-[10rem] py-[0.8rem] text-lg font-semibold">Reserve</label>
              <div className="flex-auto py-[0.8rem] px-8 border-b border-slate-100">
                <Input className="w-20"></Input>
              </div>
            </li>
          </ul>
          <div className="pt-4">
            <div className="flex flex-col space-y-2">
              <Button>Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
