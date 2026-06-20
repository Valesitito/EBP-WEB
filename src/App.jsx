import Header from './components/Header'
import Hero from './components/Hero'
import Signature from './components/Signature'
import Catalog from './components/Catalog'
import FamiliesStrip from './components/FamiliesStrip'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Signature />
        <Catalog />
        <FamiliesStrip />
      </main>
      <Footer />
    </>
  )
}
