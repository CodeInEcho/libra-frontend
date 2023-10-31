"use client"
import dayjs from 'dayjs'
import http from "@/lib/request"
import { offerType } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { useEffect, useState } from "react"
import ConfirmDialog from "./confirm-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"

export default function IndexPage({ params }: { params: { offerId: string } }) {
  const { offerId } = params;
  useEffect(() => {
    getOfferInfo();
  }, [])

  const [offerInfo, setOfferInfo] = useState({
    title: '',
    price: 0,
    stock: 0,
    duration: 30,
    sold_count: 0,
    description: '',
    expirated_at: '',
    collection: { collection_en: '', type: null },
    seller: { wallet_address: '', twitter: '' }
  });
  const [images, setImages] = useState([])
  const [quantity, setQuantity] = useState<number>(1);

  const quantityChange = (type: number) => {
    let num = quantity;
    type ? num++ : num--;
    setQuantity(num);
  }

  const inputChange = (event: any) => {
    setQuantity(parseInt(event.target.value));
  }

  const getOfferInfo = async () => {
    const res = await http.get(`/offer/offer-detail/${offerId}`);
    const imageList = res.data.data.images.split(',')
    setOfferInfo(res.data.data);
    setImages(imageList);
  }

  const offerEnd = () => {
    const createdTime = dayjs();
    const expiratedAt = dayjs(offerInfo.expirated_at);
    const diffInDays = expiratedAt.diff(createdTime, 'day');
    return diffInDays + ' Days';
  }

  return (
    <>
      <div className="flex">
        <div className="flex border rounded-md p-4">
          <div className="w-[400px] h-[400px] mr-[1.5rem]">
            <img className="w-[400px] h-[400px] rounded-lg object-cover" src={images.length ? images[0] : ''} />
          </div>
          <div className="w-[580px] flex flex-col space-y-6">
            <div>
              <h2 className="text-[#6A6A6A]">{ offerInfo.collection.collection_en }</h2>
              <h1 className="text-[28px] font-bold">{ offerInfo.title }</h1>
            </div>
            <div className="flex items-center bg-[#F5F5F5] rounded-md p-4">
              <label className="text-[#6A6A6A] font-semibold mr-4">Price</label>
              <div className="font-semibold">$<span className="text-3xl">{ offerInfo.price }</span></div>
            </div>
            <ul className="flex text-center py-4 border-y border-dashed">
              <li className="flex-1">
                <div className="text-sm leading-8">{ offerInfo.collection.type ? offerType[offerInfo.collection.type] : 'OTHER' }</div>
                <div className="text-[#6A6A6A] text-xs">TYPES</div>
              </li>
              <li className="flex-1">
                <div className="text-sm leading-8">All Day</div>
                <div className="text-[#6A6A6A] text-xs">TIME</div>
              </li>
              <li className="flex-1">
                <div className="text-sm leading-8">{ offerEnd() }</div>
                <div className="text-[#6A6A6A] text-xs">OFFEREND</div>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <div className="text-[#6A6A6A] text-sm">Quantity</div>
              <div className="flex">
                <span className="h-[44px] leading-[44px] px-3 bg-[#F5F5F5] rounded-l-md cursor-pointer" onClick={ () => quantityChange(0) }>-</span>
                <Input onChange={inputChange} value={quantity} className="w-[70px] h-[44px] bg-[#F5F5F5] rounded-none" type="number" min={0} max={5} placeholder="1" />
                <span className="h-[44px] leading-[44px] px-3 bg-[#F5F5F5] rounded-r-md cursor-pointer" onClick={ () => quantityChange(1) }>+</span>
              </div>
              <div className="text-[#6A6A6A] text-sm">stock: { offerInfo.stock - offerInfo.sold_count }</div>
            </div>
            <ConfirmDialog orderInfo={{
              quantity: quantity,
              price: offerInfo.price,
              seller_address: offerInfo.seller.wallet_address,
            }} offerId={offerId} ><Button>Buy Now</Button></ConfirmDialog>
          </div>
        </div>
        <div className="border rounded-md p-4 w-[280px] flex flex-col items-center ml-[40px]">
          <div className="flex flex-col my-6">
            <img className="w-[100px] h-[100px] rounded-full" src="https://pbs.twimg.com/profile_images/1688387813270765568/TFtJQ40G_400x400.jpg" />
            <div className="leading-10">0x00......cBde</div>
            <div className="flex justify-center">
              <Icons.twitter className="h-5 w-5 fill-sky-400 stroke-sky-400" />
            </div>
          </div>
          <ul className="text-xs w-full">
            <li className="flex leading-8">
              <span className="flex-none text-[#6A6A6A] mr-[1rem]">卖家信誉</span>
              <span className="">普通卖家</span>
            </li>
            <li className="flex leading-8">
              <span className="flex-none text-[#6A6A6A] mr-[1rem]">卖家等级</span>
              <span className="">*****</span>
            </li>
          </ul>
          <ul className="flex text-center border-y border-dashed w-full mt-[30px] py-[10px]">
              <li className="flex-1">
                <div className="text-sm">23</div>
                <div className="text-[#6A6A6A] text-xs">ITEMS</div>
              </li>
              <li className="flex-1">
                <div className="text-sm">98.9%</div>
                <div className="text-[#6A6A6A] text-xs">TIME</div>
              </li>
            </ul>
        </div>
      </div>
      <div className="mt-8 border rounded-md">
        <CardTitle className="px-4 py-4 border-b bg-[#F6F6F6]">Description</CardTitle>
        <p className="text-[#6A6A6A] p-4">{ offerInfo.description }</p>
      </div>
      <div className="mt-8 border rounded-md">
        <CardTitle className="px-4 py-4 border-b bg-[#F6F6F6]">Transaction process</CardTitle>
        <img src="https://cdn.dribbble.com/users/14268/screenshots/5260798/media/e2c5b2861939c52a1cbf4e5c1577862d.png" />
      </div>
    </>
  )
}
