<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import ProjectsFeed from '$lib/components/projects-feed.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fetchGithubUserData } from '$lib/controllers';
	import { githubUserData } from '$lib/stores/store';
	import { cn } from '$lib/utils';
	import { GithubIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session, githubUserData: ghUserData, projects } = data;
	$: ({ supabase, session, githubUserData: ghUserData, projects } = data);

	onMount(() => {
		invalidateAll();
	});

	$: if (ghUserData) $githubUserData = ghUserData;

	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
	}
</script>

<MaxWidthWrapper>
	<main class="flex flex-col items-center gap-12 pb-20 pt-12">
		{#if !session}
			<div
				class="flex h-[60dvh] flex-col items-center justify-center gap-16 md:justify-start md:gap-0"
			>
				<div class="flex flex-col items-center justify-center gap-6 md:h-[40dvh]">
					<span class="scroll-m-20 text-balance text-5xl font-extrabold lg:text-7xl">
						SideProjects
					</span>
					<span class="text-center text-lg">
						The best place to showcase those old projects you spent days working on!
					</span>
				</div>

				{#if session}
					<a href="/add-project" class={cn(buttonVariants({ size: 'lg' }))}>Add Project</a>
				{:else}
					<Button size="lg" class="flex h-12 gap-3" on:click={signInWithGithub}
						><GithubIcon class="size-6" /> Sign in with GitHub</Button
					>
				{/if}
			</div>
		{/if}

		<div class="flex w-full flex-col gap-10">
			<span class="flex flex-col w-full gap-1">
				<h2
					class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
				>
					Latest Projects
				</h2>
				<p class="text-muted-foreground">
					Here you can see all the amazing side projects posted on this website.
				</p>
			</span>
			{#await projects}
				Loading projects...
			{:then projectsAwaited}
				{#if projectsAwaited}
					<ProjectsFeed {supabase} projects={projectsAwaited} />
				{/if}
			{:catch projectsLoadingError}
				Error loading projects!
				<pre>{projectsLoadingError}</pre>
			{/await}
		</div>
	</main>
</MaxWidthWrapper>
