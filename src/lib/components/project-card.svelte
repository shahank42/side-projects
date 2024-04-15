<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { formatDate } from '$lib/utils';
	import Button from './ui/button/button.svelte';

	export let project: any;
</script>

<Card.Root>
	<Card.Content>
		<p>A picture ig</p>
	</Card.Content>
	<Card.Header>
		<Card.Title>{project.title}</Card.Title>
		<Card.Description>{project.description}</Card.Description>
		<div class="flex w-full justify-start gap-2">
			<span class="rounded-lg bg-secondary px-2 py-1 text-sm text-secondary-foreground"
				>{project.github_stars} stars</span
			>
			<span class="rounded-lg bg-secondary px-2 py-1 text-sm text-secondary-foreground"
				>{project.github_forks} forks</span
			>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-wrap justify-center gap-2 md:flex-nowrap">
			<Button class="w-full">More details</Button>
			<Button class="w-full">View on GitHub</Button>
		</div>
	</Card.Content>
	<Card.Footer>
		<p>Last commit: {formatDate(project.github_last_commit)}</p>
	</Card.Footer>
</Card.Root>
