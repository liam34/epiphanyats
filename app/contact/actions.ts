'use server'

import { createClient } from '@libsql/client'

const fields = ['firstName', 'lastName', 'email', 'phone', 'subject', 'message'] as const
type ContactField = (typeof fields)[number]

export type ContactState = {
  status: 'idle' | 'success' | 'saved' | 'error'
  errors?: Partial<Record<ContactField, string>>
  formError?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d\s().-]{7,20}$/
const NOTIFICATION_EMAIL = 'lamarque@epiphanyats.com'

export async function submitContact(_previousState: ContactState, formData: FormData): Promise<ContactState> {
  const get = (field: ContactField) => {
    const value = formData.get(field)
    return typeof value === 'string' ? value.trim() : ''
  }
  const values: Record<ContactField, string> = {
    firstName: get('firstName'),
    lastName: get('lastName'),
    email: get('email'),
    phone: get('phone'),
    subject: get('subject'),
    message: get('message'),
  }

  const errors: ContactState['errors'] = {}
  if (!values.firstName || values.firstName.length > 100) errors.firstName = 'Please enter your first name.'
  if (!values.lastName || values.lastName.length > 100) errors.lastName = 'Please enter your last name.'
  if (!EMAIL_RE.test(values.email) || values.email.length > 254) errors.email = 'Please enter a valid email.'
  if (!PHONE_RE.test(values.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!values.subject || values.subject.length > 200) errors.subject = 'Please enter a subject.'
  if (!values.message || values.message.length > 5000) errors.message = 'Please enter a message.'

  if (Object.keys(errors).length > 0) return { status: 'error', errors }

  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (!url || !authToken) {
    console.error('Contact form database is not configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.')
    return { status: 'error', formError: 'We could not save your message. Please try again later.' }
  }

  const db = createClient({ url, authToken })
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await db.execute({
      sql: `
        INSERT INTO contact_messages (first_name, last_name, email, phone, subject, message)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      args: [
        values.firstName,
        values.lastName,
        values.email,
        values.phone,
        values.subject,
        values.message,
      ],
    })
  } catch (error) {
    console.error('Failed to save contact form submission to Turso.', error)
    return { status: 'error', formError: 'We could not save your message. Please try again later.' }
  } finally {
    await db.close()
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!resendApiKey || !fromEmail) {
    console.error('Contact notification email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.')
    return {
      status: 'saved',
      formError: 'Your message was saved, but email notifications are not configured yet.',
    }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [NOTIFICATION_EMAIL],
        reply_to: values.email,
        subject: `Contact form: ${values.subject.replace(/[\r\n]+/g, ' ')}`,
        text: [
          `Name: ${values.firstName} ${values.lastName}`,
          `Email: ${values.email}`,
          `Phone: ${values.phone}`,
          '',
          values.message,
        ].join('\n'),
      }),
    })

    if (!response.ok) {
      console.error(`Resend rejected the contact notification with HTTP ${response.status}.`)
      return {
        status: 'saved',
        formError: 'Your message was saved, but we could not send the email notification. We will follow up soon.',
      }
    }

    return { status: 'success' }
  } catch (error) {
    console.error('Failed to send the contact notification with Resend.', error)
    return {
      status: 'saved',
      formError: 'Your message was saved, but we could not send the email notification. We will follow up soon.',
    }
  }
}
