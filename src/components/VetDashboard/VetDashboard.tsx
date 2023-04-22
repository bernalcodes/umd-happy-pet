import React from 'react'
import CustomerNavbar from '../CustomerNavbar/CustomerNavbar'
import CustomerAside from '../CustomerAside/CustomerAside'
import VetAside from '../VetAside/VetAside'

const VetDashboard = () => {
  return (
    <div className='flex flex-row bg-happy-grey-blue'>
        <VetAside/>
        <div className='w-full h-fit'>
          <CustomerNavbar/> 
        </div>
    </div>
  )
}

export default VetDashboard