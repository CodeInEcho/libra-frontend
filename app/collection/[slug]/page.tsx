import http from "axios"
import Link from "next/link"
import { OfferListTable } from "./offer-list-table"
import { buttonVariants } from "@/components/ui/button"

const getCollectionInfo = async (slug: string) => {
  const res = await http.get(`http://localhost:3001/collection/collection-item/${slug}`);
  return res.data.data;
}

export default async function IndexPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const collectionInfo = await getCollectionInfo(slug)
  // console.log(collectionInfo)
  return (
    <section>
      <div style={{ background: `url("https://pbs.twimg.com/profile_banners/1502298045635268610/1687784148/1500x500") center center / cover no-repeat` }} className="h-[13.75rem]"></div>
      <div className="container relative top-[-3.75rem]">
        <div className="mb-[3rem]">
          <img src={collectionInfo.logo} className="w-[7.5rem] h-[7.5rem] border-2 border-[#E3E3E3] rounded-2xl mb-[1.5rem]"></img>
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold mb-[0.75rem]">{ collectionInfo.collection_cn }</h1>
            <div className="space-x-4">
              <Link
                target="_blank"
                rel="noreferrer"
                href={'/offerCreation'}
                className={buttonVariants()}>Sell</Link>
            </div>
          </div>
          <p className="text-base font-normal text-[#6A6A6A]">{ collectionInfo.description_cn }</p>
        </div>
        <OfferListTable slug={slug} />
      </div>
    </section>
  )
}
