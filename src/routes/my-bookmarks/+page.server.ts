import type { PageServerLoad } from './$types';
import { fetchBookmarks } from '$lib/controllers';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (session) {
		return { projects: await fetchBookmarks(supabase, session.user.id) }
	}

	// return { projects: await fetchProjects(supabase) }
};
