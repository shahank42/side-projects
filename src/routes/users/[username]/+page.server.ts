import { fetchProjectsOfUser } from '$lib/controllers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { username }, locals: { supabase } }) => {
	return {
		username,
		projects: await fetchProjectsOfUser(supabase, username)
	};
};
