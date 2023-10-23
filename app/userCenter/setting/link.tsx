"use client"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { UserInfo } from '@/types/user'
import { updateUserInfo } from '@/app/api/user'
import { Button } from "@/components/ui/button"
import { TwitterLogoIcon, DiscordLogoIcon } from "@radix-ui/react-icons"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Link({ session }: { session: any }) {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  
  useEffect(() => {
    if (session) updateInfo();
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) setUserInfo(JSON.parse(userInfo));
  }, [session])

  const updateInfo = async () => {
    const { user } = session;
    const auth = searchParams.get('auth');
    if (auth === 'success') {
      await updateUserInfo(user);
      router.replace(pathname);
    }
  }

  return (
    <>
      <div className="font-medium">Social Accounts</div>
      <div className="text-sm text-slate-400">Each social account can only be tied to one account to prevent abuse.</div>
      <div className="space-x-4 mt-4">
        <Button  className="bg-sky-400" onClick={(e) => { signIn('twitter') }}>
          <TwitterLogoIcon className="mr-2 h-4 w-4" />{ userInfo && userInfo.twitter ? userInfo.twitter : `Connet Twitter` }
        </Button>
        <Button  className="bg-indigo-500" onClick={(e) => { signIn('discord') }}>
          <DiscordLogoIcon className="mr-2 h-4 w-4" />{ userInfo && userInfo.discord ? userInfo.discord : `Connet Discord` } 
        </Button>
      </div>
    </>
  )
}