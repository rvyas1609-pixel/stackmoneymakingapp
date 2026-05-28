# STACK Multi-Chain Direct Wallet Payment Guide

We have implemented a **Multi-Chain Direct Wallet Payment** system. Users can choose their preferred network to pay for their STACK membership.

## 1. Configure Your Wallets
Update your `.env.local` with your public wallet addresses for each supported network:

```env
# Multi-Chain Direct Wallets
NEXT_PUBLIC_WALLET_SOL="A6J3diQzGfGFtGhwX2mnY2UMjbj571m8zvgv6Nc1LW9A"
NEXT_PUBLIC_WALLET_ETH="0xe8BD02dD2D361E0F189DC3607677758AA4d7D7c4"
NEXT_PUBLIC_WALLET_BTC="bc1p04xmaq3y4e9vff5llfpghvkgrygkav4tfxzm4qfw6gfsn6rssg2qudlcfq"
NEXT_PUBLIC_WALLET_BASE="0xe8BD02dD2D361E0F189DC3607677758AA4d7D7c4"
```

## 2. Supported Networks
- **Solana (SOL)**: Fast and low fees.
- **Ethereum (ETH/USDT)**: Standard ERC20.
- **Bitcoin (BTC)**: Native BTC.
- **Base (ETH/USDC)**: Low-fee L2.

## 3. How the Flow Works
1.  **Selection**: User selects a plan and then chooses their preferred network in the payment modal.
2.  **Payment**: The modal displays the specific address for the chosen network.
3.  **Submission**: User pastes the **Transaction Hash (TXID)** and submits.
4.  **Backend**: The app saves the submission with `paymentProvider` set to `manual_wallet_[NetworkName]`.

## 4. How to Verify & Activate Users
1.  Open Prisma Studio: `npx prisma studio`.
2.  Go to the **Subscription** table.
3.  Filter by `status: "pending_verification"`.
4.  Check the `paymentProvider` to see which chain was used (e.g., `manual_wallet_Solana`).
5.  Verify the `paymentId` (TXID) on the corresponding explorer (Solscan, Etherscan, Blockchain.com, Basescan).
6.  Once verified, change `status` to `"active"`.

---

**Multi-chain leverage. Global access.** 🚀
