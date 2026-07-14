import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './Button'

export function ErrorFallback({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--brand-surface)]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-red-500/10">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="pacers-display text-3xl text-white mb-2">Connection Timeout</h1>
        <p className="text-[#7a8ea6] mb-8 leading-relaxed">
          We couldn't connect to the ESPN live data feed. This usually means the API is temporarily down or your network is unstable.
        </p>
        
        <div className="bg-black/30 rounded-lg p-4 mb-8 text-left border border-white/5 overflow-x-auto">
          <code className="text-xs text-red-300 font-mono">
            {error?.message || 'Failed to fetch payload'}
          </code>
        </div>

        <Button intent="primary" shape="skewed" onClick={onRetry} className="w-full justify-center py-3 text-lg">
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  )
}
