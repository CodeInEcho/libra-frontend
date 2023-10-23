import "@/styles/globals.css"
import { Metadata } from "next"
import { 
  Card, 
} from "@/components/ui/card"

interface AboutLayout {
  children: React.ReactNode
}

export default function AboutLayout({ children }: AboutLayout) {
  return (
    <div className="flex container">
      <div>{children}</div>
      <Card className="ml-6 px-5 py-4 w-[15rem]">asdasd</Card>
    </div>
  )
}
