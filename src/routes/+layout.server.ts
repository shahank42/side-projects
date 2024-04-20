import type { LayoutServerLoad } from './$types';
import { fetchGithubUserData } from '$lib/controllers';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	return {
		session,
		user,
		githubUserData: session
			? await fetchGithubUserData(session?.user.user_metadata.user_name)
			: null
	};
};
