<script lang="ts">
	import MaxWidthWrapper from './max-width-wrapper.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	export let githubUserData: any;

	const {
		avatar_url: avatarUrl,
		name,
		user_name: username
	}: { avatar_url: string; name: string; user_name: string } = githubUserData;

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
			{#if showPfp && $page.data.session}
				<Avatar.Root>
					<Avatar.Image src={avatarUrl} alt={username} />
					<Avatar.Fallback
						>{name
							.split(' ')
							.map((word) => word.charAt(0).toUpperCase())
							.join('')}</Avatar.Fallback
					>
				</Avatar.Root>
			{/if}
		</div>
	</MaxWidthWrapper>
</header>
