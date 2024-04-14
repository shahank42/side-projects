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

		console.log(form);

		redirect(303, '/');
	}
};
