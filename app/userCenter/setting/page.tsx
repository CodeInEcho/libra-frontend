import Link from './link'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function SettingPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="my-6">
        <Link session={session}/>
      </div>
    </div>
  )
}