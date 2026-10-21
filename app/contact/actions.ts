'use server'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  errors?: Partial<Record<'firstName' | 'lastName' | 'email' | 'phone' | 'subject' | 'message', string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d\s().-]{7,20}$/

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (key: string) => String(formData.get(key) ?? '').trim()
  const data = {
    firstName: get('firstName'),
    lastName: get('lastName'),
    email: get('email'),
    phone: get('phone'),
    subject: get('subject'),
    message: get('message'),
  }

  const errors: ContactState['errors'] = {}
  if (!data.firstName || data.firstName.length > 100) errors.firstName = 'Please enter your first name.'
  if (!data.lastName || data.lastName.length > 100) errors.lastName = 'Please enter your last name.'
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email.'
  if (!PHONE_RE.test(data.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!data.subject || data.subject.length > 200) errors.subject = 'Please enter a subject.'
  if (!data.message || data.message.length > 5000) errors.message = 'Please enter a message.'

  if (Object.keys(errors).length > 0) return { status: 'error', errors }

  // TODO: forward the message to info@epiphanyats.ca via an email provider.
  return { status: 'success' }
}
