<script lang="ts">
	import type { Project } from '../../types/general';
	import ProjectCard from './project-card.svelte';

	export let projects: Project[];
</script>

{#if projects}
	{#each projects as project (project.id)}
		<ProjectCard {project} />
	{/each}
{/if}
