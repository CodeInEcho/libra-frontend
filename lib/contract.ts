import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const transport = http('https://sepolia.infura.io/v3/1d05bfb35c594516a9ac950f7f871d96')

export const publicClient = createPublicClient({
  chain: mainnet,
  transport,
})

export const walletClient = createWalletClient({
  chain: mainnet,
  transport,
})

// JSON-RPC Account
// export const [account] = await walletClient.getAddresses()
// Local Account
// export const account = privateKeyToAccount(...)