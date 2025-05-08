'use client'

import { motion } from 'framer-motion'
import { Calendar, ChevronDown } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import Container from '@/components/container'
import NavHeader from '@/views/Navigation/nav-header'

export default function CreateAjoGroupPage() {
  const [formData, setFormData] = useState({
    groupName: '',
    groupDescription: '',
    startDate: 'Today - 07/05/2025',
    endDate: '',
    savingGoal: '',
    numberOfSlots: '',
    savingFrequency: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success('Group creation in progress')
    // Here you would handle the form submission
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Container>
      <NavHeader path="/savings" header="" />

      <motion.h1 variants={item} className="text-2xl font-bold text-[#ff6b00] mb-1">
        Let&#39;s create a public ajo group <span className="text-2xl">😉</span>
      </motion.h1>
      <motion.p variants={item} className="text-gray-500 mb-6">
        Kindly enter group details below
      </motion.p>

      <form onSubmit={handleSubmit}>
        <motion.div variants={item} className="mb-4">
          <label htmlFor="groupName" className="block font-medium mb-2">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            placeholder="name your group"
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]"
            value={formData.groupName}
            onChange={handleInputChange}
            required
          />
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <label htmlFor="groupDescription" className="block font-medium mb-2">
            Group Description
          </label>
          <textarea
            id="groupDescription"
            name="groupDescription"
            placeholder="add a group description"
            className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] min-h-[100px]"
            value={formData.groupDescription}
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
            What is your koopa saving goal?
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

        <motion.div variants={item} className="mb-4">
          <label htmlFor="numberOfSlots" className="block font-medium mb-2">
            Number of Slots
          </label>
          <div className="relative">
            <select
              id="numberOfSlots"
              name="numberOfSlots"
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] appearance-none"
              value={formData.numberOfSlots}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled selected>
                select number of people
              </option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5 people</option>
              <option value="6">6 people</option>
              <option value="7">7 people</option>
              <option value="8">8 people</option>
              <option value="9">9 people</option>
              <option value="10">10 people</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
          Continue
        </motion.button>
      </form>
    </Container>
  )
}
