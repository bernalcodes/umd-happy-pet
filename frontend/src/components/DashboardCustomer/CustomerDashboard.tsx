import React from 'react'
import CustomerNavbar from '../CustomerNavbar/CustomerNavbar'
import CustomerAside from '../CustomerAside/CustomerAside'

const CustomerDashboard = () => {
  return (
    <div className='flex flex-row'>
        <CustomerAside/>
        <div className='w-full h-fit'>
          <CustomerNavbar/> 
        </div>
    </div>
  )
}

export default CustomerDashboard