<script>
	import GithubLoginButton from '$lib/components/github-login-button.svelte';
	import LogoutButton from '$lib/components/logout-button.svelte';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

{#if !session}
	<GithubLoginButton {supabase} />
{:else}
	<LogoutButton {supabase} />
{/if}
