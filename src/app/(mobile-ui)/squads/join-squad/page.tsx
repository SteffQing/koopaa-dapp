'use client'

import Container from '@/components/container'
import SquadCard from '@/components/squads/squad-card'
import { availableSquads } from '@/lib/static'
import NavHeader from '@/views/Navigation/nav-header'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const JoinSquadPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSquads = availableSquads.filter((squad) => squad.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Container className="gap-4">
      <NavHeader path="/squads" header="Squads Available" />
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="search squad"
          className="w-full py-3 pl-10 pr-4 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Squads Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredSquads.map((squad, index) => (
          <SquadCard key={index} squad={squad} />
        ))}
      </div>
    </Container>
  )
}

export default JoinSquadPage
