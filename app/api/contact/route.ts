import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';
import { ARTBAR_TOKYO_EMAIL } from '@/constants';

const FROM_EMAIL = 'Artbar Contact Form <noreply@painta.co>';

const SUBJECT_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  booking: 'Booking',
  private: 'Private Party',
  instructor: 'Instructor Inquiry',
  cancellation: 'Cancellation',
  other: 'Other',
};

const MAX_FIELD_LENGTHS = {
  name: 200,
  email: 320,
  phone: 60,
  message: 5000,
} as const;

function getString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function isLikelyEmail(value: string): boolean {
  // Loose check — Resend will reject malformed addresses; we just keep obvious garbage out.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = await checkRateLimit('contact', ip, 3, 60);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY for /api/contact');
    return NextResponse.json(
      { error: 'Contact form is not configured right now.' },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — real users leave this empty; bots fill it.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const subjectKey = typeof body.subject === 'string' ? body.subject.trim() : '';
  const subjectLabel = SUBJECT_LABELS[subjectKey];
  if (!subjectLabel) {
    return NextResponse.json({ error: 'Please choose a subject.' }, { status: 400 });
  }

  const name = getString(body.name, MAX_FIELD_LENGTHS.name);
  const email = getString(body.email, MAX_FIELD_LENGTHS.email);
  const phone = getString(body.phone, MAX_FIELD_LENGTHS.phone);
  const message = typeof body.message === 'string'
    ? body.message.trim().slice(0, MAX_FIELD_LENGTHS.message)
    : '';

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: 'Name, email, and phone are required.' },
      { status: 400 },
    );
  }

  if (!isLikelyEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const lang = body.lang === 'jp' ? 'jp' : 'en';

  const subjectLine = `[Artbar Contact] ${subjectLabel} — ${name}`;
  const plainText = [
    `Subject: ${subjectLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Language: ${lang === 'jp' ? 'Japanese' : 'English'}`,
    '',
    'Message:',
    message || '(no message)',
  ].join('\n');

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #053761; max-width: 560px;">
      <h2 style="margin: 0 0 16px; font-weight: 600;">New contact form submission</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Subject</td><td style="padding: 4px 0;"><strong>${escapeHtml(subjectLabel)}</strong></td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Name</td><td style="padding: 4px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Email</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #053761;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Phone</td><td style="padding: 4px 0;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Language</td><td style="padding: 4px 0;">${lang === 'jp' ? 'Japanese' : 'English'}</td></tr>
      </table>
      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e5e5e5;" />
      <p style="white-space: pre-wrap; line-height: 1.55;">${escapeHtml(message) || '<em style="color: #797979;">(no message)</em>'}</p>
    </div>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ARTBAR_TOKYO_EMAIL,
      replyTo: email,
      subject: subjectLine,
      text: plainText,
      html,
    });

    if (error) {
      console.error('[contact] Resend error', error);
      return NextResponse.json(
        { error: 'Could not send your message. Please email us directly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] send failed', error);
    return NextResponse.json(
      { error: 'Could not send your message. Please email us directly.' },
      { status: 502 },
    );
  }
}
