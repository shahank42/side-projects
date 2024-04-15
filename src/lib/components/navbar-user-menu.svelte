<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { githubUserData } from '../stores/store';
	import UserAvatar from './user-avatar.svelte';
	import { cn } from '$lib/utils';

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
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>
				<p class="text-base font-bold text-primary">@{$githubUserData?.login}</p>
				<p class="text-sm text-muted-foreground">{$githubUserData?.email}</p>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="cursor-pointer">View Profile</DropdownMenu.Item>
			<DropdownMenu.Separator /> 
				<Button class="w-full p-0 leading-none" variant="outline" on:click={signOut}>Log Out</Button>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
