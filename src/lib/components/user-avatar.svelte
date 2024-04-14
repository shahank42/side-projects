<script lang="ts">
	import { githubUserData } from '$lib/stores/store';
	import * as Avatar from '$lib/components/ui/avatar';

	export let size = 10;

	const avatarUrl: string = $githubUserData?.avatar_url as string;
	const username: string = $githubUserData?.login as string;
	const name: string = $githubUserData?.name as string;
</script>

<Avatar.Root class={`w-${size} h-${size} lg:w-${size * 2} lg:h-${size * 2}`}>
	<Avatar.Image src={avatarUrl} alt={username} />
	<Avatar.Fallback>AV</Avatar.Fallback>
</Avatar.Root>
