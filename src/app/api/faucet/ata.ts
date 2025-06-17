import
{
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddressSync,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import
{
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const FAUCET_PRIVATE_KEY = process.env.FAUCET_PRIVATE_KEY;
const USDC = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

if (!FAUCET_PRIVATE_KEY) throw new Error("FAUCET_PRIVATE_KEY not found!");
function keypairFromBase58(): Keypair
{
    const secretKey = bs58.decode(FAUCET_PRIVATE_KEY!);
    return Keypair.fromSecretKey(secretKey);
}

async function getOrCreateATA(recipient: PublicKey)
{
    const ata = getAssociatedTokenAddressSync(USDC, recipient);
    const payer = keypairFromBase58();

    const accountInfo = await connection.getAccountInfo(ata);
    if (accountInfo === null) {
        const createAtaIx = createAssociatedTokenAccountInstruction(
            payer.publicKey,
            ata,
            recipient,
            USDC,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const tx = new Transaction().add(createAtaIx);
        await sendAndConfirmTransaction(connection, tx, [payer]);
    }

    // return ata;
}

export default getOrCreateATA