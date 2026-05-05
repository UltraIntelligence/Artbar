import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';
import { ARTBAR_TOKYO_EMAIL } from '@/constants';

const FROM_EMAIL = 'Artbar Contact Form <noreply@painta.co>';

type Lang = 'en' | 'jp';

const SUBJECT_LABELS: Record<string, { en: string; jp: string }> = {
  general: { en: 'General Inquiry', jp: '一般のお問い合わせ' },
  booking: { en: 'Booking', jp: '予約について' },
  private: { en: 'Private Party', jp: 'プライベートパーティー' },
  instructor: { en: 'Instructor Inquiry', jp: 'インストラクターについて' },
  cancellation: { en: 'Cancellation', jp: 'キャンセル' },
  other: { en: 'Other', jp: 'その他' },
};

const MESSAGES = {
  rateLimit: {
    en: 'Too many requests. Please wait a minute and try again.',
    jp: 'リクエストが多すぎます。少し時間をおいて再度お試しください。',
  },
  notConfigured: {
    en: 'Contact form is not configured right now.',
    jp: 'お問い合わせフォームは現在ご利用いただけません。',
  },
  invalidBody: {
    en: 'Invalid request body.',
    jp: 'リクエストの形式が正しくありません。',
  },
  needSubject: {
    en: 'Please choose a subject.',
    jp: 'お問い合わせの種類を選択してください。',
  },
  needFields: {
    en: 'Name, email, and phone are required.',
    jp: 'お名前・メールアドレス・電話番号は必須です。',
  },
  badEmail: {
    en: 'Please enter a valid email address.',
    jp: '有効なメールアドレスを入力してください。',
  },
  sendFailed: {
    en: 'Could not send your message. Please email us directly.',
    jp: 'メッセージを送信できませんでした。お手数ですが直接メールでご連絡ください。',
  },
} as const;

const MAX_FIELD_LENGTHS = {
  name: 200,
  email: 320,
  phone: 60,
  message: 5000,
} as const;

function getLang(value: unknown): Lang {
  return value === 'jp' ? 'jp' : 'en';
}

function langFromAcceptHeader(header: string | null): Lang {
  if (!header) return 'en';
  return header.toLowerCase().includes('ja') ? 'jp' : 'en';
}

function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

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
  // Best-effort locale resolution before parsing the body so early errors
  // (rate limit, missing config, malformed JSON) still match the visitor's locale.
  // The body's lang field overrides this once we have it.
  let lang: Lang = langFromAcceptHeader(req.headers.get('accept-language'));

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { allowed } = await checkRateLimit('contact', ip, 3, 60);
  if (!allowed) {
    return NextResponse.json(
      { error: MESSAGES.rateLimit[lang] },
      { status: 429 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY for /api/contact');
    return NextResponse.json(
      { error: MESSAGES.notConfigured[lang] },
      { status: 500 },
    );
  }

  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return NextResponse.json({ error: MESSAGES.invalidBody[lang] }, { status: 400 });
  }

  if (!isNonNullObject(parsed)) {
    return NextResponse.json({ error: MESSAGES.invalidBody[lang] }, { status: 400 });
  }
  const body = parsed;

  lang = getLang(body.lang);

  // Honeypot — real users leave this empty; bots fill it.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const subjectKey = typeof body.subject === 'string' ? body.subject.trim() : '';
  // Object.hasOwn guards against prototype-chain keys (__proto__, constructor, …)
  // which would otherwise return truthy non-string values and bypass validation.
  if (!Object.hasOwn(SUBJECT_LABELS, subjectKey)) {
    return NextResponse.json({ error: MESSAGES.needSubject[lang] }, { status: 400 });
  }
  const subjectLabels = SUBJECT_LABELS[subjectKey];

  const name = getString(body.name, MAX_FIELD_LENGTHS.name);
  const email = getString(body.email, MAX_FIELD_LENGTHS.email);
  const phone = getString(body.phone, MAX_FIELD_LENGTHS.phone);
  const message = typeof body.message === 'string'
    ? body.message.trim().slice(0, MAX_FIELD_LENGTHS.message)
    : '';

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: MESSAGES.needFields[lang] },
      { status: 400 },
    );
  }

  if (!isLikelyEmail(email)) {
    return NextResponse.json({ error: MESSAGES.badEmail[lang] }, { status: 400 });
  }

  // Subject line uses customer's language so staff can triage at a glance.
  const subjectLabel = subjectLabels[lang];
  const subjectLine = lang === 'jp'
    ? `[Artbar お問い合わせ] ${subjectLabel} — ${name}`
    : `[Artbar Contact] ${subjectLabel} — ${name}`;

  // Email body labels are bilingual since tokyo@artbar.co.jp staff handle both languages
  // and the same template should read naturally regardless of customer locale.
  const plainText = [
    `Subject / 件名: ${subjectLabels.en} / ${subjectLabels.jp}`,
    `Name / お名前: ${name}`,
    `Email / メール: ${email}`,
    `Phone / 電話番号: ${phone}`,
    `Language / 言語: ${lang === 'jp' ? '日本語 (Japanese)' : 'English'}`,
    '',
    `Message / メッセージ:`,
    message || (lang === 'jp' ? '(メッセージなし)' : '(no message)'),
  ].join('\n');

  const emptyMessage = lang === 'jp' ? '(メッセージなし)' : '(no message)';
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #053761; max-width: 560px;">
      <h2 style="margin: 0 0 16px; font-weight: 600;">New contact form submission ／ お問い合わせ</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Subject ／ 件名</td><td style="padding: 4px 0;"><strong>${escapeHtml(subjectLabels.en)} ／ ${escapeHtml(subjectLabels.jp)}</strong></td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Name ／ お名前</td><td style="padding: 4px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Email ／ メール</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #053761;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Phone ／ 電話番号</td><td style="padding: 4px 0;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #797979;">Language ／ 言語</td><td style="padding: 4px 0;">${lang === 'jp' ? '日本語 (Japanese)' : 'English'}</td></tr>
      </table>
      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e5e5e5;" />
      <p style="white-space: pre-wrap; line-height: 1.55;">${escapeHtml(message) || `<em style="color: #797979;">${emptyMessage}</em>`}</p>
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
        { error: MESSAGES.sendFailed[lang] },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] send failed', error);
    return NextResponse.json(
      { error: MESSAGES.sendFailed[lang] },
      { status: 502 },
    );
  }
}
