import { useEffect, useState } from 'react'
import { Cloud, CloudOff } from 'lucide-react'
import { getRepository } from '../../lib/repositoryInstance'
import { isCloudEnabled } from '../../lib/supabase'

export function SyncBadge() {
  const [pending, setPending] = useState(0)

  useEffect(() => {
    const update = () => setPending(getRepository().pendingEvents().length)
    update()
    const interval = setInterval(update, 5000)
    window.addEventListener('storage', update)
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', update)
    }
  }, [])

  const label = isCloudEnabled
    ? pending > 0
      ? `${pending} 条记录待同步`
      : '云端同步已就绪'
    : '本地模式'

  return (
    <span className="sync-badge" role="status" title={label}>
      {isCloudEnabled ? <Cloud aria-hidden="true" /> : <CloudOff aria-hidden="true" />}
      {label}
    </span>
  )
}
