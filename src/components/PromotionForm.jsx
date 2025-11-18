import { useEffect, useState } from 'react'

const initialForm = {
  business_id: '',
  title: '',
  description: '',
  image_url: '',
  start_date: '',
  end_date: '',
  discount_type: '',
  discount_value: '',
  terms: '',
  tags: '',
}

function PromotionForm({ onCreated }) {
  const [form, setForm] = useState(initialForm)
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/business?limit=100`)
      .then((r) => r.json())
      .then((d) => setBusinesses(d))
      .catch(() => setBusinesses([]))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...form,
        discount_value: form.discount_value ? Number(form.discount_value) : undefined,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      }
      const res = await fetch(`${baseUrl}/api/promotions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Failed to create promotion')
      }
      const data = await res.json()
      setForm(initialForm)
      onCreated && onCreated(data.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Post a promotion</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
        <select className="input" name="business_id" value={form.business_id} onChange={handleChange} required>
          <option value="">Select business</option>
          {businesses.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
        <input className="input" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input className="input" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
        <input className="input" name="discount_type" placeholder="Discount type (percent, amount, bogo)" value={form.discount_type} onChange={handleChange} />
        <input className="input" name="discount_value" placeholder="Discount value (number)" value={form.discount_value} onChange={handleChange} />
        <input type="date" className="input" name="start_date" value={form.start_date} onChange={handleChange} />
        <input type="date" className="input" name="end_date" value={form.end_date} onChange={handleChange} />
        <textarea className="input md:col-span-2" name="description" placeholder="Details" value={form.description} onChange={handleChange} />
        <input className="input md:col-span-2" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 disabled:opacity-60">{loading ? 'Posting...' : 'Post promotion'}</button>
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
      </form>
    </div>
  )
}

export default PromotionForm
