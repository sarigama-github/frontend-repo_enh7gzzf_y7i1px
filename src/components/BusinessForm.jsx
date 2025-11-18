import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  website: '',
  description: '',
  location: '',
  industry: '',
}

function BusinessForm({ onCreated }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/business`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create business')
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
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Register your business</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
        <input className="input" name="name" placeholder="Business name" value={form.name} onChange={handleChange} required />
        <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input className="input" name="website" placeholder="Website" value={form.website} onChange={handleChange} />
        <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input className="input" name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} />
        <textarea className="input md:col-span-2" name="description" placeholder="Short description" value={form.description} onChange={handleChange} />
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={loading} className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-800 disabled:opacity-60">{loading ? 'Saving...' : 'Save business'}</button>
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
      </form>
    </div>
  )
}

export default BusinessForm
