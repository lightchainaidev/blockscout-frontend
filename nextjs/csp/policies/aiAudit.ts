import type CspDev from 'csp-dev';

export function aiAudit(): CspDev.DirectiveDescriptor {
  if (!process.env.NEXT_PUBLIC_AI_AUDIT_ENABLED) {
    return {};
  }

  return {
    'connect-src': [
      `${ process.env.NEXT_PUBLIC_AI_AUDIT_API_URL }`,
    ],
  };
}
