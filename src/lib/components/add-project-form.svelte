<script context="module" lang="ts">
	import { z } from 'zod';

	export const addProjectFormSchema = z.object({
		title: z.string().min(2),
		description: z.string(),
		githubRepoLink: z.string(),
		status: z.string()
		// coverImageUrl: z.string().optional()
	});

	export type AddProjectFormSchema = typeof addProjectFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';
	import { Textarea } from '$lib/components/ui/textarea';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select';
	import { githubUserData } from '$lib/stores/store';
	import { get } from 'svelte/store';
	import Button from './ui/button/button.svelte';
	import { Description } from 'formsnap';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from '../../routes/add-project/$types';

	export let data: PageData;

	const addProjectFrom = superForm(data.form, {
		validators: zodClient(addProjectFormSchema)
	});

	const { form: formData, enhance } = addProjectFrom;

	$: selectedStaus = {
		label: $formData.status,
		value: $formData.status
	};

	const username = data.session?.user.user_metadata.user_name as string;

	onMount(() => {
		$formData.githubRepoLink = `https://github.com/${username}/`;
	});
</script>

<Card.Root>
	<Card.Header>
		<!-- <Card.Title>Project Information</Card.Title> -->
		<Card.Description>Owner: @{username}</Card.Description>
	</Card.Header>

	<form method="POST" class="space-y-8" use:enhance>
		<Card.Content class="flex flex-col gap-3">
			<Form.Field form={addProjectFrom} name="title">
				<Form.Control let:attrs>
					<Form.Label>Project Name</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.title}
						placeholder="What is your project called?"
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={addProjectFrom} name="status">
				<Form.Control let:attrs>
					<Form.Label>Project Status</Form.Label>
					<Select.Root
						selected={selectedStaus}
						onSelectedChange={(s) => {
							s && ($formData.status = s.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="How goes the project?" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Developing" label="Developing" />
							<Select.Item value="On Hold" label="On Hold" />
							<Select.Item value="Completed" label="Completed" />
							<Select.Item value="Abandoned" label="Abandoned" />
						</Select.Content>
					</Select.Root>
					<input hidden name={attrs.name} bind:value={$formData.status} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={addProjectFrom} name="description">
				<Form.Control let:attrs>
					<Form.Label>Project Description</Form.Label>
					<Textarea
						{...attrs}
						rows={5}
						bind:value={$formData.description}
						placeholder="Tell us about your cool project! You can be as descriptive or as brief as you want to."
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={addProjectFrom} name="githubRepoLink">
				<Form.Control let:attrs>
					<Form.Label>GitHub Repository Link</Form.Label>
					<Input {...attrs} bind:value={$formData.githubRepoLink} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<!-- <Form.Field form={addProjectFrom} name="img">
				<Form.Control let:attrs>
					<Form.Label>Add a Cover Image</Form.Label>
					<Input {...attrs} type="file" bind:value={$formData.coverImageUrl} />
				</Form.Control>
				<Form.FieldErrors />
				<Form.Description>Show us how your project looks like!</Form.Description>
			</Form.Field> -->
		</Card.Content>

		<Card.Footer class="border-t px-6 py-4">
			<Form.Button>Submit Project!</Form.Button>
		</Card.Footer>
	</form>
</Card.Root>
