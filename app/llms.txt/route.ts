import { contactInfo, serviceDetails, siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const servicesList = serviceDetails
    .map((s) => `- [${s.title}](${siteUrl}/services#${s.id}): ${s.paragraphs[0]}`)
    .join('\n')

  const body = [
    '# Epiphany Accounting & Tax Services',
    '',
    '> Accounting, bookkeeping, personal & corporate tax, payroll, and financial advisory for individuals and small businesses in Edmonton, AB since 2005.',
    '',
    '## Contact',
    `- Email: ${contactInfo.email}`,
    `- Phone: ${contactInfo.phone}`,
    `- Address: ${contactInfo.addressLines.join(', ')}`,
    ...contactInfo.hours.map((h) => `- ${h.label}: ${h.value}`),
    '',
    '## Key Pages',
    `- [Home](${siteUrl}/): Overview of Epiphany Accounting & Tax Services`,
    `- [About Us](${siteUrl}/about): Firm history since 2005 and leadership`,
    `- [Services](${siteUrl}/services): Bookkeeping, personal tax, corporate tax, tax strategies, consulting, payroll, financial advisory`,
    `- [Clients](${siteUrl}/clients): Industries served`,
    `- [Contact](${siteUrl}/contact): Contact form, office address, phone, email, and hours`,
    `- [Terms of Use](${siteUrl}/terms): Website terms of use`,
    `- [Privacy Policy](${siteUrl}/privacy): Website privacy policy`,
    '',
    '## Services',
    servicesList,
    '',
    '## Agent & Machine-Readable Endpoints',
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    `- Robots & Content Signals: ${siteUrl}/robots.txt`,
    `- MCP Server Card: ${siteUrl}/.well-known/mcp/server-card.json`,
    `- Markdown Negotiation: Send \`Accept: text/markdown\` to any page URL`,
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
