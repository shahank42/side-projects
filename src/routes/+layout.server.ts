import { Octokit } from 'octokit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_GITHUB_PAT } from '$env/static/public';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	if (session) {
	
		const octokit = new Octokit({
			auth: PUBLIC_GITHUB_PAT
		});
		// const githubUserData: GithubUserData;
		const githubUserDataReq = await octokit.request('GET /users/{username}', {
			username: session?.user.user_metadata.user_name
		});
		const githubUserData = githubUserDataReq.data;
		return {
			session,
			user,
			githubUserData
		};
	}

	// console.log(githubUserData.data)

	return {
		session,
		user
	};
};
