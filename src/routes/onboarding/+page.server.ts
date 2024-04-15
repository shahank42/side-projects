import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { onboardingFormSchema } from '$lib/components/onboarding-form.svelte';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(onboardingFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(onboardingFormSchema));
		if (!form.valid) return fail(400, { form });
		// console.log(form);

		// const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
		const supabase = event.locals.supabase;
		const session = await event.locals.safeGetSession()
		const { error } = await supabase.from('profiles').insert({
			id: session?.user.id,
			username: form.data.username,
			twitter_handle: form.data.twitterHandle
		});

		if (error) console.error(error);
		else {
			redirect(303, '/');
		}
	}
};
