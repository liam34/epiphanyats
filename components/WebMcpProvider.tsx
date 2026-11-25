'use client'

import { useEffect } from 'react'
import { contactInfo, industries, serviceDetails, siteUrl } from '@/lib/site'

type ModelContextTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args?: Record<string, unknown>) => Promise<unknown> | unknown
}

declare global {
  interface Navigator {
    modelContext?: {
      registerTool?: (tool: ModelContextTool) => void
      unregisterTool?: (name: string) => void
    }
  }
}

export default function WebMcpProvider() {
  useEffect(() => {
    const register = navigator.modelContext?.registerTool
    if (typeof register !== 'function') return

    const tools: ModelContextTool[] = [
      {
        name: 'get_firm_info',
        description:
          'Get contact details, office address, business hours, and key URLs for Epiphany Accounting & Tax Services.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        execute: () => ({
          name: 'Epiphany Accounting & Tax Services',
          url: siteUrl,
          email: contactInfo.email,
          phone: contactInfo.phone,
          address: contactInfo.addressLines,
          hours: contactInfo.hours,
          industries,
          contactPage: `${siteUrl}/contact`,
        }),
      },
      {
        name: 'list_services',
        description:
          'List accounting, bookkeeping, personal tax, corporate tax, payroll, and financial advisory services offered by Epiphany Accounting & Tax Services.',
        inputSchema: {
          type: 'object',
          properties: {
            serviceId: {
              type: 'string',
              description: 'Optional service id such as bookkeeping, personal-tax, corporate-tax, or payroll.',
            },
          },
          additionalProperties: false,
        },
        execute: (args) => {
          const serviceId = typeof args?.serviceId === 'string' ? args.serviceId.trim() : ''
          return serviceId ? serviceDetails.filter((s) => s.id === serviceId) : serviceDetails
        },
      },
      {
        name: 'navigate_to_page',
        description: 'Navigate the browser to a key page on epiphanyats.com (e.g. /services, /contact, /about).',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              enum: ['/', '/about', '/services', '/clients', '/contact', '/terms', '/privacy'],
            },
          },
          required: ['path'],
          additionalProperties: false,
        },
        execute: (args) => {
          const path = typeof args?.path === 'string' ? args.path : '/'
          window.location.assign(path)
          return { navigatedTo: path }
        },
      },
    ]

    for (const tool of tools) {
      try {
        register.call(navigator.modelContext, tool)
      } catch {
        // Ignore duplicate registration on hot reload or unsupported browser state.
      }
    }

    return () => {
      const unregister = navigator.modelContext?.unregisterTool
      if (typeof unregister !== 'function') return
      for (const tool of tools) {
        try {
          unregister.call(navigator.modelContext, tool.name)
        } catch {
          // Ignore cleanup errors.
        }
      }
    }
  }, [])

  return null
}
