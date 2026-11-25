import { NextRequest } from 'next/server'
import { getMarkdownForPath } from '@/lib/markdown-pages'

export function GET(req: NextRequest) {
  const targetPath = req.nextUrl.searchParams.get('path') || '/'
  const markdown = getMarkdownForPath(targetPath)

  if (!markdown) {
    return new Response('# Not Found\n\nNo Markdown representation is available for this path.', {
      status: 404,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
      },
    })
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
