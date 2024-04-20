// import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProjects } from '$lib/controllers';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (session) {
		return { projects: await fetchProjects(supabase, session.user.id) }
	}

	return { projects: await fetchProjects(supabase) }
};
