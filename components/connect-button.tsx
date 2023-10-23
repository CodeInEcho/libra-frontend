"use client"
import { useAccount } from 'wagmi'
import { setCookie } from 'cookies-next'
import { setAccessToken } from '@/lib/token'
import { ConnectKitButton } from 'connectkit'

export function ConnectButton() {
  const { isDisconnected } = useAccount()
  if (isDisconnected) {
    setAccessToken(null)
    setCookie('refresh_token', null)
  }
  return (
    <ConnectKitButton />
  )
}
