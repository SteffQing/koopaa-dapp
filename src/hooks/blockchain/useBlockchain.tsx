'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BN } from '@coral-xyz/anchor'
import { Cluster, PublicKey, SystemProgram } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token'
import { useCallback, useMemo } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getKoopaProgram } from '@/lib/solana/koopa-exports'
import { getKoopaProgramId } from '@/lib/solana/koopa-exports'
import { useCluster } from '@/components/cluster/cluster-data-access'
import { useAnchorProvider } from '@/providers/solana-provider'
import { useTransactionToast } from '../use-transaction-toast'
import { CreateAjoGroupParams, GlobalState, JoinAjoGroupParams } from './types'

export default function useKoopaProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const provider = useAnchorProvider()
  const transactionToast = useTransactionToast()
  const queryClient = useQueryClient()
  const { publicKey: userPublicKey } = useWallet()

  const programId = useMemo(() => getKoopaProgramId(), [cluster])
  const program = useMemo(() => getKoopaProgram(provider, programId), [provider, programId])

  const [globalStatePDA] = useMemo(
    () => PublicKey.findProgramAddressSync([Buffer.from('global-state')], programId),
    [programId],
  )

  const findAjoGroupPDA = useCallback(
    (name: string) => {
      return PublicKey.findProgramAddressSync([Buffer.from('ajo-group'), Buffer.from(name)], programId)
    },
    [programId],
  )

  console.log({ programId: programId.toString() })
  // Default USDC token on Solana (adjust for testnet/devnet as needed)
  const USDC_MINT = useMemo(() => {
    if (cluster.network === 'mainnet-beta') {
      return new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') // Mainnet USDC
    } else {
      return new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU') // Devnet USDC
    }
  }, [cluster.network])

  // Query for global state
  const globalState = useQuery({
    queryKey: ['globalState', programId.toString()],
    queryFn: async () => {
      try {
        const state = await program.account.globalState.fetch(globalStatePDA)
        return {
          totalGroups: BigInt(state.totalGroups.toString()),
          activeGroups: BigInt(state.activeGroups.toString()),
          bumps: state.bumps,
        } as GlobalState
      } catch (error) {
        console.error('Error fetching global state:', error)
        return null
      }
    },
    enabled: !!connection.commitment,
  })

  // Initialize the global state
  const initialize = useMutation({
    mutationFn: async () => {
      if (!userPublicKey) throw new Error('Wallet not connected')

      try {
        // Using the direct Anchor pattern as shown in your example
        const signature = await program.methods
          .initialize()
          .accounts({
            //@ts-expect-error: unknown type mismatch, couldnt fig out, though it works
            globalState: globalStatePDA,
            admin: userPublicKey,
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
      if (!userPublicKey) throw new Error('Wallet not connected')

      const { name, contributionAmount, securityDeposit, numParticipants, contributionInterval, payoutInterval } =
        params

      // Find the PDA for the Ajo group
      const [ajoGroupPDA] = findAjoGroupPDA(name)

      try {
        // Using the direct Anchor pattern
        const signature = await program.methods
          .createAjoGroup(
            name,
            new BN(securityDeposit),
            new BN(contributionAmount),
            contributionInterval,
            payoutInterval,
            numParticipants,
          )
          .accounts({
            //@ts-expect-error: unknown type mismatch, couldnt fig out, though it works
            ajoGroup: ajoGroupPDA,
            creator: userPublicKey,
            globalState: globalStatePDA,
            tokenMint: USDC_MINT,
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
      if (!userPublicKey) throw new Error('Wallet not connected')

      const { ajoGroup } = params

      try {
        // Using the direct Anchor pattern
        const signature = await program.methods
          .joinAjoGroup()
          .accounts({
            //@ts-expect-error: unknown type mismatch, couldnt fig out, though it works
            ajoGroup,
            participant: userPublicKey,
            systemProgram: SystemProgram.programId,
            tokenMint: USDC_MINT,
            participantTokenAccount: USDC_MINT,
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
