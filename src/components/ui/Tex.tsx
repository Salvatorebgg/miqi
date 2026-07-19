import { useMemo } from 'react'
import katex from 'katex'

export function Tex({ formula, block = false }: { formula: string; block?: boolean }) {
  const html = useMemo(
    () => katex.renderToString(formula, { displayMode: block, throwOnError: false }),
    [formula, block],
  )
  // eslint-disable-next-line react/no-danger
  return <span className={block ? 'tex-block' : 'tex-inline'} dangerouslySetInnerHTML={{ __html: html }} />
}
