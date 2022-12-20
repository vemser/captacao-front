import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Subscription } from '../pages/Subscription'
import { PrivateRoute } from 'pages/PrivateRoute'
import { Registers } from 'pages/Registers'
import { Login } from 'pages/Login'
import { Schedule } from 'pages/Schedule'

export const Router = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscription" element={<Subscription />} />

        <Route element={<PrivateRoute />}>
          <Route path="/registros" index element={<Registers />} />
          <Route path="/agenda" index element={<Schedule />} />
        </Route>

        <Route path="*" element={<div>Erro</div>} />
      </Routes>
    </>
  )
}
