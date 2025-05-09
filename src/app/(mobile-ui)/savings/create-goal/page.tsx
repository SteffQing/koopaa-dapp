'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import NavHeader from '@/views/Navigation/nav-header'
import Container from '@/components/container'

export default function CreateSavingGoalPage() {
  const [formData, setFormData] = useState({
    goalName: '',
    goalDescription: '',
    startDate: 'Today - 07/05/2025',
    endDate: '',
    savingGoal: '',
    savingFrequency: '',
  })
  /// @typescript-eslint/no-explicit-any
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /// @typescript-eslint/no-explicit-any
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success('Saving goal created successfully')
    // Here you would handle the form submission
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <NavHeader path="/savings/individual" header="Individual Savings" />

      <motion.h1 variants={item} className="text-2xl font-bold text-[#ff6b00] mb-1">
        Let&#39;s create a saving goal <span className="text-2xl">🎯</span>
      </motion.h1>
      <motion.p variants={item} className="text-gray-500 mb-6">
        Kindly enter goal details below
      </motion.p>

      <form onSubmit={handleSubmit}>
        <motion.div variants={item} className="mb-4">
          <label htmlFor="goalName" className="block font-medium mb-2">
            Goal Name
          </label>
          <input
            type="text"
            id="goalName"
            name="goalName"
            placeholder="name your goal"
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]"
            value={formData.goalName}
            onChange={handleInputChange}
            required
          />
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <label htmlFor="goalDescription" className="block font-medium mb-2">
            Goal Description
          </label>
          <textarea
            id="goalDescription"
            name="goalDescription"
            placeholder="add a goal description"
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] min-h-[100px]"
            value={formData.goalDescription}
            onChange={handleInputChange}
            required
          />
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <label htmlFor="startDate" className="block font-medium mb-2">
            When would you like to start?
          </label>
          <div className="relative">
            <input
              type="text"
              id="startDate"
              name="startDate"
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] pr-10"
              value={formData.startDate}
              onChange={handleInputChange}
              readOnly
            />
            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <label htmlFor="endDate" className="block font-medium mb-2">
            End date
          </label>
          <div className="relative">
            <input
              type="text"
              id="endDate"
              name="endDate"
              placeholder="select end date"
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] pr-10"
              value={formData.endDate}
              onChange={handleInputChange}
            />
            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <label htmlFor="savingGoal" className="block font-medium mb-2">
            What is your saving goal?
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">$</span>
            </div>
            <input
              type="number"
              id="savingGoal"
              name="savingGoal"
              placeholder="0.00"
              className="w-full p-4 pl-14 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]"
              value={formData.savingGoal}
              onChange={handleInputChange}
              required
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <label className="block font-medium mb-2">Saving Frequency</label>
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              type="button"
              className={`p-4 rounded-lg border ${
                formData.savingFrequency === 'daily' ? 'border-[#ff6b00] bg-orange-50' : 'border-gray-200 bg-white'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setFormData((prev) => ({ ...prev, savingFrequency: 'daily' }))}
            >
              Daily
            </motion.button>
            <motion.button
              type="button"
              className={`p-4 rounded-lg border ${
                formData.savingFrequency === 'weekly' ? 'border-[#ff6b00] bg-orange-50' : 'border-gray-200 bg-white'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setFormData((prev) => ({ ...prev, savingFrequency: 'weekly' }))}
            >
              Weekly
            </motion.button>
            <motion.button
              type="button"
              className={`p-4 rounded-lg border ${
                formData.savingFrequency === 'monthly' ? 'border-[#ff6b00] bg-orange-50' : 'border-gray-200 bg-white'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setFormData((prev) => ({ ...prev, savingFrequency: 'monthly' }))}
            >
              Monthly
            </motion.button>
          </div>
        </motion.div>

        <motion.button
          variants={item}
          type="submit"
          className="w-full bg-[#ff6b00] text-white py-4 px-6 rounded-lg font-medium"
          whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(255,107,0,0.3)' }}
          whileTap={{ y: 0, boxShadow: 'none' }}
        >
          Create Goal
        </motion.button>
      </form>
    </Container>
  )
}
