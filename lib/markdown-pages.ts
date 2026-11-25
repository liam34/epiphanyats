import { contactInfo, homeServices, industries, serviceDetails, siteUrl } from './site'

export function getMarkdownForPath(pathname: string): string | null {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')

  switch (path) {
    case '/':
      return [
        '# Epiphany Accounting & Tax Services',
        '',
        'Financial & Tax Consulting in Edmonton, AB since 2005.',
        '',
        '## Core Services',
        ...homeServices.map((s) => `- **${s.title}**: ${s.summary}`),
        '',
        '## Contact',
        `- Email: [${contactInfo.email}](mailto:${contactInfo.email})`,
        `- Phone: [${contactInfo.phone}](${contactInfo.phoneHref})`,
        `- Address: ${contactInfo.addressLines.join(', ')}`,
        ...contactInfo.hours.map((h) => `- ${h.label}: ${h.value}`),
        '',
        '## Navigation',
        `- [About Us](${siteUrl}/about)`,
        `- [Services](${siteUrl}/services)`,
        `- [Clients](${siteUrl}/clients)`,
        `- [Contact](${siteUrl}/contact)`,
        `- [Terms of Use](${siteUrl}/terms)`,
        `- [Privacy Policy](${siteUrl}/privacy)`,
      ].join('\n')

    case '/about':
      return [
        '# About Epiphany Accounting & Tax Services',
        '',
        'Epiphany Accounting & Tax Services has been accommodating individuals and businesses for their tax and financial requirements since 2005 in Edmonton, AB.',
        '',
        '## Associate',
        '- **Lamarque Volcy**, Associate',
        `- Email: [${contactInfo.email}](mailto:${contactInfo.email})`,
        `- Phone: [${contactInfo.phone}](${contactInfo.phoneHref})`,
      ].join('\n')

    case '/services':
      return [
        '# Services — Epiphany Accounting & Tax Services',
        '',
        ...serviceDetails.flatMap((s) => [
          `## ${s.title}`,
          ...s.paragraphs,
          ...(s.listIntro ? [s.listIntro] : []),
          ...(s.list ? s.list.map((item) => `- ${item}`) : []),
          '',
        ]),
      ].join('\n')

    case '/clients':
      return [
        '# Clients — Epiphany Accounting & Tax Services',
        '',
        'We offer complete accounting, payroll, and professional tax services for small businesses, independent contractors, and corporate enterprises.',
        '',
        '## Industries Served',
        ...industries.map((i) => `- ${i}`),
      ].join('\n')

    case '/contact':
      return [
        '# Contact Epiphany Accounting & Tax Services',
        '',
        '## Address',
        ...contactInfo.addressLines,
        '',
        '## Direct Contact',
        `- Email: [${contactInfo.email}](mailto:${contactInfo.email})`,
        `- Phone: [${contactInfo.phone}](${contactInfo.phoneHref})`,
        '',
        '## Office Hours',
        ...contactInfo.hours.map((h) => `- ${h.label}: ${h.value}`),
      ].join('\n')

    case '/terms':
      return [
        '# Terms of Use — Epiphany Accounting & Tax Services',
        '',
        'Content on this website is provided for general informational purposes only and does not constitute personalized accounting, tax, financial, or legal advice.',
        '',
        `Questions: [${contactInfo.email}](mailto:${contactInfo.email}) | [${contactInfo.phone}](${contactInfo.phoneHref})`,
      ].join('\n')

    case '/privacy':
      return [
        '# Privacy Policy — Epiphany Accounting & Tax Services',
        '',
        'Details submitted via our contact form are used solely to respond to your inquiry. Do not submit confidential tax documents, government IDs, or financial account numbers in website chat.',
        '',
        `Questions: [${contactInfo.email}](mailto:${contactInfo.email}) | [${contactInfo.phone}](${contactInfo.phoneHref})`,
      ].join('\n')

    default:
      return null
  }
}
