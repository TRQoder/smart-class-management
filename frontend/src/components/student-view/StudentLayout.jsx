import React from 'react'
import { Outlet } from 'react-router-dom'

function StudentLayout() {
  return (
    <div>
      <div>StudentLayout</div>
      <Outlet />
    </div>
  )
}

export default StudentLayout