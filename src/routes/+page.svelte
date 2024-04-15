<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import ProjectsFeed from '$lib/components/projects-feed.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { githubUserData } from '$lib/stores/store';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session, githubUserData: ghUserData, projects } = data;
	$: ({ supabase, session, githubUserData: ghUserData, projects } = data);

	onMount(() => {
		invalidateAll();
	});

	// $username = session ? session.user.user_metadata.user_name : '';
	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
			// options: {
			// 	redirectTo: `${$page.url.origin}/onboarding`
			// }
		});

		if (ghUserData) $githubUserData = ghUserData;
	}

	// let projects: any;
	// const retrieveProjects = async () => {
	// 	const { data } = await supabase.from('projects').select();
	// 	projects = data;
	// 	for (const project of projects) {
	// 		const ghProjectDataReq = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo_name}`)
	// 		const ghProjectData = await ghProjectDataReq.json();
	// 		project.github_forks = ghProjectData.forks;
	// 		project.github_stars = ghProjectData.stargazers_count;
	// 		project.github_last_commit = ghProjectData.updated_at;
	// 		project.github_topics = ghProjectData.topics;

	// 	}
	// 	// console.log(projects)
	// }

	// $: if (session) retrieveProjects()
</script>

<MaxWidthWrapper>
	<main class="flex flex-col items-center gap-7">
		<div class="flex flex-col items-center gap-2">
			<span class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				SideProjects
			</span>
			<span class="text-center leading-7">
				The best place to showcase those old abandoned projects you spent days working on!
			</span>
		</div>

		{#if session}
			<Button size="lg">Add Project</Button>
			{#if projects}
				<ProjectsFeed {projects} />
			{/if}
		{:else}
			<Button size="lg" on:click={signInWithGithub}>Sign in with GitHub</Button>
		{/if}
	</main>
</MaxWidthWrapper>
