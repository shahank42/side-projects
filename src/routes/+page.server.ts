import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (session) {
		const userId = session?.user.id;
		const { data: usersInProfilesTable } = await supabase
			.from('profiles')
			.select()
			.eq('id', userId);
		if (usersInProfilesTable?.length === 0) redirect(303, '/onboarding');
	}
};
