# 🪙 KooPaa

**KooPaa** is a decentralized group savings platform built on **Solana**, inspired by traditional Ajo thrift systems. It enables trustless, rotating savings and credit associations (ROSCAs), where participants contribute and receive payouts in a scheduled, verifiable manner.

> Empowering communities to save together, transparently.

---

## 🚀 Features

- 📆 **Create & manage Ajo groups** with fixed contribution amounts and durations
- 🧑‍🤝‍🧑 **Join groups** and contribute using your Solana wallet
- 🔁 **Automated payouts** on a rotating schedule
- ⏳ **Contribution tracking** with real-time updates
- 🔐 **Secure vaults** per group via Solana PDAs
- 📲 **Mobile-first UI** with wallet support
- 🧠 **Smart program** built with Anchor for safety and performance

---

## 🛠️ Tech Stack

| Layer          | Tools                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Smart Contract | [Solana](https://solana.com/), [Anchor](https://book.anchor-lang.com/)                                                    |
| Frontend       | [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| Wallet         | [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)                                                    |
| Database       | [Neon PostgreSQL](https://neon.tech/), [Prisma](https://www.prisma.io/)                                                   |
| Deployment     | [Vercel](https://vercel.com/)                                                                                             |

---

## 📦 Installation

```bash
git clone https://github.com/steffqing/koopaa-dapp.git
cd koopaa-dapp
npm install
```

### 🔐 Environment Variables

Create a `.env` file based on `.env.example` and fill in the required keys

---

## 🧪 Running Locally

### Dev Server

```bash
npm run dev
```

App will be running at `http://localhost:3000`.

## 🧱 Smart Contract

The `Anchor` program handles:

- Group creation
- Joining and verifying group rules
- Contributions and scheduling payouts
- Vault PDA derivation
- Refunds on group closure

Program ID: `33NAzyKNuayyqKNW6QMXbNT69CikAhCUhPbgwZn1LR3o` (On Solana Devnet)

---

## 👥 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 🤝 Credits

Built with ❤️ by [@steffqing](https://github.com/steffqing) and contributors.
Design inspiration drawn from local Ajo systems and Web3 UX best practices.

---

## 📄 License

MIT © 2025 KooPaa Team
