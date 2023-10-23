"use client"
import Link from "next/link"
import Image from "next/image"
import http from "@/lib/request"
import { columns } from "./columns"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "../components/data-table"
import { buttonVariants, Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IndexPage() {
  const [collectionList, setCollectionList] = useState([]);
  useEffect(() => {
    getCollectionList();
  }, [])

  const getCollectionList = async () => {
    const res = await http.get('/collection/collection-list');
    setCollectionList(res.data.data);
  }
  const trendList = [{
    image: 'https://polkastarter.gg/_next/image/?url=https%3A%2F%2Fassets.polkastarter.gg%2Fbithotel_cover_285febc394%2Fbithotel_cover_285febc394.jpg&w=1080&q=80',
    title: 'a KID called BEAST',
    floorPrice: '80',
    percentage: 20
  },{
    image: 'https://polkastarter.gg/_next/image/?url=https%3A%2F%2Fassets.polkastarter.gg%2F7_Slide_16_9_58_00c1462b87%2F7_Slide_16_9_58_00c1462b87.png&w=1080&q=80',
    title: 'CLONE X',
    floorPrice: '150',
    percentage: 4
  },{
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/genshin-impact-packshot-01-cht-28jun21?$1600px$',
    title: 'Genshin',
    floorPrice: '30',
    percentage: 8
  },{
    image: 'https://polkastarter.gg/_next/image/?url=https%3A%2F%2Fassets.polkastarter.gg%2Fabyss_world_cover_5fc13e3bc5%2Fabyss_world_cover_5fc13e3bc5.jpg&w=1080&q=80',
    title: 'The Unfettered',
    floorPrice: '59',
    percentage: -10
  }]

  const trendList2 = [{
    image: 'https://polkastarter.gg/_next/image/?url=https%3A%2F%2Fassets.polkastarter.gg%2Fbithotel_cover_285febc394%2Fbithotel_cover_285febc394.jpg&w=1080&q=80',
    title: 'a KID called BEAST',
    floorPrice: '80',
    percentage: -30
  },{
    image: 'https://polkastarter.gg/_next/image/?url=https%3A%2F%2Fassets.polkastarter.gg%2F7_Slide_16_9_58_00c1462b87%2F7_Slide_16_9_58_00c1462b87.png&w=1080&q=80',
    title: 'CLONE X',
    floorPrice: '150',
    percentage: -2
  },{
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/genshin-impact-packshot-01-cht-28jun21?$1600px$',
    title: 'Genshin',
    floorPrice: '200',
    percentage: 2
  },{
    image: 'https://polkastarter.gg/_next/image/?url=https%3A%2F%2Fassets.polkastarter.gg%2Fabyss_world_cover_5fc13e3bc5%2Fabyss_world_cover_5fc13e3bc5.jpg&w=1080&q=80',
    title: 'The Unfettered',
    floorPrice: '59',
    percentage: 4
  },{
    image: 'https://polkastarter.gg/_next/image/?url=https%3A%2F%2Fassets.polkastarter.gg%2Fabyss_world_cover_5fc13e3bc5%2Fabyss_world_cover_5fc13e3bc5.jpg&w=1080&q=80',
    title: 'The Unfettered',
    floorPrice: '123',
    percentage: 0
  }]

  return (
    <>
      <div className="h-[550px] relative flex items-center">
        <div className="absolute top-0 right-0 z-[-1] w-[30rem] h-[30rem] opacity-20 bg-gradient-to-tr from-blue-400 via-green-400 to-yellow-300 blur-[6.25rem]"></div>
        <div className="absolute left-0 bottom-[10px] z-[-1] w-[24rem] h-[24rem] opacity-20 bg-gradient-to-tr from-blue-400 to-red-400 blur-[80px]"></div>
        <div className="container">
          <div className="w-[40rem]">
            <div className="text-6xl font-semibold leading-[4.375rem]">Buy and Sell you want Anything</div>
            <div className="space-x-4 py-10">
              <Link href={''} rel="noreferrer" className={buttonVariants()}>Sell more</Link>
              <Link href={''} rel="noreferrer" className={buttonVariants({ variant: "secondary" })}>Explor more</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex space-x-4 relative top-[-3.75rem]">
        {trendList && trendList.map((collection, index) => (
          <div key={index} className="w-[20rem] h-[20rem] rounded-2xl"
          style={{ background: `url("${collection.image}") center center / cover no-repeat`}}>
            <div className="block w-full h-full rounded-2xl" style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, rgba(0, 0, 0, 0.70) 99.85%` }}>
              <div className="text-white px-4 absolute bottom-[14px]">
                <h2 className="text-base font-semibold leading-7">{collection.title}</h2>
                <p className="text-xs font-normal">FLOOR: ${collection.floorPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container pb-6">
        <Tabs>
          <TabsList>
            <TabsTrigger value="buy">Terding</TabsTrigger>
            <TabsTrigger value="sell">Top Collections</TabsTrigger>
          </TabsList>
        </Tabs>
        <ul className="flex space-x-8 mt-[1.5rem]">
          <div className="flex-1">
            <li className="flex items-center justify-between text-xs text-[#6A6A6A] font-normal py-[0.625rem]">
              <div className="flex items-center">
                <div className="w-[2rem] mr-[1.75rem] text-center">#</div>
                <div className="">COLLECTION</div>
              </div>
              <div className="w-[12.5rem] flex">
                <span className="flex-1 text-center">FLOOR PRICE</span>
                <span className="flex-1 text-center">FLOOR CHANGE</span>
              </div>
            </li>
            {trendList2 && trendList2.map((collection, index) => (
              <li key={index} className="flex py-[0.75rem] items-center justify-between">
                <div className="flex items-center">
                  <div className="w-[2rem] h-[2rem] mr-[1.75rem] rounded-2xl bg-gray-100 flex items-center justify-center text-sm text-[#6A6A6A] font-semibold">{ index + 1 }</div>
                  <Link href={`/collection/${collection.slug}`} className="flex items-center">
                    <img className="w-[3rem] h-[3rem] rounded-xl mr-4 border object-cover" width={48} height={48} src={collection.image} alt="logo"></img>
                    <h2 className="text-base font-semibold">{collection.title}</h2>
                  </Link>
                </div>
                <div className="bg-[#F5F5F5] rounded-xl flex px-4 w-[12.5rem] justify-items-center">
                  <div className="flex justify-items-center items-center flex-1 py-2 text-xs text-[#A4A4A4] border-r-[1px] border-[#E3E3E3]">
                    <b className="text-base text-[#252525] mr-2">{collection.floorPrice}</b>USDT
                  </div>
                  <div className={`text-center flex-1 text-base py-2 font-medium ${collection.percentage > 0 ? 'text-[#0E9766]' : 'text-[#E31B1B]'}`}>{ collection.percentage > 0 ? '+' : '' }{collection.percentage}%</div>
                </div>
              </li>
            ))}
          </div>
          <div className="flex-1">
            <li className="flex items-center justify-between text-xs text-[#6A6A6A] font-normal py-[10px]">
              <div className="flex items-center">
                <div className="w-[2rem] mr-[1.75rem] text-center">#</div>
                <div className="">COLLECTION</div>
              </div>
              <div className="w-[200px] flex">
                <span className="flex-1 text-center">FLOOR PRICE</span>
                <span className="flex-1 text-center">FLOOR CHANGE</span>
              </div>
            </li>
            {collectionList && collectionList.map((collection, index) => (
              <li key={index} className="flex py-[0.75rem] items-center justify-between">
                <div className="flex items-center">
                  <div className="w-[2rem] h-[2rem] mr-[1.75rem] rounded-2xl bg-gray-100 flex items-center justify-center text-sm text-[#6A6A6A] font-semibold">{ index + 6 }</div>
                  <Link href={`/collection/${collection.slug}`} className="flex items-center">
                    <img className="w-[3rem] h-[3rem] rounded-xl mr-4 border object-cover" width={48} height={48} src={collection.logo} alt="logo"></img>
                    <h2 className="text-base font-semibold">{collection.collection_en}</h2>
                  </Link>
                </div>
                <div className="bg-[#F5F5F5] rounded-xl flex px-4 w-[200px] justify-items-center">
                  <div className="flex justify-items-center items-center flex-1 py-2 text-xs text-[#A4A4A4] border-r-[1px] border-[#E3E3E3]">
                    <b className="text-base text-[#252525] mr-2">{collection.floorPrice || 0}</b>USDT
                  </div>
                  <div className={`text-center flex-1 text-base py-2 font-medium ${collection.percentage > 0 ? 'text-[#0E9766]' : 'text-[#E31B1B]'}`}>{ collection.percentage > 0 ? '+' : '' }{collection.percentage || 0}%</div>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  )
}
