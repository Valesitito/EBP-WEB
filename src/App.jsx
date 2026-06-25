import Header from './components/Header'
import HeroSplit from './components/HeroSplit'
import Catalog from './components/Catalog'
import FamiliesStrip from './components/FamiliesStrip'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSplit />
        <Catalog />
        <FamiliesStrip />
      </main>
      <Footer />
    </>
  )
}
