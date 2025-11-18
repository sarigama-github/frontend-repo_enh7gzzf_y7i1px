function PromoCard({ promo }) {
  return (
    <div className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
      {promo.image_url && (
        <div className="h-40 overflow-hidden">
          <img src={promo.image_url} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{promo.title}</h3>
            {promo.discount_text && (
              <p className="text-blue-600 font-medium mt-0.5">{promo.discount_text}</p>
            )}
            {promo.description && (
              <p className="text-slate-600 text-sm line-clamp-3 mt-2">{promo.description}</p>
            )}
            {promo.tags && promo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {promo.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">#{t}</span>
                ))}
              </div>
            )}
          </div>
          {promo.business && (
            <div className="text-right">
              {promo.business.logo_url ? (
                <img src={promo.business.logo_url} alt={promo.business.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-200 grid place-items-center text-slate-500 text-xs">{promo.business.name?.slice(0,2).toUpperCase()}</div>
              )}
              <p className="text-xs text-slate-500 mt-1">{promo.business.name}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-slate-500">
            {promo.start_date && promo.end_date ? (
              <span>{new Date(promo.start_date).toLocaleDateString()} - {new Date(promo.end_date).toLocaleDateString()}</span>
            ) : null}
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">View</button>
        </div>
      </div>
    </div>
  )
}

export default PromoCard
