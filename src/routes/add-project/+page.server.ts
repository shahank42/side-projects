import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { addProjectFormSchema } from '$lib/components/add-project-form.svelte';
import { fetchGithubRepoData } from '$lib/controllers.js';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	return {
		form: await superValidate(zod(addProjectFormSchema)),
		session,
		user
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(addProjectFormSchema));
		if (!form.valid) return fail(400, { form });

		const session = await event.locals.safeGetSession();
		try {
			await fetchGithubRepoData(form.data.githubRepoLink);
		} catch (err) {
			return fail(400, { form, message: 'No such repository found! Please check the URL again' });
		}

		const supabase = event.locals.supabase;

		const { error: supabaseError } = await supabase.from('projects').insert({
			user_id: session.user?.id as string,
			owner: session.user?.user_metadata.user_name,
			...form.data
		});

		if (supabaseError) console.error(supabaseError);
		else {
			// console.log(session.user?.user_metadata.user_name);
			redirect(303, `/users/${session.user?.user_metadata.user_name}`);
			// toast("Project successfully added!")
			return { form, message: 'Project successfully added!' };
		}
	}
};
