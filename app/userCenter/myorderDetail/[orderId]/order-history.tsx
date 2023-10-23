import { Card, CardTitle,  CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { formatDate } from "@/lib/utils"
import { useMemo } from "react";

export function OrderHistory({ orderHistory, status }: any) {
  const computeTime = useMemo(() => {
    const cache: any = {};
    return (orderStatus: number) => {
      if (cache[orderStatus]) return cache[orderStatus];
      const history = orderHistory.find((item: any) => item.order_status === orderStatus);
      if (history) {
        cache[orderStatus] = formatDate(history.created_at);
        return formatDate(history.created_at);
      }
      return '';
    };
  }, [orderHistory]);

  return (
    <div className="ml-10 w-[25rem] self-start bg-[#F5F5F5] rounded-md">
      <CardHeader className="pb-3">
        <CardTitle>Order History</CardTitle>
        <div className="flex flex-col relative">
          <div className="absolute w-[2px] h-[85%] bg-black left-[15px] top-[20px]"></div>
          <div className="steps-item-container overflow-hidden flex-1 relative inline-block ps-0">
            <div className="inline-flex items-center space-x-2 py-4">
              <div className={`${status === 1 ? 'bg-black' : 'bg-white' } steps-item-icon z-10 flex items-center justify-center w-[2rem] h-[2rem] border border-2 border-black rounded-full`}>
                <Icons.check className={`${status === 1 ? 'text-white' : 'text-black' } w-[1rem] h-[1rem]`}/>
              </div>
              <div className="steps-item-content inline-block text-xs font-semibold">
                <div className="text-sm">Create Order</div>
                <div className="text-gray-400">{computeTime(1)}</div>
              </div>
            </div>
          </div>
          <div className="steps-item-container overflow-hidden flex-1 relative inline-block ps-0">
            <div className="inline-flex items-center space-x-2 py-4">
              <div className={`${status === 2 ? 'bg-black' : 'bg-white'} steps-item-icon z-10 flex items-center justify-center w-[2rem] h-[2rem] border border-2 border-black rounded-full`}>
                <Icons.check className={`${status === 2 ? 'text-white' : 'text-black' } w-[1rem] h-[1rem]`}/>
              </div>
              <div className="steps-item-content inline-block text-xs font-semibold">
                <div className="text-sm">Payment</div>
                <div className="text-gray-400">{computeTime(2)}</div>
              </div>
            </div>
          </div>
          <div className="steps-item-container overflow-hidden flex-1 relative inline-block ps-0">
            <div className="inline-flex items-center space-x-2 py-4">
              <div className={`${status === 3 ? 'bg-black' : 'bg-white'} steps-item-icon z-10 flex items-center justify-center w-[2rem] h-[2rem] border border-2 border-black rounded-full`}>
                <Icons.check className={`${status === 3 ? 'text-white' : 'text-black' } w-[1rem] h-[1rem]`}/>
              </div>
              <div className="steps-item-content inline-block text-xs font-semibold">
                <div className="text-sm">Confirm Delivery</div>
                <div className="text-gray-400">{computeTime(3)}</div>
              </div>
            </div>
          </div>
          <div className="steps-item-container overflow-hidden flex-1 relative inline-block ps-0">
            <div className="inline-flex items-center space-x-2 py-4">
              <div className={`${status === 4 ? 'bg-black' : 'bg-white'} steps-item-icon z-10 flex items-center justify-center w-[2rem] h-[2rem] border border-2 border-black rounded-full`}>
                <Icons.check className={`${status === 4 ? 'text-white' : 'text-black' } w-[1rem] h-[1rem]`}/>
              </div>
              <div className="steps-item-content inline-block text-xs font-semibold">
                <div className="text-sm">Confirm Receipt</div>
                <div className="text-gray-400">{computeTime(4)}</div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </div>
  )
}