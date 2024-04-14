<script lang="ts">
	import '../app.pcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import {githubUserData} from "$lib/stores/store"

	export let data;

	let { supabase, session, user, githubUserData: ghUserData } = data;
	$: ({ supabase, session, user, githubUserData: ghUserData } = data);

	$githubUserData = ghUserData;
	
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
	<Navbar {supabase} />
	<div class="flex-1 flex-grow">
		<slot />
	</div>
</main>
