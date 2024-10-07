import React from 'react'
import Layout from './UI/Layout/Layout'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Payment from './Pages/Payment/Payment'
import Classes from './Pages/Classes/Classes'
import Chats from './Pages/Chats/Chats'
import Reports from './Pages/Reports/Reports'
import Schedule from './Pages/Schedule/Schedule'
import AdminLogin from './Pages/AdminLogin/AdminLogin'
import NewTrial from './Pages/Classes/ClassesPages/NewTrail'
import RescheduleReq from './Pages/Classes/ClassesPages/RescheduleReq'
import ResourceReq from './Pages/Classes/ClassesPages/ResourceReq'
import HomeworkReq from './Pages/Classes/ClassesPages/HomeworkReq'
import ClassIndex from './Pages/Classes/ClassesPages/ClassIndex'
import UpcomingClassDetail from './Pages/Classes/ClassesDetail/UpcomingClassDetail'
import Students from './Pages/Students/Students'
import StudentDetails from './Pages/Students/StudentDetails/StudentDetails'
import Teachers from './Pages/Teachers/Teachers'
import TeacherDetails from './Pages/Teachers/TeacherDetails/TeacherDetails'
import Support from './Pages/Support/Support'
import PaymentDetails from './Pages/Payment/Details/PaymentDetails'
import Overview from './Pages/Overview/Overview'
import PastClassDetail from './Pages/Classes/ClassesDetail/PastClassDetail'
import TrialClassDetail from './Pages/Classes/ClassesDetail/TrialClassDetail'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SignInPage from './Components/UserSignUp/SignInPage'
import SupportDetails from './Pages/Support/SupportDetails/SupportDetails'
import Chat from './Pages/messages/Chat'
import TrialClassPast from './Pages/Classes/ClassesDetail/TrialClassPast'
import ForgotPassword from './Components/UserSignUp/ForgotPassword'
import Profile from './Pages/Profile/Profile'
import EditProfile from './Pages/Profile/EditProfile'
import Meet from './Components/DyteIo/Meet'
import PrivateComponent from './Components/PrivateComponents/PrivateComponent'
import EditStuProfile from './Pages/Students/EditStuProfile/EditStuProfile'
import GroupChat from './Pages/GroupChat/GroupChat'
import DoubtReq from './Pages/Classes/ClassesPages/DoubtReq'


const App = () => {
  const location = useLocation();
  const path = location.pathname;
// console.log("hghhgghfghghhg")

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose='1000'
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="light"
      /> 

      {path.includes('auth') || path === '/' ?

        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/auth-reset' element={<ForgotPassword />} />
        </Routes>

        :

        <Layout>
          <main className='main_container'>
            <Routes>
            <Route element={<PrivateComponent />}>
            
              <Route path='dashboard'>
                <Route path = ""  element={<Overview />}/>
              <Route path="trial-request" element={<NewTrial />} />
                <Route path="reschedule-request" element={<RescheduleReq />} />
                <Route path="resource-request" element={<ResourceReq />} />
                <Route path="homework-request" element={<HomeworkReq />} />
                <Route path="doubt-request" element={<DoubtReq />} />
                </Route>

                <Route path="/trial-request" element={<NewTrial />} />
                <Route path="/reschedule-request" element={<RescheduleReq />} />
                <Route path="/resource-request" element={<ResourceReq />} />
                <Route path="/homework-request" element={<HomeworkReq />} />
                
              <Route path='student'>
                <Route index element={<Students />} />
                <Route path='/student/details/:id' element={<StudentDetails />} />
                <Route path='/student/details/:id/editstu' element={<EditStuProfile />} />
                         </Route>
              <Route path='teacher'>
                <Route index element={<Teachers />} />
                <Route path='/teacher/details/:id' element={<TeacherDetails />} />
              </Route>
              <Route path='payment'>
                <Route index element={<Payment />} />
                <Route path='/payment/details/:id' element={<PaymentDetails />} />
              </Route>

              <Route path="/classes" element={<Classes />}>
                <Route path="" element={<ClassIndex />} />
                <Route path="trial-request" element={<NewTrial />} />
                <Route path="reschedule-request" element={<RescheduleReq />} />
                <Route path="resource-request" element={<ResourceReq />} />
                <Route path="homework-request" element={<HomeworkReq />} />
                <Route path="doubt-request" element={<DoubtReq />} />
              </Route>
              
              <Route path='/classes/upcoming-details/:id' element={<UpcomingClassDetail />} />
              <Route path='/classes/past-details/:id' element={<PastClassDetail />} />
              <Route path='/classes/trial-details/:id' element={<TrialClassDetail />} />
              <Route path='/classes/trial-past-details/:id' element={<TrialClassPast />} />
              <Route path="/meet/:token" element={<Meet/>} />
              <Route path='chats'>
                <Route index element={<GroupChat />} />
              </Route>
              <Route path='profile'>
                <Route index element={<Profile />} />
                <Route path='edit' element={<EditProfile />} />
              </Route>
              <Route path='reports'>
                <Route index element={<Reports />} />
              </Route>
              <Route path='schedule'>
                <Route index element={<Schedule />} />
              </Route>
              <Route path='support'>
                <Route index element={<Support />} />
                <Route path="/support/details/:id" element={<SupportDetails />} />
              </Route>
              </Route>
            </Routes>
          </main>
        </Layout>
      }
    </>
  )
}

export default App