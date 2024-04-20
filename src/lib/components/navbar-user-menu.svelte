<script lang="ts">
	import { resetMode, setMode } from 'mode-watcher';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { githubUserData } from '../stores/store';
	import UserAvatar from './user-avatar.svelte';
	import { cn } from '$lib/utils';
	import { invalidateAll } from '$app/navigation';
	import { Bookmark, GithubIcon, Plus, User2 } from 'lucide-svelte';

	export let supabase: SupabaseClient<any, 'public', any>;

	// fix duplicate funciton perhaps
	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github'
		});
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		$githubUserData = null;
	}

	const userId = $page.data.user?.id;
</script>

{#if $page.data.session}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<UserAvatar size={10} />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>
				<p class="text-base font-bold text-secondary-foreground">@{$githubUserData?.login}</p>
				<p class="text-sm text-muted-foreground">{$githubUserData?.email}</p>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<span>Change theme</span>
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
					<DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
					<DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			<DropdownMenu.Separator />
			<DropdownMenu.Item class="flex cursor-pointer gap-2" href="/add-project">
				<Plus class="size-4" /> Add Project
			</DropdownMenu.Item>
			<DropdownMenu.Item class="flex cursor-pointer gap-2" href={`/users/${userId}`}>
				<User2 class="size-4" /> My Projects
			</DropdownMenu.Item>
			<DropdownMenu.Item class="cursor-pointer flex gap-2" href="/my-bookmarks">
				<Bookmark class="size-4"/> My Bookmarks
			</DropdownMenu.Item>

			<DropdownMenu.Separator />
			<Button
				class="w-full rounded-t-none p-0 leading-none"
				variant="destructive"
				on:click={signOut}>Log Out</Button
			>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<Button class="flex gap-3 text-sm" on:click={signInWithGithub}>
		<GithubIcon class="size-4" /> Sign in with GitHub
	</Button>
{/if}
