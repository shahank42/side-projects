<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { formatDate } from '$lib/utils';
	import type { Project } from '../../types/general';
	import Button from './ui/button/button.svelte';

	export let project: Project;

	const topics = project.github_topics || [];
</script>

<Card.Root class="max-w-sm">
	<!-- <Card.Content>
		<p>A picture ig</p>
	</Card.Content> -->

	<Card.Header>
		<Card.Title tag="h1">{project.title}</Card.Title>

		<Card.Description>{project.description}</Card.Description>
	</Card.Header>

	<Card.Content class="flex flex-col gap-5">
		<div class="flex w-full justify-start gap-2">
			<span class="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
				{project.github_stars} stars
			</span>

			<span class="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
				{project.github_forks} forks
			</span>
		</div>

		<div class="flex flex-wrap justify-center gap-2 md:flex-nowrap">
			<Button class="w-full">More details</Button>
			<Button variant="outline" class="w-full">View on GitHub</Button>
		</div>

		<p>Last commit: {formatDate(project.github_last_commit)}</p>
	</Card.Content>

	<Card.Footer>
		<div class="flex flex-wrap items-center gap-2">
			<span class="inline text-sm">Tags:</span>
			{#each topics as topic}
				<span class="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{topic}</span>
			{/each}
		</div>
	</Card.Footer>
</Card.Root>
