import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function CreateAjoGroupForm() {
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
    console.log('Form submitted')
  }

  return (
    <form onSubmit={handleSubmit}>
      <motion.div variants={item} className="mb-4">
        <Label htmlFor="groupName" className="block mb-2 text-[#0F172A]">
          Group Name
        </Label>
        <Input
          type="text"
          id="groupName"
          name="groupName"
          placeholder="name your group"
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
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#ff6600] min-h-[100px]"
          value={formData.groupDescription}
          onChange={handleInputChange}
          required
        />
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label htmlFor="savingGoal" className="block mb-2 text-[#0F172A]">
          Contribution amounts
        </Label>
        <Input
          type="number"
          required
          min={3}
          placeholder="minimum of 3"
          value={formData.savingGoal}
          onChange={handleInputChange}
          id="savingGoal"
          name="savingGoal"
        />
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label htmlFor="numberOfSlots" className="block mb-2 text-[#0F172A]">
          Maximum participants
        </Label>
        <Input type="number" required min={3} placeholder="minimum of 3" />
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <label className="block text-[#0F172A] mb-2">Saving Frequency</label>
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

      <Button>Continue</Button>
    </form>
  )
}
