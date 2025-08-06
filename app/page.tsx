import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Collections from '@/components/Collections'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

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
    </main>
  )
} 