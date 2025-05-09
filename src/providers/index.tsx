'use client'

import { ModalProvider } from './modal-provider'
import { ReactQueryProvider } from './react-query-provider'
import { SolanaProvider } from './solana-provider'
import React from 'react'

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <SolanaProvider>
        <ModalProvider>{children}</ModalProvider>
      </SolanaProvider>
    </ReactQueryProvider>
  )
}
