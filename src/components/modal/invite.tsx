'use client'

import type React from 'react'
import { useModal } from '@/providers/modal-provider'
import { Avatar } from '../avatar'
import { Button } from '../ui/button'

interface InvitationModalProps {
  inviter: string
  groupName: string
  groupType: string
}

export const InvitationModal: React.FC<InvitationModalProps> = ({
  inviter = 'EmolaShola',
  groupName = 'Friends',
  groupType = 'koopa squad',
}) => {
  const { hideModal } = useModal()

  const handleAccept = () => {
    // Handle accept invitation
    hideModal()
  }

  const handleDecline = () => {
    // Handle decline invitation
    hideModal()
  }

  return (
    <div className="p-6">
      <div className="flex justify-center mb-6 relative">
        <div className="relative">
          <Avatar size={96} number={6} />
          <div className="absolute text-[#ff6b00] right-0 top-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="absolute left-[55%] top-[25%]">
          <Avatar size={66} number={1} />
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg">
          <span className="bg-orange-100 text-[#ff6b00] px-2 py-1 rounded-md">@{inviter}</span> is inviting you to join{' '}
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md">{groupName}</span>
          <br />
          {groupType} in your savings journey
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={handleAccept}>Accept Invitation</Button>
        <Button variant="outline" onClick={handleDecline}>
          Decline
        </Button>
      </div>
    </div>
  )
}
