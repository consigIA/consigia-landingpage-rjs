import Header from './components/common/Header'
import HeroSection from './components/sections/HeroSection'
import DemoSection from './components/sections/DemoSection'
import NotificationSection from './components/sections/NotificationSection'
import BenefitsSection from './components/sections/BenefitsSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import FAQSection from './components/sections/FAQSection'
import StatsSection from './components/sections/StatsSection'
import CTASection from './components/sections/CTASection'
import Footer from './components/common/Footer'
import './styles/animations.css'

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <DemoSection />
        <NotificationSection />
        <BenefitsSection />
        <HowItWorksSection />
        <FAQSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
