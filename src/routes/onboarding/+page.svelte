<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import OnboardingForm from '$lib/components/onboarding-form.svelte';
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
			<p class="leading-6 text-sm text-muted-foreground">We just need some of your details.</p>
			<p class="leading-6 text-sm text-muted-foreground">
				Most of this stuff is auto-filled from your GitHub profile, however you may choose to edit
				as you see fit.
			</p>
		</div>

		<OnboardingForm data={data} />
	</main>
</MaxWidthWrapper>
