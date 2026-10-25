'use client'

import { useState, type FormEvent } from 'react'

const fields = [
  { name: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: 'Phone' },
  { name: 'subject', label: 'Subject', type: 'text' },
] as const

type SubmissionState = 'idle' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>('idle')
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setState('idle')

    const formData = new FormData(event.currentTarget)
    formData.set(
      'name',
      `${formData.get('firstName')} ${formData.get('lastName')}`,
    )

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const result: unknown = await response.json()

      if (
        response.ok &&
        typeof result === 'object' &&
        result !== null &&
        'success' in result &&
        result.success === true
      ) {
        setState('success')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    } finally {
      setPending(false)
    }
  }

  if (state === 'success') {
    return (
      <p role="status" className="py-10 text-lg text-foreground">
        Thanks for submitting!
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="hidden"
        name="access_key"
        value="adb2dad8-4ced-4edc-9990-736fead04949"
      />
      {fields.map((f) => {
        return (
          <div key={f.name} className="flex flex-col gap-1">
            <label htmlFor={f.name} className="text-sm text-foreground">
              {f.label} *
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required
              autoComplete={'autoComplete' in f ? f.autoComplete : undefined}
              placeholder={'placeholder' in f ? f.placeholder : undefined}
              className="h-9 border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-accent aria-invalid:border-primary"
            />
          </div>
        )
      })}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm text-foreground">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent aria-invalid:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-3 w-36 self-end bg-accent py-1.5 text-sm text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? 'Sending...' : 'Send'}
      </button>
      {state === 'error' && (
        <p role="alert" className="text-sm text-primary">
          We could not send your message. Please try again.
        </p>
      )}
    </form>
  )
}
