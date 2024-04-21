<script lang="ts">
	import MaxWidthWrapper from './max-width-wrapper.svelte';
	import { cn } from '$lib/utils';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import NavbarUserMenu from './navbar-user-menu.svelte';
	import { githubUserData } from '../stores/store';
	import { page } from '$app/stores';
	import { buttonVariants } from './ui/button';

	export let supabase: SupabaseClient<any, 'public', any>;

	let showNavbar = false;
	$: showNavbar = $page.url.pathname.includes("users");
</script>

{#if $page.data.session || showNavbar}
	<header class="border-b border-input sticky top-0 bg-card">
		<MaxWidthWrapper>
			<div class="flex flex-wrap gap-4 items-center justify-between py-2 lg:py-5">
					<a href="/" class="scroll-m-20 text-2xl font-extrabold lg:text-4xl"> SideProjects </a>
					<NavbarUserMenu {supabase} />
			</div>
		</MaxWidthWrapper>
	</header>
{/if}
