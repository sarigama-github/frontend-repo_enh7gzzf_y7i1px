import { useState } from 'react'

function Navbar({ onSearch }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg grid place-items-center text-white font-bold">P</div>
          <span className="font-semibold text-slate-800">PromoHub</span>
        </a>
        <form onSubmit={submit} className="flex items-center gap-2 w-full max-w-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search promotions..."
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Search</button>
        </form>
        <a href="#post" className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Post a promo</a>
      </div>
    </header>
  )
}

export default Navbar
