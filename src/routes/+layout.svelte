<script lang="ts">
	import '../app.pcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';

	export let data;

	let { supabase, session, user, githubUserData } = data;
	$: ({ supabase, session, user, githubUserData } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>SideProjects</title>
</svelte:head>

<main class="relative flex min-h-screen flex-col">
	<Navbar {githubUserData} />
	<div class="flex-1 flex-grow">
		<slot />
	</div>
</main>
