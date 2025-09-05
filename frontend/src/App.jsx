import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'

// import CheckAuth from './components/common/check-auth'
// import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
// import { checkAuth } from './store/authSlice'
// import RegisterFaculty from './components/admin-view/RegisterFaculty'
import Schedule from './pages/admin-view/Schedule'
import RegisterFaculty from './pages/admin-view/RegisterFaculty'
import FacultyLayout from './components/faculty-view/FacultyLayout'
import FacultyDashboard from './pages/faculty-view/FacultyDashboard'
import StudentAttendence from './pages/faculty-view/StudentAttendence'
import Reschedule from './pages/faculty-view/Reschedule'
import UnauthPage from './pages/UnauthPage'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import CheckAuth from './components/common/checkAuth'
import { checkAuth } from './store/authSlice/authSlice'
import AdminLayout from './components/admin-view/AdminLayout'
import AuthLayout from './components/auth/AuthLayout'
import StudentLayout from './components/student-view/StudentLayout'
import StudentHome from './pages/student-view/StudentHome'

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth)
 


  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])



  // if (isLoading) return <Skeleton className="h-[200px] w-[200px]" />
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>


        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout />
          </CheckAuth>
        }  >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="register-faculty" element={<RegisterFaculty />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        <Route path='/faculty' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <FacultyLayout />
          </CheckAuth>
        } >
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="student-attendence" element={<StudentAttendence />} />
          <Route path="reschedule" element={<Reschedule />} />
        </Route>


        <Route path='/student' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <StudentLayout />
          </CheckAuth>
        } >
          <Route path="home" element={<StudentHome />} />
        </Route>





        <Route path='*' element={<NotFound />} />
        <Route path='/unauth-page' element={<UnauthPage />} />



      </Routes>


    </div>
  )
}

export default App