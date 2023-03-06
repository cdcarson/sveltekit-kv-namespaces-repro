import { Miniflare, Log, LogLevel, type MiniflareOptions } from 'miniflare';
import { dev } from '$app/environment';

export const devMiniflare = async (_platform: App.Platform | undefined) => {
  if (!dev) return _platform;
  if (_platform) return _platform;
  const opts: MiniflareOptions = {
    log: new Log(LogLevel.INFO),
    envPath: '.dev.vars',

    kvPersist: true,
    kvNamespaces: ['USER_SESSION'], //Declare array with NameSpaces
    globalAsyncIO: true,
    globalTimers: true,
    globalRandom: true,

    script: `
		addEventListener("fetch", (event) => {
			event.waitUntil(Promise.resolve(event.request.url));
			event.respondWith(new Response(event.request.headers.get("X-Message")));
		});
		addEventListener("scheduled", (event) => {
			event.waitUntil(Promise.resolve(event.scheduledTime));
		});
		`
  };
  const mf = new Miniflare(opts);

  const env = await mf.getBindings();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const platform: App.Platform = { env: env as any };
  return platform;
};
