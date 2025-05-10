'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TagSelectorProps {
  tags: { value: string; label: string; icon: string }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function TagSelector({ tags, value, onChange, className }: TagSelectorProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <motion.button
          key={tag.value}
          type="button"
          className={cn(
            'px-3 py-2 rounded-full text-sm flex items-center gap-1',
            value === tag.value ? 'bg-[#ff6600] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(tag.value)}
        >
          <span>{tag.icon}</span>
          <span>{tag.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
