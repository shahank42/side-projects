import { fetchProjectsOfUser } from '$lib/controllers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { userId }, locals: { supabase } }) => {
	return {
		userId,
		projects: await fetchProjectsOfUser(supabase, userId)
	};
};
