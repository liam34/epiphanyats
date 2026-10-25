'use client'

import { useActionState } from 'react'
import { submitContact, type ContactState } from '@/app/contact/actions'

const fields = [
  { name: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: 'Phone' },
  { name: 'subject', label: 'Subject', type: 'text' },
] as const

const initialState: ContactState = { status: 'idle' }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)

  if (state.status === 'success') {
    return (
      <p role="status" className="py-10 text-lg text-foreground">
        Thanks for your message. We will be in touch soon.
      </p>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {fields.map((f) => {
        const error = state.errors?.[f.name]
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
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${f.name}-error` : undefined}
              className="h-9 border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-accent aria-invalid:border-primary"
            />
            {error && (
              <p id={`${f.name}-error`} className="text-sm text-primary">
                {error}
              </p>
            )}
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
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? 'message-error' : undefined}
          className="border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent aria-invalid:border-primary"
        />
        {state.errors?.message && (
          <p id="message-error" className="text-sm text-primary">
            {state.errors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-3 w-36 self-end bg-accent py-1.5 text-sm text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? 'Sending...' : 'Send'}
      </button>
      {state.formError && (
        <p role="alert" className="text-sm text-primary">
          {state.formError}
        </p>
      )}
    </form>
  )
}
