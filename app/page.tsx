import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Collections from '@/components/Collections'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AIChat from '@/components/AIChat'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import AccessibilityPanel from '@/components/AccessibilityPanel'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <Collections />
      <About />
      <Contact />
      <Footer />
      <AIChat />
      <FloatingWhatsApp />
      <AccessibilityPanel />
    </main>
  )
} 