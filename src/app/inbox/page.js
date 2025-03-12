import NoPendingRequests from '@/components/inbox'
import React from 'react'

const Inbox = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Inbox</h1>
      <NoPendingRequests/>
    </div>
  )
}

export default Inbox