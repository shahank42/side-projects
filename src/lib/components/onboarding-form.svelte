<script context="module" lang="ts">
	import { z } from 'zod';

	export const onboardingFormSchema = z.object({
		username: z.string(),
		bio: z.string(),
		twitterHandle: z.string()
	});

	export type OnboardingFormSchema = typeof onboardingFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { githubUserData } from '$lib/stores/store';
	import { get } from 'svelte/store';

	export let data;

	const onboardingForm = superForm(data.form, {
		validators: zodClient(onboardingFormSchema)
	});

	const { form: formData, enhance } = onboardingForm;
</script>

<form method="POST" class="space-y-8" use:enhance>
	<Form.Field form={onboardingForm} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={onboardingForm} name="bio">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea {...attrs} bind:value={$formData.bio} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={onboardingForm} name="twitterHandle">
		<Form.Control let:attrs>
			<Form.Label>X/Twitter handle</Form.Label>
			<Input {...attrs} bind:value={$formData.twitterHandle} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
