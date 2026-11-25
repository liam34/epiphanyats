import { siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const card = {
    $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
    name: 'epiphanyats-web',
    version: '1.0.0',
    title: 'Epiphany Accounting & Tax Services',
    description:
      'Public information and service lookup MCP server for Epiphany Accounting & Tax Services in Edmonton, AB.',
    endpoint: `${siteUrl}/api/mcp`,
    transport: 'streamable-http',
    documentationUrl: `${siteUrl}/llms.txt`,
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
    },
    tools: [
      {
        name: 'get_firm_info',
        description: 'Get contact details, office address, and business hours for Epiphany Accounting & Tax Services.',
      },
      {
        name: 'list_services',
        description: 'List accounting, tax, payroll, and financial advisory services offered by the firm.',
      },
    ],
  }

  return Response.json(card, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
