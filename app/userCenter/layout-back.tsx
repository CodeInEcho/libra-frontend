import "@/styles/globals.css"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

interface UserCenterLayout {
  children: React.ReactNode
}

export default function UserCenterLayout({ children }: UserCenterLayout) {
  return (
    <div className="flex container">
      {/* <div className="flex-1">{children}</div> */}
      {/* <Card className="ml-6 px-7 py-6 w-[16rem] self-start">
        <Icons.mails className="h-8 w-8 mb-3" />
        <h2 className="text-xl font-semibold">Send Us a Message</h2>
        <p className="text-sm text-slate-500 mt-1">If you unable to find anplease describe your issolutions within the nex</p>
        <Button className="text-sm rounded-[10px] mt-3">Send Message</Button>
      </Card> */}
    </div>
  )
}
