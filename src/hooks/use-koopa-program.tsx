'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BN } from '@coral-xyz/anchor'
import { Cluster, PublicKey, SystemProgram } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token'
import { useCallback, useMemo } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../provider/solana'
import { getKoopaProgram } from '@/lib/solana/koopa-exports'
import { getKoopaProgramId } from '@/lib/solana/koopa-exports'

export default function useKoopaProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const provider = useAnchorProvider()

  const programId = useMemo(() => getKoopaProgramId(), [cluster])
  const program = useMemo(() => getKoopaProgram(provider, programId), [provider, programId])

  console.log({ programId: programId.toString() })
  // Default USDC token on Solana (adjust for testnet/devnet as needed)
  const USDC_MINT = useMemo(() => {
    if (cluster.network === 'mainnet-beta') {
      return new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') // Mainnet USDC
    } else {
      return new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU') // Devnet USDC
    }
  }, [cluster.network])

  // Find PDA for global state
  const [globalStatePDA] = useMemo(
    () => PublicKey.findProgramAddressSync([Buffer.from('global-state')], programId),
    [programId],
  )

  // Find PDA for an Ajo group
  const findAjoGroupPDA = useCallback(
    (name: string) => {
      return PublicKey.findProgramAddressSync([Buffer.from('ajo-group'), Buffer.from(name)], programId)
    },
    [programId],
  )

  // Query for global state
  const globalState = useQuery({
    queryKey: ['globalState', programId.toString()],
    queryFn: async () => {
      try {
        const state = await program.account.globalState.fetch(globalStatePDA)
        return {
          totalGroups: BigInt(state.totalGroups.toString()),
          totalRevenue: BigInt(state.totalRevenue.toString()),
          activeGroups: BigInt(state.activeGroups.toString()),
          completedGroups: BigInt(state.completedGroups.toString()),
          admin: state.admin,
          feePercentage: state.feePercentage,
          bumps: state.bumps,
        } as GlobalState
      } catch (error) {
        console.error('Error fetching global state:', error)
        return null
      }
    },
    enabled: !!program && !!connection.commitment,
  })

  // Initialize the global state
  const initialize = useMutation({
    mutationFn: async (params: InitializeParams) => {
      if (!core.userPublicKey) throw new Error('Wallet not connected')

      const { feePercentage } = params

      try {
        console.log('Initializing global state with fee percentage:', feePercentage)

        // Using the direct Anchor pattern as shown in your example
        const signature = await core.program.methods
          .initialize(feePercentage)
          .accounts({
            //@ts-expect-error: unknown type mismatch, couldnt fig out, though it works
            globalState: core.globalStatePDA,
            admin: core.userPublicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        // Show toast notification
        transactionToast(signature)

        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['globalState'] })

        return { signature }
      } catch (error) {
        console.error('Error initializing global state:', error)
        throw error
      }
    },
  })

  // Create a new Ajo group
  const createAjoGroup = useMutation({
    mutationFn: async (params: CreateAjoGroupParams) => {
      if (!core.userPublicKey) throw new Error('Wallet not connected')

      const { name, contributionAmount, intervalInDays, numParticipants, tokenMint } = params

      // Find the PDA for the Ajo group
      const [ajoGroupPDA] = core.findAjoGroupPDA(name)

      try {
        console.log('Creating Ajo group:', {
          name,
          contributionAmount,
          intervalInDays,
          numParticipants,
          tokenMint: tokenMint.toString(),
        })

        // Using the direct Anchor pattern
        const signature = await core.program.methods
          .createAjoGroup(name, new BN(contributionAmount), intervalInDays, numParticipants)
          .accounts({
            //@ts-expect-error: unknown type mismatch, couldnt fig out, though it works
            ajoGroup: ajoGroupPDA,
            creator: core.userPublicKey,
            globalState: core.globalStatePDA,
            tokenMint,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        // Show toast notification
        transactionToast(signature)

        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['allAjoGroups'] })
        queryClient.invalidateQueries({ queryKey: ['userCreatedAjoGroups'] })

        return { signature, ajoGroupPDA }
      } catch (error) {
        console.error('Error creating Ajo group:', error)
        throw error
      }
    },
  })

  // Join an existing Ajo group
  const joinAjoGroup = useMutation({
    mutationFn: async (params: JoinAjoGroupParams) => {
      if (!core.userPublicKey) throw new Error('Wallet not connected')

      const { ajoGroup } = params

      try {
        console.log('Joining Ajo group:', ajoGroup.toString())

        // Using the direct Anchor pattern
        const signature = await core.program.methods
          .joinAjoGroup()
          .accounts({
            ajoGroup,
            participant: core.userPublicKey,
            //@ts-expect-error: unknown type mismatch, couldnt fig out, though it works
            systemProgram: SystemProgram.programId,
          })
          .rpc()

        // Show toast notification
        transactionToast(signature)

        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['ajoGroup', ajoGroup.toString()] })
        queryClient.invalidateQueries({ queryKey: ['userAjoGroups'] })

        return { signature }
      } catch (error) {
        console.error('Error joining Ajo group:', error)
        throw error
      }
    },
  })
}

// Define types for our hook
export interface AjoParticipant {
  pubkey: PublicKey
  turnNumber: number
  claimTime: number
  claimed: boolean
  claimRound: number
  roundsContributed: number[]
  claimAmount: bigint
  bump: number
}

export interface AjoGroup {
  name: string
  contributionAmount: bigint
  intervalInDays: number
  numParticipants: number
  creator: PublicKey
  participants: AjoParticipant[]
  currentRound: number
  currentReceiverIndex: number
  started: boolean
  completed: boolean
  totalDistributed: bigint
  lastRoundTimestamp: number
  bumps: number
  publicKey: PublicKey
}

export interface GlobalState {
  totalGroups: bigint
  totalRevenue: bigint
  activeGroups: bigint
  completedGroups: bigint
  admin: PublicKey
  feePercentage: number
  bumps: number
}
