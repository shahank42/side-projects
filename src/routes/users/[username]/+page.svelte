<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import ProjectsFeed from '$lib/components/projects-feed.svelte';
	import type { Session } from '@supabase/supabase-js';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';

	export let data: PageData;

	let session: Session | null = null;
	$: session = data.session;
	// const viewerIsUser = data.userId === session?.user.id;
	// data.projects = []
</script>

<MaxWidthWrapper>
	<main class="flex flex-col items-center gap-12 pb-20 pt-12">
		<div class="flex w-full flex-col gap-12">
			<div
				class="flex flex-col items-start gap-4 md:w-full md:flex-row md:items-end md:justify-between"
			>
				<span class="flex flex-col justify-between">
					<h2
						class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
					>
						{`@${data.username}'s`} Projects
					</h2>
					{#if data.projects.length === 0}
						<span class="">You have no projects! Try adding one.</span>
					{/if}
				</span>
				{#if session}
					<a
						href="/add-project"
						class={cn(
							buttonVariants({ variant: 'default' }),
							'flex h-12 w-full items-center gap-2 md:w-fit'
						)}><Plus class="size-5" /> Add Project</a
					>
				{/if}
			</div>

			{#if data.projects.length !== 0}
				<ProjectsFeed supabase={data.supabase} projects={data.projects} />
			{/if}
		</div>
	</main>
</MaxWidthWrapper>
