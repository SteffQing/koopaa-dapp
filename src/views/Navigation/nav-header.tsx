import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  path?: string
  header: string
  className?: string
}

export default function NavHeader({ path, header, className }: Props) {
  const router = useRouter()
  return (
    <motion.div
      className={cn('my-6 relative flex justify-center', className)}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {path && (
        // <Link href={path} className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <motion.div
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.back()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2"
        >
          <ChevronLeft size={24} />
        </motion.div>
        // {/* </Link> */}
      )}
      <h1 className="text-[#121212] font-medium text-lg">{header}</h1>
    </motion.div>
  )
}
