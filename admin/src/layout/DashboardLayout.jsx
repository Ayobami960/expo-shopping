import React from 'react'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  return (
    <div>
        <div>sidebar</div>
        <div>navbar</div>
        <Outlet/>
    </div>
  )
}

export default DashboardLayout