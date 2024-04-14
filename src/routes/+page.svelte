<script>
	import { page } from '$app/stores';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { githubUserData } from '$lib/stores/store';

	export let data;
	let { supabase, session, githubUserData: ghUserData } = data;
	$: ({ supabase, session, githubUserData: ghUserData } = data);

	// $username = session ? session.user.user_metadata.user_name : '';
	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			// options: {
			// 	redirectTo: `${$page.url.origin}/onboarding`
			// }
		});

		$githubUserData = ghUserData
	}
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
		{:else}
			<Button size="lg" on:click={signInWithGithub}>Sign in with GitHub</Button>
		{/if}
	</main>
</MaxWidthWrapper>
