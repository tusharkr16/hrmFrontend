import LeaveBalance from '@/components/LeaveBalance'
import RequestLeave from '@/components/LeaveForm'
import LeaveRequest from '@/components/LeaveStatus'
import React from 'react'

const page = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>
      <RequestLeave/>
      {/* <LeaveRequest/> */}
      <LeaveBalance/>
      </div>
  )
}

export default page