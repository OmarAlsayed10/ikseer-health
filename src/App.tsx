import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { RequestAccessModal } from './components/RequestAccess/RequestAccess'
import { Home } from './pages/Home'
import { FeaturesPage } from './pages/FeaturesPage'
import { PricingPage } from './pages/PricingPage'
import { AboutPage } from './pages/AboutPage'
import { SupportPage } from './pages/SupportPage'
import { ContactPage } from './pages/ContactPage'
import { ROUTES } from './constants/routes'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppShell() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <ScrollToTop />
      <Navbar onRequestAccess={openModal} />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home onRequestAccess={openModal} onContactSales={openModal} />} />
        <Route path={ROUTES.FEATURES} element={<FeaturesPage onRequestAccess={openModal} />} />
        <Route path={ROUTES.PRICING} element={<PricingPage onRequestAccess={openModal} onContactSales={openModal} />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage onRequestAccess={openModal} />} />
        <Route path={ROUTES.SUPPORT} element={<SupportPage onRequestAccess={openModal} />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage onRequestAccess={openModal} />} />
        <Route path="*" element={<Home onRequestAccess={openModal} onContactSales={openModal} />} />
      </Routes>

      <Footer onRequestAccess={openModal} />
      <RequestAccessModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
