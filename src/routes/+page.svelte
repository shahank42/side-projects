<script>
	import GithubLoginButton from '$lib/components/github-login-button.svelte';
	import LogoutButton from '$lib/components/logout-button.svelte';
	import { username } from '../stores/store';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	// $username = session ? session.user.user_metadata.user_name : '';
</script>

{#if !session}
	<GithubLoginButton {supabase} />
{:else}
	<LogoutButton {supabase} />
{/if}
