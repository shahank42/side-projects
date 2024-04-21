import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { addProjectFormSchema } from '$lib/components/add-project-form.svelte';
import { fetchGithubRepoData } from '$lib/controllers.js';

export const load: PageServerLoad = async ({
	params: { projectId },
	locals: { safeGetSession, supabase }
}) => {
	const { session, user } = await safeGetSession();

	if (session) {
		const { data: dbProjects, error } = await supabase
			.from('projects')
			.select()
			.eq('id', projectId);
		if (!error) {
			console.log(dbProjects);
			if (dbProjects[0].user_id === session.user.id) {
				return {
					dbProjects: dbProjects[0],
					projectId,
					form: await superValidate(zod(addProjectFormSchema)),
					session,
					user
				};
			}
		} else {
			console.error(error);
		}
	}

	return {
		projectId,
		form: await superValidate(zod(addProjectFormSchema)),
		session,
		user
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(addProjectFormSchema));
		if (!form.valid) return fail(400, { form });

		// const session = await event.locals.safeGetSession();
		try {
			await fetchGithubRepoData(form.data.githubRepoLink);
		} catch (err) {
			return fail(400, { form, message: 'No such repository found! Please check the URL again' });
		}

		const supabase = event.locals.supabase;

		// console.log("new data: ", form.data)

		const { data: updatatedData, error: supabaseError } = await supabase
			.from('projects')
			.update({
				...form.data
			})
			.eq('id', event.params.projectId)
			.select();

		if (supabaseError) console.error(supabaseError);
		else {
			// redirect(303, '/');
			console.log('Project successfully added!');
			return { form, message: 'Project successfully updated!', updatedData: updatatedData[0] };
		}
	}
};
