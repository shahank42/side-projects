<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient<any, 'public', any>;

	async function signOut() {
		const { error } = await supabase.auth.signOut();
	}
</script>

<Button on:click={signOut}>Sign Out</Button>
