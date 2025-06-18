import React, { Children, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar'

const DashboardLayout = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
        <Navbar/>      
        {user && <div>{children}</div>}
    </div>
  )
}

export default DashboardLayout
