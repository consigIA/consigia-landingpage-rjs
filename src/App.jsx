import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import HeroSection from './components/sections/HeroSection'
import DemoSection from './components/sections/DemoSection'
import Comparation from './components/sections/Comparation'
import BenefitsSection from './components/sections/BenefitsSection'
import FAQSection from './components/sections/FAQSection'
import PartnerSection from './components/sections/PartnerSection'
import StatsSection from './components/sections/StatsSection'
import CTASection from './components/sections/CTASection'
import NewsSection from './components/sections/NewsSection'
import Footer from './components/common/Footer'
import FormularySection from './components/sections/FormularySection'
import ConsigAIButton from './components/common/ConsigIA'
import FeedbackSection from './components/sections/FeedbackSection'
import React from 'react';
import './styles/animations.css'

function App() {

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <HeroSection />
                <DemoSection />
                <PartnerSection />
                <FeedbackSection />
                <Comparation />
                <BenefitsSection />
                <FAQSection />
                <StatsSection />
                <CTASection />
              </main>
              <Footer />
            </>
          }
        />
        <Route
          path="/formulario"
          element={
            <>
              <Header />
              <FormularySection />
              <Footer />
            </>
          }
        />

        <Route
          path="/noticias"
          element={
            <>
              <Header />
              <NewsSection />
              <Footer />
            </>
          }
        />
      </Routes>
          
      <ConsigAIButton />
    </div>
  )
}

export default App