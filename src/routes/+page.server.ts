import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();
	// console.log(session)

	if (session) {
		// const userId = session?.user.id
		const userId = session?.user.id;
		// console.log(userId)
		const { data: usersInProfilesTable } = await supabase
			.from('profiles')
			.select()
			.eq('id', userId);
		console.log(usersInProfilesTable);
		if (usersInProfilesTable?.length === 0) redirect(303, '/onboarding');
	}
};
