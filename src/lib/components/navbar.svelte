<script lang="ts">
	import MaxWidthWrapper from './max-width-wrapper.svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	export let githubUserData: any;

	const {
		avatar_url: avatarUrl,
		name,
		user_name: username
	}: { avatar_url: string; name: string; user_name: string } = githubUserData;
</script>

<header>
	<MaxWidthWrapper>
		<div class="flex items-center justify-between py-3">
			<span class="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">SideProjects</span
			>

			<Avatar.Root>
				<Avatar.Image src={avatarUrl} alt={username} />
				<Avatar.Fallback
					>{name
						.split(' ')
						.map((word) => word.charAt(0).toUpperCase())
						.join('')}</Avatar.Fallback
				>
			</Avatar.Root>
		</div>
	</MaxWidthWrapper>
</header>
