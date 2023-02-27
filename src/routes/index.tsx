import { Home } from '../pages/Home'
import { Subscription } from '../pages/Subscription'
import { PrivateRoute } from 'pages/PrivateRoute'
import { Registers } from 'pages/Candidates'
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import { Login } from 'pages/Login'
import { Schedule } from 'pages/Schedule'
import { Interview } from 'pages/Interview'
import { Avaliation } from 'pages/Avaliation'
import { Result } from 'pages/Result'
import { CandidatesCurriculum } from 'pages/CandidatesCurriculum'
import { InterviewCurriculum } from 'pages/InterviewCurriculum'
import { ResultCurriculum } from 'pages/ResultCurriculum'
import { AptosCurriculum } from 'pages/AptosCurriculum'
import { Prova } from 'pages/Aptos'
import { ConfirmaEntrevista } from 'pages/ConfirmaEntrevista'
import { PageError } from 'components/PageError'
import 'nprogress/nprogress.css';

export const Router = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/confirmar-entrevista" element={<ConfirmaEntrevista />} />

        <Route element={<PrivateRoute />}>
          <Route path="/candidatos" index element={<Registers />} />
          <Route
            path="/candidatos/curriculo"
            element={<CandidatesCurriculum />}
          />

          <Route path="/prova" element={<Prova />} />
          <Route path="/prova/curriculo" element={<AptosCurriculum />} />

          <Route path="/entrevista" element={<Interview />} />
          <Route
            path="/entrevista/curriculo"
            element={<InterviewCurriculum />}
          />
          <Route path="/avaliacao" element={<Avaliation />} />

          <Route path="/agenda" element={<Schedule />} />

          <Route path="/resultado" element={<Result />} />
          <Route path="/resultado/curriculo" element={<ResultCurriculum />} />
        </Route>

        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  )
}
