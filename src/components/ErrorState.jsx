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
