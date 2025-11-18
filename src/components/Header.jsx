import { useState } from 'react'

function Header({ onRefresh }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-inner shadow-blue-400/20 flex items-center justify-center text-white font-bold">P</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">PromoHub</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Deals from businesses near you</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onRefresh} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-900 text-white text-sm shadow hover:bg-slate-800 transition">
            Refresh
          </button>
          <button className="sm:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="i">☰</span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden px-4 pb-3">
          <button onClick={onRefresh} className="w-full px-3 py-2 rounded-md bg-slate-900 text-white text-sm shadow hover:bg-slate-800 transition">Refresh</button>
        </div>
      )}
    </header>
  )
}

export default Header
