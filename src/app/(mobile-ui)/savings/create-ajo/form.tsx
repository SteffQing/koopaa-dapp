'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Label } from '@/components/ui/label'
import { Input, Textarea } from '@/components/ui/input'
import { createAjoGroupSchema, type CreateAjoGroupFormValues } from './schema'
import { ImageSelector } from '@/components/selector/image-selector'
import { TagSelector } from '@/components/selector/tag-selector'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

// Cover photo options
const coverPhotos = ['/group-cover/1.png', '/group-cover/2.png', '/group-cover/3.png', '/group-cover/4.png']

// Tag options
const tagOptions = [
  { value: 'real estate', label: 'Real Estate', icon: '🏠' },
  { value: 'birthday', label: 'Birthday', icon: '🎂' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'lifestyle', label: 'Lifestyle', icon: '🌴' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
]

// Interval options
const contributionIntervals = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

const payoutIntervals = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
]

interface CreateAjoGroupFormProps {
  onSubmit: (data: CreateAjoGroupFormValues) => void
}

export default function CreateAjoGroupForm({ onSubmit }: CreateAjoGroupFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateAjoGroupFormValues>({
    resolver: zodResolver(createAjoGroupSchema),
    defaultValues: {
      name: '',
      description: '',
      security_deposit: undefined,
      max_participants: 3,
      contribution_amount: undefined,
      contribution_interval: 'monthly',
      payout_interval: 'monthly',
      tag: 'lifestyle',
      group_cover_photo: 0,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <motion.div variants={item} className="mb-4">
        <Label htmlFor="name" className="block mb-2 text-[#0F172A]">
          Group Name
        </Label>
        <Input id="name" placeholder="name your group" {...register('name')} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label htmlFor="description" className="block mb-2 text-[#0F172A]">
          Group Description
        </Label>
        <Textarea
          id="description"
          placeholder="add a group description"
          {...register('description')}
          aria-invalid={!!errors.description}
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label className="block mb-2 text-[#0F172A]">Group Cover Photo</Label>
        <Controller
          name="group_cover_photo"
          control={control}
          render={({ field }) => <ImageSelector images={coverPhotos} value={field.value} onChange={field.onChange} />}
        />
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label className="block mb-2 text-[#0F172A]">Group Category</Label>
        <Controller
          name="tag"
          control={control}
          render={({ field }) => <TagSelector tags={tagOptions} value={field.value} onChange={field.onChange} />}
        />
        {errors.tag && <p className="mt-1 text-sm text-red-500">{errors.tag.message}</p>}
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label htmlFor="contribution_amount" className="block mb-2 text-[#0F172A]">
          Contribution Amount
        </Label>
        <Input
          type="number"
          id="contribution_amount"
          placeholder="enter amount"
          className="no-spinner"
          {...register('contribution_amount', { valueAsNumber: true })}
          aria-invalid={!!errors.contribution_amount}
        />
        {errors.contribution_amount && (
          <p className="mt-1 text-sm text-red-500">{errors.contribution_amount.message}</p>
        )}
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label htmlFor="security_deposit" className="block mb-2 text-[#0F172A]">
          Security Deposit
        </Label>
        <Input
          type="number"
          id="security_deposit"
          placeholder="enter security deposit amount"
          className="no-spinner"
          {...register('security_deposit', { valueAsNumber: true })}
          aria-invalid={!!errors.security_deposit}
        />
        {errors.security_deposit && <p className="mt-1 text-sm text-red-500">{errors.security_deposit.message}</p>}
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label htmlFor="max_participants" className="block mb-2 text-[#0F172A]">
          Maximum Participants
        </Label>
        <Input
          type="number"
          id="max_participants"
          placeholder="minimum of 3"
          min={3}
          className="no-spinner"
          {...register('max_participants', { valueAsNumber: true })}
          aria-invalid={!!errors.max_participants}
        />
        {errors.max_participants && <p className="mt-1 text-sm text-red-500">{errors.max_participants.message}</p>}
      </motion.div>

      <motion.div variants={item} className="mb-4">
        <Label className="block text-[#0F172A] mb-2">Contribution Interval</Label>
        <div className="grid grid-cols-3 gap-3">
          <Controller
            name="contribution_interval"
            control={control}
            render={({ field }) => (
              <>
                {contributionIntervals.map((interval) => (
                  <motion.button
                    key={interval.value}
                    type="button"
                    className={`p-4 rounded-lg border ${
                      field.value === interval.value ? 'border-[#ff6600] bg-orange-50' : 'border-gray-200 bg-white'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => field.onChange(interval.value)}
                  >
                    {interval.label}
                  </motion.button>
                ))}
              </>
            )}
          />
        </div>
        {errors.contribution_interval && (
          <p className="mt-1 text-sm text-red-500">{errors.contribution_interval.message}</p>
        )}
      </motion.div>

      {/* Payout Interval */}
      <motion.div variants={item} className="mb-8">
        <Label className="block text-[#0F172A] mb-2">Payout Interval</Label>
        <div className="grid grid-cols-3 gap-3">
          <Controller
            name="payout_interval"
            control={control}
            render={({ field }) => (
              <>
                {payoutIntervals.map((interval) => (
                  <motion.button
                    key={interval.value}
                    type="button"
                    className={`p-4 rounded-lg border ${
                      field.value === interval.value ? 'border-[#ff6600] bg-orange-50' : 'border-gray-200 bg-white'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => field.onChange(interval.value)}
                  >
                    {interval.label}
                  </motion.button>
                ))}
              </>
            )}
          />
        </div>
        {errors.payout_interval && <p className="mt-1 text-sm text-red-500">{errors.payout_interval.message}</p>}
      </motion.div>

      <motion.button
        variants={item}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#ff6600] text-white py-4 px-6 rounded-lg font-medium disabled:opacity-70"
        whileHover={{ y: -2, boxShadow: '0 4px 10px rgba(255,102,0,0.3)' }}
        whileTap={{ y: 0, boxShadow: 'none' }}
      >
        {isSubmitting ? 'Creating...' : 'Continue'}
      </motion.button>
    </form>
  )
}
