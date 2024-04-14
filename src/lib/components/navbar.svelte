<script lang="ts">
	import MaxWidthWrapper from './max-width-wrapper.svelte';
	import { cn } from '$lib/utils';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import NavbarUserMenu from './navbar-user-menu.svelte';
	import { githubUserData } from '../stores/store';

	export let supabase: SupabaseClient<any, 'public', any>;
	// export let githubUserData: any;

	const showLogo = false;
	const showPfp = true;
</script>

<header>
	<MaxWidthWrapper>
		<div
			class={cn('flex h-20 items-center py-5', {
				'justify-between': showLogo,
				'justify-end': !showLogo
			})}
		>
			{#if showLogo}
				<span class="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl"
					>SideProjects</span
				>
			{/if}

			{#if showPfp}
				<NavbarUserMenu {supabase} />
			{/if}
		</div>
	</MaxWidthWrapper>
</header>
