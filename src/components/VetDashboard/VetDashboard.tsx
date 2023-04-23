import React from 'react'
import CustomerNavbar from '../CustomerNavbar/CustomerNavbar'
import VetAside from '../VetAside/VetAside'
import VetOverview from '../VetOverview/VetOverview'
import { Button } from '@material-tailwind/react'
import { useModal } from '@/hooks/useModal'
import ModalAddCustomer from '../Modal/Modal'
import Aside from '../Aside/Aside'
import NavbarDashboard from '../NavbarDashboard/NavbarDashboard'

const VetDashboard = () => {

  const [ isOpenAddCustomer, openAddCustomer, closeAddCustomer ] =  useModal(false);
  const [ isOpenMenu, openMenu, closeMenu ] =  useModal(false);

  return (
    <div className='flex flex-row bg-happy-grey-blue'>
        <ModalAddCustomer open={isOpenAddCustomer} closeAddCustomer={closeAddCustomer}/>
        <Aside open={isOpenMenu} closeMenu={closeMenu}/>
        <div className='w-full h-full'>
          <NavbarDashboard openMenu={openMenu}/>
          <div className='p-5'>
            <div className='flex justify-between px-3 py-6 items-end'>
              <h2 className='text-xl font-semibold'>Welcome back, Andres</h2>
              <Button onClick={openAddCustomer}>Add customer</Button>
            </div>
            <VetOverview/>
          </div>
        </div>
    </div>
  )
}

export default VetDashboard