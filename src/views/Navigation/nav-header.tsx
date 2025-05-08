import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  path: string
  header: string
}

export default function NavHeader({ path, header }: Props) {
  return (
    <motion.div
      className="my-6 relative flex justify-center mx-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={path} className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}>
          <ChevronLeft size={24} />
        </motion.div>
      </Link>
      <h1 className="text-[#121212] font-medium text-lg">{header}</h1>
    </motion.div>
  )
}
