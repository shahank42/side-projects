<script lang="ts">
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };
</script>

<div class={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
	<slot />
</div>
