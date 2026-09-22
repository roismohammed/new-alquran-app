import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Memuat data...', size = 'md' }) {
  const sizeClasses = {
    sm: 'p-4 text-xs',
    md: 'py-12 px-4 text-sm',
    lg: 'py-20 px-4 text-base'
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${sizeClasses[size]} text-emerald-800 dark:text-emerald-300`}>
      <div className="relative mb-3">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-600 dark:border-t-emerald-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 font-medium">{message}</p>
    </div>
  );
}

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

export function ErrorState({ message = 'Data belum dapat dimuat. Silakan periksa koneksi lalu coba lagi.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 my-4">
      <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Terjadi Kendala</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}
