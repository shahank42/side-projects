<script lang="ts">
	import type { Project } from '../../types/general';
	import ProjectCard from './project-card.svelte';

	export let projects: Project[];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
	{#if projects}
		{#each projects as project (project.id)}
			<ProjectCard {project} />
		{/each}
	{/if}
</div>
