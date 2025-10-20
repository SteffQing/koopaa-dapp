const IS_MAINNET = false;
const IS_PRODUCTION = true;

const MAINNET_USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const DEVNET_USDC = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr";

const USDC = IS_MAINNET ? MAINNET_USDC : DEVNET_USDC;
const DECIMALS = 10 ** 6;

const DEVELOPMENT_API_URL = "http://localhost:3000/api";
const PRODUCTION_API_URL = "https://app.koopaa.fun/api";
const BASE_API_URL = "https://c210932bee1d.ngrok-free.app/api"; // IS_PRODUCTION ? PRODUCTION_API_URL : DEVELOPMENT_API_URL;

const MAINNET_RPC_URL = "https://mainnet.helius-rpc.com";
const DEVNET_RPC_URL = "https://devnet.helius-rpc.com";

const RPC_KEY = "/?api-key=" + process.env.HELIUS_API_KEY;
const RPC_URL = IS_MAINNET ? MAINNET_RPC_URL : DEVNET_RPC_URL;
const SOLANA_RPC_URL = RPC_URL + RPC_KEY;

export { USDC, BASE_API_URL, DECIMALS, SOLANA_RPC_URL };
export { DEVNET_USDC, MAINNET_USDC };
