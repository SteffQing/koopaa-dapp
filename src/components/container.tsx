import { ReactNode } from 'react'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
}
export default function Container({ children, className }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className={cn('flex flex-col min-h-screen pb-20 container bg-[#F2F2F2]', className)}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {' '}
      {children}{' '}
    </motion.div>
  )
}
