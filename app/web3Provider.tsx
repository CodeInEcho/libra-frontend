'use client'
import http from "@/lib/request"
import { SiweMessage } from 'siwe'
import { setCookie } from 'cookies-next'
import { siteConfig } from '@/config/site'
import { setAccessToken } from '@/lib/token'
import { FC, PropsWithChildren } from 'react'
import { WagmiConfig, createConfig } from 'wagmi'
import { mainnet, optimism, arbitrum, sepolia, base } from "wagmi/chains";
import { ConnectKitProvider, SIWEConfig, SIWEProvider, getDefaultConfig } from 'connectkit'

const chains = [mainnet, optimism, arbitrum, sepolia, base];

const config = createConfig(
	getDefaultConfig({
    chains,
		appName: siteConfig.name,
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
	})
)

const siweConfig = {
	getNonce: async () => {
		const res = await fetch(`http://localhost:3001/auth/nonce`, { method: 'GET', credentials: 'include', })
		if (!res.ok) throw new Error('Failed to fetch SIWE nonce')
    const { data } = await res.json()
    sessionStorage.setItem('nonce', data)
		return data
	},
	createMessage: ({ nonce, address, chainId }) => {
		return new SiweMessage({
			nonce,
			chainId,
			address,
			version: '1',
			uri: window.location.origin,
			domain: window.location.host,
			statement: 'Sign In With Ethereum to prove you control this wallet.',
		}).prepareMessage()
	},
	verifyMessage: ({ message, signature }) => {
    const nonce = sessionStorage.getItem('nonce')
		return fetch(`http://localhost:3001/auth/verify`, {
			method: 'POST',
      credentials: 'include',
			body: JSON.stringify({ message, signature, nonce }),
			headers: { 'Content-Type': 'application/json' },
		}).then(async res => {
      const { data } = await res.json()
      if (data && data.access_token) {
        setAccessToken(data.access_token)
        setCookie('refresh_token', data.refresh_token)
        return res.ok
      } else {
        return false
      }
    })
	},
	getSession: async () => {
    try {
      const { data } = await http.post("/auth/session");
      if (data && data.data) localStorage.setItem('userInfo', JSON.stringify(data.data));
      return data && data.data.address && data.data.chainId ? { address: data.data.address, userId: data.data.userId, chainId: data.data.chainId } : null;
    } catch (error) {
      return null;
    }
	},
	signOut: () => {
    return new Promise((resolve) => {
      setAccessToken(null)
      setCookie('refresh_token', null)
      resolve(true)
    });
  },
} satisfies SIWEConfig

const Web3Provider: FC<PropsWithChildren<{}>> = ({ children }) => (
	<WagmiConfig config={config}>
		<SIWEProvider {...siweConfig}>
			<ConnectKitProvider>{children}</ConnectKitProvider>
		</SIWEProvider>
	</WagmiConfig>
)

export default Web3Provider