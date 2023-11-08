import http from "axios"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { OfferListTable } from "./offer-list-table"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"

const getCollectionInfo = async (slug: string) => {
    const res = await http.get(`http://localhost:3001/collection/collection-item/${slug}`);
    return res.data.data;
}

const hasSocialLink = (collectionInfo: any) => {
    return collectionInfo.website_url || collectionInfo.twitter_url || collectionInfo.discord_url || collectionInfo.contract_url;
}

export default async function IndexPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const collectionInfo = await getCollectionInfo(slug);

    return (
        <section>
            <div style={{ background: `url("${collectionInfo.banner}") center center / cover no-repeat` }} className="h-[25rem] relative flex justify-center">
                <div className="container absolute bottom-0 z-10 pb-10">
                    <img src={collectionInfo.logo} className="w-[7.5rem] h-[7.5rem] border-2 border-[#E3E3E3] rounded-2xl mb-[1.5rem]"></img>
                    <div className="flex justify-between text-white">
                        <div>
                            <div className="flex items-center mb-[0.75rem]">
                                <h1 className="text-3xl font-semibold">{collectionInfo.collection_cn}</h1>
                                { collectionInfo.is_official && <Icons.verify className="h-6 w-6 text-[#2461fc] ml-2" /> }
                                { hasSocialLink(collectionInfo) && (<Separator className="mx-3 h-6" orientation="vertical" /> )}
                                <div className="flex space-x-4">
                                    { collectionInfo.website_url && <Link href={collectionInfo.website_url} target="_blank">
                                        <Icons.webSite className="h-5 w-5 shrink-0" />
                                    </Link> }
                                    { collectionInfo.twitter_url && <Link href={collectionInfo.twitter_url} target="_blank">
                                        <Icons.twitter_full className="h-5 w-5 shrink-0" />
                                    </Link> }
                                    { collectionInfo.discord_url && <Link href={collectionInfo.discord_url} target="_blank">
                                        <Icons.discord className="h-5 w-5 shrink-0" />
                                    </Link> }
                                    { collectionInfo.contract_url && <Link href={collectionInfo.contract_url} target="_blank">
                                        <Icons.etherscan className="h-4 w-4 shrink-0" />
                                    </Link> }
                                </div>
                            </div>
                            <p className="text-base font-normal text-white">{collectionInfo.description_cn}</p>
                        </div>
                        <div className="space-x-4">
                            <Link
                                target="_blank"
                                rel="noreferrer"
                                href={'/offerCreation'}
                                className={buttonVariants({ variant: "secondary" })}>Sell</Link>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-b from-transparent to-black w-full h-full absolute top-0 left-0"></div>
            </div>
            <div className="container mt-10">
                <OfferListTable slug={slug} />
            </div>
        </section>
    )
}
