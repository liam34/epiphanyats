import { NextRequest } from 'next/server'
import { contactInfo, industries, serviceDetails, siteUrl } from '@/lib/site'

export const runtime = 'nodejs'

const TOOLS = [
  {
    name: 'get_firm_info',
    description:
      'Get contact details, office address, and business hours for Epiphany Accounting & Tax Services.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'list_services',
    description: 'List accounting, tax, payroll, and financial advisory services offered by the firm.',
    inputSchema: {
      type: 'object',
      properties: {
        serviceId: {
          type: 'string',
          description: 'Optional service id filter (e.g. bookkeeping, personal-tax, corporate-tax, payroll).',
        },
      },
      additionalProperties: false,
    },
  },
]

function jsonRpcResult(id: unknown, result: unknown) {
  return Response.json({ jsonrpc: '2.0', id, result })
}

function jsonRpcError(id: unknown, code: number, message: string, status = 400) {
  return Response.json({ jsonrpc: '2.0', id, error: { code, message } }, { status })
}

export async function POST(req: NextRequest) {
  let body: { id?: unknown; method?: string; params?: Record<string, unknown> }
  try {
    body = await req.json()
  } catch {
    return jsonRpcError(null, -32700, 'Parse error')
  }

  const { id = null, method, params = {} } = body

  if (method === 'initialize') {
    return jsonRpcResult(id, {
      protocolVersion: '2025-03-26',
      serverInfo: {
        name: 'epiphanyats-web',
        version: '1.0.0',
      },
      capabilities: {
        tools: { listChanged: false },
      },
    })
  }

  if (method === 'tools/list') {
    return jsonRpcResult(id, { tools: TOOLS })
  }

  if (method === 'tools/call') {
    const name = params.name
    const args = (params.arguments ?? {}) as Record<string, unknown>

    if (name === 'get_firm_info') {
      const payload = {
        name: 'Epiphany Accounting & Tax Services',
        url: siteUrl,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: contactInfo.addressLines,
        hours: contactInfo.hours,
        industries,
        contactUrl: `${siteUrl}/contact`,
      }
      return jsonRpcResult(id, {
        content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
      })
    }

    if (name === 'list_services') {
      const filterId = typeof args.serviceId === 'string' ? args.serviceId.trim() : ''
      const items = filterId
        ? serviceDetails.filter((s) => s.id === filterId)
        : serviceDetails
      return jsonRpcResult(id, {
        content: [{ type: 'text', text: JSON.stringify(items, null, 2) }],
      })
    }

    return jsonRpcError(id, -32601, `Unknown tool: ${String(name)}`, 404)
  }

  return jsonRpcError(id, -32601, `Method not found: ${String(method)}`, 404)
}
