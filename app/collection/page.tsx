import http from "@/lib/request"
import Link from "next/link"

const getCollectionInfo = async () => {
    const res = await http.get(`/collection/collection-list`);
    return res.data.data;
}

export default async function CollectionLayout() {
    const collectionInfo = await getCollectionInfo();

    return (
        <div className="container px-4 py-8 bg-slate-50 flex flex-wrap">
        { collectionInfo && collectionInfo.map((item: any) => (
            <div className="card-item w-[12.5%] px-4 mb-8">
                <Link href={`/collection/${item.slug}`} className="bg-white flex flex-col items-center rounded-md px-[1.25rem] py-[1rem] w-full transition-all hover:scale-110 hover:shadow-md hover:shadow-gray-400/15">
                    <i><img className="object-cover rounded-2xl w-[5rem] h-[5rem]" width={80} height={80} src={item.logo} /></i>
                    <strong className="block text-ellipsis overflow-hidden whitespace-nowrap text-sm text-[#666] leading-8 mt-2">{item.collection_en}</strong>
                    <div className="text-xs text-[#ccc]">{item.fees_ratio} item</div>
                </Link>
            </div>
        )) }
        </div>
    )
}
