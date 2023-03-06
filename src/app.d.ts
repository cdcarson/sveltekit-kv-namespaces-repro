// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface Platform {
      env: {
        FOO: string;
        BAR: import('@cloudflare/workers-types').KVNamespace;
      };
    }
  }
}

export {};
