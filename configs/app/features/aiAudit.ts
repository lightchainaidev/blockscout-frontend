import type { Feature } from './types';

import { getEnvValue } from '../utils';

const apiUrl = getEnvValue('NEXT_PUBLIC_AI_AUDIT_API_URL');
const apiProtocol = getEnvValue('NEXT_PUBLIC_AI_AUDIT_API_PROTOCOL');
const isEnabled = getEnvValue('NEXT_PUBLIC_AI_AUDIT_ENABLED') === 'true';

const title = 'AI Audit';

const config: Feature<{ api: { endpoint: string; basePath: string } }> = (() => {
  return Object.freeze({
    title,
    isEnabled: isEnabled || false,
    api: {
      endpoint: `${ apiProtocol || 'https' }://${ apiUrl }`,
      basePath: '',
    },
  });
})();

export default config;
