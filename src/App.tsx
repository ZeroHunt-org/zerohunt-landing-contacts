/**
 * Contacts page: media/press kit downloads + collaboration request form.
 *
 * Markup and classes mirror zerohunt-landing's ContactPage, so the two read as
 * one site. The form has no backend yet: submit only validates (native HTML
 * constraints) and shows the confirmation state locally.
 */
import { useState } from 'react'

/** Static files served from public/downloads. */
const KITS = [
  {
    id: 'media-kit',
    title: 'Media kit',
    body: 'Logos, colour palette, typography and guidelines for using the Zero Hunt brand.',
    href: '/downloads/zerohunt-media-kit.zip',
  },
  {
    id: 'press-kit',
    title: 'Press kit',
    body: 'Press releases, company fact sheet, photos and team bios for journalists.',
    href: '/downloads/zerohunt-press-kit.zip',
  },
] as const

const COLLABORATION_TYPES = [
  'Commercial partnership',
  'Reseller / channel',
  'Technology integration',
  'Press and media',
  'Events and sponsorships',
  'Other',
] as const

const EMPTY_FORM = { firstName: '', lastName: '', email: '', company: '', role: '', collaboration: '' }

// 16 px on phones: iOS Safari zooms the page into any field smaller than that.
const inputClass = 'w-full bg-[#0a0e14] border border-white/10 focus:border-white/40 focus:ring-2 focus:ring-white/10 rounded-md px-3 py-2.5 text-base sm:text-sm text-white placeholder-gray-500 focus:outline-none transition'
const labelClass = 'block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5'

function DownloadIcon () {
  return (
    <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
    </svg>
  )
}

export function App () {
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  function onChange (key: keyof typeof EMPTY_FORM, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function onSubmit (e: React.FormEvent) {
    // Nothing to post to yet: the browser already enforced `required`/`type`.
    e.preventDefault()
    setSent(true)
  }

  function field (key: keyof typeof EMPTY_FORM, label: string, type: string, autoComplete: string) {
    return (
      <label className='block'>
        <span className={labelClass}>{label}</span>
        <input
          type={type} required value={form[key]}
          onChange={(e) => onChange(key, e.target.value)}
          className={inputClass}
          autoComplete={autoComplete}
          maxLength={type === 'email' ? 254 : 120}
        />
      </label>
    )
  }

  return (
    <div className='min-h-screen bg-[#030508] text-gray-300 antialiased'>
      <header className='border-b border-white/[0.06]'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center'>
          <a href='https://zerohunt.ai' aria-label='Zero Hunt'>
            <img src='/brand/zerohunt-logo-horizontal-on-dark.svg' alt='Zero Hunt' width={134} height={28} className='h-7 w-auto' />
          </a>
        </div>
      </header>

      <main className='max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20'>
        <header className='mb-12 md:mb-16 text-center'>
          <span className='text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-cyan-400/80 block mb-3'>
            Contact
          </span>
          <h1 className='text-4xl md:text-6xl font-black text-white leading-tight mb-5'>
            Let's work <span className='text-[hsl(199_42%_60%)]'>together</span>
          </h1>
          <p className='text-gray-300 text-base md:text-lg leading-relaxed'>
            Download our official materials, or tell us what kind of collaboration you have in mind.
          </p>
        </header>

        {/* Kits: two large download tiles */}
        <section aria-label='Download' className='grid sm:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-20'>
          {KITS.map((kit) => (
            <a
              key={kit.id}
              href={kit.href}
              download
              className='group flex flex-col items-center text-center gap-4 rounded-xl border border-gray-800 bg-gray-900/30 p-6 md:p-8 hover:border-[hsl(356_74%_54%/0.5)] hover:bg-gray-900/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2'
            >
              <span className='cta-button flex-shrink-0 w-14 h-14 rounded-lg'>
                <DownloadIcon />
              </span>
              <span className='min-w-0'>
                <span className='block text-xl md:text-2xl font-bold text-white mb-1'>
                  Download the {kit.title}
                </span>
                <span className='block text-sm text-gray-400 leading-relaxed'>{kit.body}</span>
              </span>
            </a>
          ))}
        </section>

        {/* Collaboration form */}
        <section>
          <h2 className='text-xl font-bold text-white mb-5 text-center'>Propose a collaboration</h2>

          {sent
            ? (
              <div role='status' aria-live='polite' className='rounded-xl border border-emerald-500/40 bg-emerald-500/[0.05] p-6 md:p-8 text-center'>
                <h3 className='text-lg font-bold text-white mb-1.5'>Thank you, {form.firstName}.</h3>
                <p className='text-sm text-gray-300 leading-relaxed mb-4'>
                  We have received your request and will reply to {form.email}.
                </p>
                <button
                  type='button'
                  onClick={() => { setForm(EMPTY_FORM); setSent(false) }}
                  className='text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium'
                >
                  Send another request →
                </button>
              </div>
              )
            : (
              <form onSubmit={onSubmit} className='space-y-4 rounded-xl border border-gray-800 bg-gray-900/30 p-5 md:p-6'>
                <div className='grid sm:grid-cols-2 gap-4'>
                  {field('firstName', 'First name', 'text', 'given-name')}
                  {field('lastName', 'Last name', 'text', 'family-name')}
                </div>
                {field('email', 'Email', 'email', 'email')}
                <div className='grid sm:grid-cols-2 gap-4'>
                  {field('company', 'Company', 'text', 'organization')}
                  {field('role', 'Role', 'text', 'organization-title')}
                </div>
                <label className='block'>
                  <span className={labelClass}>Collaboration type</span>
                  <select
                    required value={form.collaboration}
                    onChange={(e) => onChange('collaboration', e.target.value)}
                    className={inputClass}
                  >
                    <option value='' disabled>Select…</option>
                    {COLLABORATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <div className='pt-2 flex justify-center'>
                  <button type='submit' className='cta-button w-full sm:w-auto px-8 py-3 rounded-lg text-white font-semibold whitespace-nowrap'>
                    Send request
                  </button>
                </div>
              </form>
              )}
        </section>
      </main>

      <footer className='border-t border-white/[0.06]'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 py-8 text-xs text-gray-400 text-center'>
          <p>© {new Date().getFullYear()} Zero Hunt — Over Holding Srl</p>
          <p className='font-mono text-[11px] text-gray-500 mt-1'>VAT IT02945890305</p>
        </div>
      </footer>
    </div>
  )
}
