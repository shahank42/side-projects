<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Project } from '../../types/general';
	import ProjectCard from './project-card.svelte';
	import type { Database } from '../../types/supabase';
	import { page } from '$app/stores';

	export let projects: Project[];
	export let supabase: SupabaseClient<Database>
</script>

<div class="grid grid-cols-1 gap-10">
	{#if projects}
		{#each projects as project (project.id)}
			<ProjectCard {supabase} {project} />
		{/each}
	{/if}
</div>
