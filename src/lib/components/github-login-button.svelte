<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient<any, 'public', any>;

	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
	}
</script>

<Button on:click={signInWithGithub}>Sign In with GitHub!</Button>
