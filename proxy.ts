import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MARKDOWN_PATHS = new Set(['/', '/about', '/services', '/clients', '/contact', '/terms', '/privacy'])

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accept = request.headers.get('accept') ?? ''

  if (MARKDOWN_PATHS.has(pathname) && accept.toLowerCase().includes('text/markdown')) {
    const url = request.nextUrl.clone()
    url.pathname = '/api/markdown'
    url.searchParams.set('path', pathname)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/about', '/services', '/clients', '/contact', '/terms', '/privacy'],
}
