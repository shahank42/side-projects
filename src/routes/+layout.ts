import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
// import type { Load } from '@sveltejs/kit';
// import type { LayoutLoad } from './$types'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
// import type { User } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({  fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key) {
				if (!isBrowser()) {
					return JSON.stringify(data?.session);
				}

				const cookie = parse(document.cookie);
				return cookie[key];
			}
		}
	});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	const user = session?.user;
	// console.log("+layout.ts: ", data?.githubUserData)

	// TODO: figure out how to deal with this extraneous request when user_name is undefined
	// const githubUserDataRequest = await fetch(
	// 	`https://api.github.com/users/${user?.user_metadata.user_name}`
	// );

	// if (session) {
	// 	const userId = session.user.id;
	// 	const { data: usersInProfilesTable } = await supabase
	// 		.from('profiles')
	// 		.select()
	// 		.eq('id', userId);
	// 	if (url.pathname === '/' && usersInProfilesTable?.length === 0) {
	// 		redirect(303, '/onboarding');
	// 		return { session, user, supabase };
	// 	}
	// }

	// might possibly remove user if not needed
	return { githubUserData: data?.githubUserData, user, supabase, session };
};
