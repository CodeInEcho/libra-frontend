import Link from "next/link"
import http from '@/lib/request'
import Deliver from "@/components/deliver"
import { Star, Trash2 } from "lucide-react"
import { useRef, MutableRefObject } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { formatDate, abbreviateWalletAddress } from "@/lib/utils"
import { OrderAction } from "../myorderDetail/[orderId]/order-action"

const orderStatus: { [key: number]: string } = {
  1: 'Pending Payment',
  2: 'Processing',
  3: 'Shipped',
  4: 'Delivered',
  5: 'Cancelled',
  6: 'Returning',
  7: 'Returned',
}

const offerStatus: { [key: number]: string } = {
  1: 'Processing',
  2: 'Listed',
  3: 'Unlisted',
}

export type OrderInfo = {
  id: string
  title: string
  stock: number
  price: number
  offer: string
  image?: string
  status: string
  orderId: string
  order_at: string
  created_at: string
  sold_count: number
  quantity: number
  collection: {
    slug: string
    logo: string
    collection_cn: string
    collection_en: string
  }
  seller: {
    id: string
    wallet_address: string
  }
  buyer: {
    id: string
    wallet_address: string
  }
}

type OrderItemsType = {
  item: OrderInfo
  order_type: string
  labelValue: string
  onUpdate: () => void
}

export default function OrderItems({ item, order_type, labelValue, onUpdate }: OrderItemsType) {
  const { toast } = useToast()
  const childRef = useRef<any>(null);

  const delist = async () => {
    childRef.current?.changeloading(true);
    const res = await http.post(`/offer/delist`, { offer_id: item.id })
    .finally(() => {
      cancel(false);
    })
    toast({ duration: 2000, variant: "success", description: 'Delist Success' });
    onUpdate();
  }

  const uplist = async () => {
    childRef.current?.changeloading(true);
    const res = await http.post(`/offer/uplist`, { offer_id: item.id })
    .finally(() => {
      cancel(false);
    })
    toast({ duration: 2000, variant: "success", description: 'Uplist Success' });
    onUpdate();
  }

  const publishOffer = async () => {
    childRef.current?.changeloading(true);
    const res = await http.post(`/offer/admin-up-offer`, { offer_id: item.id })
    .finally(() => {
      cancel(false);
    })
    toast({ duration: 2000, variant: "success", description: 'publish Offer Success' });
    onUpdate();
  }

  const cancel = (val: boolean) => {
    childRef.current?.changeOpen(val);
    childRef.current?.changeloading(false);
  }

  const cancelOrder = async () => {
    childRef.current?.changeloading(true);
    await http.post(`${labelValue === '2' ? '/offer/recycle-offer' : '/order/recycle-order'} `, { [labelValue === '2' ? 'offer_id' : 'order_id']: item.id })
    .finally(() => {
      cancel(false);
    })
    toast({ duration: 2000, variant: "success", description: 'Delete Success' });
    onUpdate();
  }

  return (
    <div className="flex flex-col border rounded-md mb-6">
      <div className="flex items-center justify-between px-6 py-4 bg-[#F6F6F6] border-b">
        <div className="flex space-x-24 text-sm font-medium">
          <div className="flex flex-col">
            <span className="text-[#6A6A6A] leading-7">Create time</span>
            <span className="text-[#252525] leading-7">{ formatDate(item.order_at || item.created_at) }</span>
          </div>
          { labelValue === '2' && <div className="flex flex-col">
            <span className="text-[#6A6A6A] leading-7">Price</span>
            <span className="text-[#252525] leading-7">${ item.price }</span>
          </div> }
          { labelValue === '2' && <div className="flex flex-col">
            <span className="text-[#6A6A6A] leading-7">Stock</span>
            <span className="text-[#252525] leading-7">{ item.stock - item.sold_count }</span>
          </div> }
          { labelValue !== '2' && <div className="flex flex-col">
            <span className="text-[#6A6A6A] leading-7">quantity</span>
            <span className="text-[#252525] leading-7">{ item.quantity }</span>
          </div> }
          { labelValue !== '2' && <div className="flex flex-col">
            <span className="text-[#6A6A6A] leading-7">Total</span>
            <span className="text-[#252525] leading-7">${ item.price * item.quantity }</span>
          </div> }
          { labelValue !== '2' && <div className="flex flex-col">
            <span className="text-[#6A6A6A] leading-7">Seller</span>
            <span className="text-[#252525] leading-7">{ abbreviateWalletAddress(item.seller.wallet_address) }</span>
          </div> }
          <div className="flex flex-col">
            <span className="text-[#6A6A6A] leading-7">Colletion</span>
            <span className="text-[#252525] leading-7">{ item.collection.collection_cn }</span>
          </div>
        </div>
        <div className="text-sm font-medium text-[#6A6A6A]">{ labelValue === '2' ? `Offer ID` : 'Order ID' }：<span className='text-[#252525]'>{ item.id }</span></div>
      </div>
      <div className='flex items-center justify-between px-6 py-4'>
        <div className="flex items-center space-x-4">
          <img className='w-[5rem] h-[5rem] bg-[#eee] object-cover rounded-md' src={item.collection.logo} />
          <div className='flex flex-col'>
            <h2 className='font-semibold leading-8'>{ item.title }</h2>
            { labelValue !== '2' &&
              <div className='leading-[3.2rem] space-x-2'>
                <Link href={`/userCenter/myorderDetail/${item.id}`} rel="noreferrer" className={buttonVariants({ size: 'sm' })}>View Order</Link>
                <OrderAction onUpdate={onUpdate} orderInfo={{
                  id: item.id,
                  price: item.price,
                  status: item.status,
                  quantity: item.quantity,
                  buyer_id: item.buyer.id,
                  seller_id: item.seller.id,
                  buyer_address: item.buyer.wallet_address,
                  seller_address: item.seller.wallet_address,
                }}/>
                <Button size="sm" variant="outline">···</Button>
              </div>
            }
            {
              labelValue === '2' &&
              <div className='leading-[3.2rem] space-x-2'>
                <Link href={`/collection/${item.collection.slug}/${item.id}`} rel="noreferrer" className={buttonVariants({ size: 'sm' })}>View Offer</Link>
                { item.status === "Pending" && 
                  <Deliver
                  cRef={childRef}
                  confirm={publishOffer}
                  title="Are you sure to publish?"
                  description="">
                    <div className={buttonVariants({ size: "sm" })}>Publish Offer</div>
                  </Deliver>
                }
                { item.status === "Listed" && 
                  <Deliver
                  cRef={childRef}
                  confirm={delist}
                  title="Are you sure to Delist?"
                  description="">
                    <div className={buttonVariants({ size: "sm" })}>Delist</div>
                  </Deliver>
                }
                { item.status === "Unlisted" && 
                  <Deliver
                  cRef={childRef}
                  confirm={uplist}
                  title="Are you sure to Uplist?"
                  description="">
                    <div className={buttonVariants({ size: "sm" })}>Uplist</div>
                  </Deliver>
                }
                <Button size="sm" variant="outline">···</Button>
              </div>
            }
          </div>
        </div>
        <div className='flex space-x-4'>
          <span className='text-[#03954F] font-medium'>{item.status}</span>
          {/* <Star className='text-[#BDBDBD] w-[20px] cursor-pointer'/> */}
          <Deliver
          cRef={childRef}
          confirm={cancelOrder}
          title="Are you sure delete this order?"
          description="">
            <Trash2 className='text-[#BDBDBD] w-[20px] cursor-pointer'/>
          </Deliver>
        </div>
      </div>
    </div>
  )
}