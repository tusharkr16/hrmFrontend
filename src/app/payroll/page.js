import PayrollForm from '@/components/payroll'
import PayrollTable from '@/components/payrollTable'
import React from 'react'

const Payroll = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payroll</h1>
      <PayrollForm/>
      <PayrollTable/>

    </div>
  )
}

export default Payroll