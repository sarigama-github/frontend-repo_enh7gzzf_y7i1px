import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import PromoCard from './components/PromoCard'
import PromoForm from './components/PromoForm'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  const fetchPromotions = async (q = '') => {
    setLoading(true)
    try {
      const url = new URL(`${baseUrl}/api/promotions`)
      if (q) url.searchParams.set('q', q)
      const res = await fetch(url)
      const data = await res.json()
      setPromotions(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPromotions()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onSearch={(q)=>{setQuery(q); fetchPromotions(q)}} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Latest promotions</h2>
          {loading ? (
            <p className="text-slate-600">Loading promotions...</p>
          ) : promotions.length === 0 ? (
            <p className="text-slate-600">No promotions yet. Be the first to post below.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((p) => (
                <PromoCard key={p.id} promo={p} />
              ))}
            </div>
          )}
        </section>

        <PromoForm onCreated={() => fetchPromotions(query)} />
      </main>
    </div>
  )
}

export default App
