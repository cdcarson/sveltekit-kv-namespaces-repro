import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (dev) {
    const { devMiniflare } = await import('./miniflare');
    event.platform = await devMiniflare(event.platform);
  }
  return await resolve(event);
};
