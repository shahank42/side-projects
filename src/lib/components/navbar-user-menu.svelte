<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { githubUserData } from '../stores/store';
	import UserAvatar from './user-avatar.svelte';

	export let supabase: SupabaseClient<any, 'public', any>;

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		$githubUserData = null;
	}
</script>

{#if $page.data.session}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<UserAvatar size={10} />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Item class="cursor-pointer">Profile</DropdownMenu.Item>
				<DropdownMenu.Item on:click={signOut} class="cursor-pointer">Log out</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
