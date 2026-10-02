import { env } from 'cloudflare:workers';
export function planningDb(){if(!env.DB)throw new Error('Planning database unavailable');return env.DB;}
