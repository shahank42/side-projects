<script lang="ts">
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<div class={cn('mx-auto w-full max-w-screen-xl px-4 md:px-24', className)}>
	<slot />
</div>