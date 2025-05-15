import { motion } from 'framer-motion'
import Link from 'next/link'

import PiggyBank from '@/assets/coins/piggybank.png'
import KoopaaSquad from '@/assets/koopaa-squad.png'
import Vault from '@/assets/vault.png'
import Image from 'next/image'

const savingOptions = [
  {
    title: 'Save towards a Goal',
    description: 'Achieve your goals with this saving method',
    color: 'bg-[#D4FFAB]',
    path: '/savings/create-goal',
    image: PiggyBank,
  },
  {
    title: 'Create an Ajo Group',
    description: 'Achieve your goals faster with group saving method',
    color: 'bg-[#ABEBFF]',
    path: '/savings/create-ajo',
    image: KoopaaSquad,
  },
  {
    title: 'Defi Yield savings',
    description: 'Achieve your goals with this saving method',
    color: 'bg-[#F3BD9A]',
    path: '/savings/ajo',
    image: Vault,
  },
]

export default function StartSaving() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="mt-6 mb-6"
    >
      <h2 className="font-medium text-[#121212] text-sm mb-3">Start Saving</h2>

      <section className="flex flex-col gap-4">
        {savingOptions.map((option, index) => (
          <Link key={index} href={option.path}>
            <motion.div
              className={`${option.color} rounded-[8px] flex justify-between items-center max-h-[104px]`}
              whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
              whileTap={{ y: 0, boxShadow: 'none' }}
            >
              <div className="flex-3 pl-3 py-6">
                <h3 className="font-medium text-[#2E2E2E] text-base">{option.title}</h3>
                <p className="text-xs text-[#4C4C4C] font-normal">{option.description}</p>
              </div>
              <div className="flex-2">
                <Image src={option.image} alt={option.title} className="h-full" />
              </div>
            </motion.div>
          </Link>
        ))}
      </section>
    </motion.div>
  )
}
