import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import HeroSection from './components/sections/HeroSection'
import DemoSection from './components/sections/DemoSection'
import Comparation from './components/sections/Comparation'
import BenefitsSection from './components/sections/BenefitsSection'
import FAQSection from './components/sections/FAQSection'
import PartnerSection from './components/sections/PartnerSection'
import CTASection from './components/sections/CTASection'
import NewsSection from './components/sections/NewsSection'
import Footer from './components/common/Footer'
import FormularySection from './components/sections/FormularySection'
import WhatsAppButton from './components/common/WhatsAppButton'
import TopButton from './components/common/TopButton'
import FeedbackSection from './components/sections/FeedbackSection'
import React from 'react';
import NotFound from './components/pages/NotFound';

function App() {

  return (
    <div>
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
                <Comparation />
                <FAQSection />
                <BenefitsSection />
                <CTASection />
              </main>
              <Footer />
              <TopButton/>
              <WhatsAppButton />
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
              <TopButton/>
              <WhatsAppButton />
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
              <TopButton/>
              <WhatsAppButton />
            </>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  )
}

export default App