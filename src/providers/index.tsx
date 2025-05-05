'use client'

import { ReactQueryProvider } from './react-query-provider'
import { SolanaProvider } from './solana-provider'
import React from 'react'

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <SolanaProvider>{children}</SolanaProvider>
    </ReactQueryProvider>
  )
}
