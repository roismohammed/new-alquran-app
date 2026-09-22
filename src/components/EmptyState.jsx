export function EmptyState({ icon: Icon, title, description, actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-2xl border border-dashed border-emerald-900/10 dark:border-emerald-100/10 bg-emerald-50/30 dark:bg-emerald-950/20 my-4">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3 shadow-xs">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">{description}</p>}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
