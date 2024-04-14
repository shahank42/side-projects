<script lang="ts">
	import MaxWidthWrapper from './max-width-wrapper.svelte';
	import { cn } from '$lib/utils';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import NavbarUserMenu from './navbar-user-menu.svelte';
	import { githubUserData } from '../stores/store';
	import { page } from '$app/stores';

	export let supabase: SupabaseClient<any, 'public', any>;

	let showNavbar = false;
	$: showNavbar = $page.url.pathname !== "/onboarding";
</script>

<header>
	<MaxWidthWrapper>
		<div class="flex h-20 items-center justify-end py-5">
			{#if showNavbar}
			<NavbarUserMenu {supabase} />
			{/if}
		</div>
	</MaxWidthWrapper>
</header>
