<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import ProjectsFeed from '$lib/components/projects-feed.svelte';
	import type { Project } from '../../types/general';
	import type { PageData } from './$types';

	export let data: PageData;

	let projects: Project[];
	$: if (data.projects) projects = data.projects as Project[];

	$: console.log(projects);
</script>

<MaxWidthWrapper>
	<main class="flex flex-col gap-6 pt-12">
		<span class="flex flex-col w-full gap-1">
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				My Bookmarks
			</h2>
			<p class="text-muted-foreground">
				Found an interesting project? Bookmark it so you can find it here!
			</p>
		</span>

		<ProjectsFeed supabase={data.supabase} {projects} />
	</main>
</MaxWidthWrapper>
