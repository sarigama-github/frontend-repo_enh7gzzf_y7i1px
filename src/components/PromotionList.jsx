import { useEffect, useState } from 'react'

function PromotionCard({ promo }) {
  const withinDates = (start, end) => {
    const now = new Date()
    const s = start ? new Date(start) : null
    const e = end ? new Date(end) : null
    if (s && now < s) return false
    if (e && now > e) return false
    return true
  }

  const active = promo.is_active && withinDates(promo.start_date, promo.end_date)

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      {promo.image_url && (
        <img src={promo.image_url} alt={promo.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-lg font-semibold text-slate-900">{promo.title}</h4>
          {promo.discount_type && (
            <span className="px-2 py-1 text-xs rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              {promo.discount_type}{promo.discount_value ? `: ${promo.discount_value}` : ''}
            </span>
          )}
        </div>
        {promo.business_name && (
          <p className="text-sm text-slate-500 mt-1">by {promo.business_name}{promo.industry ? ` • ${promo.industry}` : ''}</p>
        )}
        {promo.description && (
          <p className="text-slate-700 text-sm mt-2 line-clamp-3">{promo.description}</p>
        )}
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
          {promo.start_date && <span>Starts: {new Date(promo.start_date).toLocaleDateString()}</span>}
          {promo.end_date && <span>Ends: {new Date(promo.end_date).toLocaleDateString()}</span>}
          <span className={`ml-auto font-medium ${active ? 'text-emerald-600' : 'text-rose-600'}`}>{active ? 'Active' : 'Inactive'}</span>
        </div>
        {promo.tags && promo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {promo.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600 border border-slate-200">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PromotionList({ query, tag }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const url = new URL(`${baseUrl}/api/promotions`)
      if (query) url.searchParams.set('q', query)
      if (tag) url.searchParams.set('tag', tag)
      url.searchParams.set('active', 'true')
      const res = await fetch(url.toString())
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, tag])

  return (
    <div>
      {loading ? (
        <p className="text-slate-500">Loading promotions...</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500">No promotions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <PromotionCard key={p.id} promo={p} />)
          )}
        </div>
      )}
    </div>
  )
}

export default PromotionList
