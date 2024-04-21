<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import MaxWidthWrapper from './max-width-wrapper.svelte';
</script>

<footer class="border-t border-input py-5">
	<MaxWidthWrapper class="flex w-full justify-center">
		<span class="text-muted-foreground">
			Created by <a href="https://github.com/shahank42">shahank42</a> for the
			<a href="https://supabase.com/blog/supabase-oss-hackathon">
				Supabase Open Source Hackathon 2024
			</a>
		</span>
	</MaxWidthWrapper>
</footer>
