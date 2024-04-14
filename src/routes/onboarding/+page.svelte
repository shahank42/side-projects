<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import OnboardingForm from '$lib/components/onboarding-form.svelte';
	import UserAvatar from '$lib/components/user-avatar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MaxWidthWrapper>
	<main class="flex flex-col gap-6">
		<div>
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Almost there!
			</h2>
			<p class="text-sm leading-6 text-muted-foreground">We just need some details.</p>
		</div>

		<div class="flex w-full justify-center">
			<UserAvatar size={32} />
		</div>

		<OnboardingForm {data} />
	</main>
</MaxWidthWrapper>
