import { useState } from 'react'

function PromoForm({ onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [step, setStep] = useState(1)
  const [business, setBusiness] = useState({ name: '', email: '', website: '', logo_url: '' })
  const [promotion, setPromotion] = useState({ title: '', description: '', discount_text: '', image_url: '', tags: '' , category: ''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createBusiness = async () => {
    const res = await fetch(`${baseUrl}/api/businesses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(business)
    })
    if (!res.ok) throw new Error((await res.json()).detail || 'Failed to create business')
    return (await res.json()).id
  }

  const createPromotion = async (business_id) => {
    const payload = {
      ...promotion,
      tags: promotion.tags ? promotion.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      business_id,
    }
    const res = await fetch(`${baseUrl}/api/promotions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error((await res.json()).detail || 'Failed to create promotion')
    return (await res.json()).id
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const businessId = await createBusiness()
      await createPromotion(businessId)
      setStep(3)
      onCreated?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="post" className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Post a new promotion</h3>
      {error && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>}

      {step === 1 && (
        <form onSubmit={(e)=>{e.preventDefault(); setStep(2)}} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Business name</label>
              <input required className="w-full px-3 py-2 rounded-lg border border-slate-300" value={business.name} onChange={(e)=>setBusiness({...business, name:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Contact email</label>
              <input required type="email" className="w-full px-3 py-2 rounded-lg border border-slate-300" value={business.email} onChange={(e)=>setBusiness({...business, email:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Website</label>
              <input type="url" className="w-full px-3 py-2 rounded-lg border border-slate-300" value={business.website} onChange={(e)=>setBusiness({...business, website:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Logo URL</label>
              <input type="url" className="w-full px-3 py-2 rounded-lg border border-slate-300" value={business.logo_url} onChange={(e)=>setBusiness({...business, logo_url:e.target.value})} />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Next</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 mb-1">Title</label>
              <input required className="w-full px-3 py-2 rounded-lg border border-slate-300" value={promotion.title} onChange={(e)=>setPromotion({...promotion, title:e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-600 mb-1">Description</label>
              <textarea rows="3" className="w-full px-3 py-2 rounded-lg border border-slate-300" value={promotion.description} onChange={(e)=>setPromotion({...promotion, description:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Discount text</label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-300" placeholder="e.g., 20% off" value={promotion.discount_text} onChange={(e)=>setPromotion({...promotion, discount_text:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Category</label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-300" value={promotion.category} onChange={(e)=>setPromotion({...promotion, category:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Tags (comma separated)</label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-300" value={promotion.tags} onChange={(e)=>setPromotion({...promotion, tags:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Image URL</label>
              <input type="url" className="w-full px-3 py-2 rounded-lg border border-slate-300" value={promotion.image_url} onChange={(e)=>setPromotion({...promotion, image_url:e.target.value})} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button type="button" onClick={()=>setStep(1)} className="px-4 py-2 rounded-lg border border-slate-300">Back</button>
            <button disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60">{loading ? 'Posting...' : 'Post promotion'}</button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="text-center p-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-700 grid place-items-center text-2xl">✓</div>
          <h4 className="text-lg font-semibold mt-4">Promotion posted</h4>
          <p className="text-slate-600">Your promotion is now visible to users.</p>
          <button onClick={()=>{setStep(1); setBusiness({ name:'', email:'', website:'', logo_url:''}); setPromotion({ title:'', description:'', discount_text:'', image_url:'', tags:'', category:''})}} className="mt-4 px-4 py-2 rounded-lg border">Post another</button>
        </div>
      )}
    </div>
  )
}

export default PromoForm
