// works because of .env...
import { FOO } from '$env/static/private';
import type { PageServerLoadEvent } from './$types';
export const load = async (event: PageServerLoadEvent) => {
  await event.platform?.env.BAR.put('oh', 'I dunno')
	return {
		foo: `FOO is ${FOO}`
	};
};
