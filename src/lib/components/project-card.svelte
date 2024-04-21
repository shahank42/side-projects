<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { cn, formatDate, formatDateWithAgo } from '$lib/utils';
	import type { Project } from '../../types/general';
	import Button from './ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import {
		Bookmark,
		BookmarkCheck,
		ExternalLink,
		GitFork,
		Heart,
		Share,
		Star,
		Trash2
	} from 'lucide-svelte';
	import { page } from '$app/stores';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from '../../types/supabase';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { buttonVariants } from './ui/button';

	export let project: Project;
	export let supabase: SupabaseClient<Database>;

	const topics = project.github_topics || [];

	let liked = false;
	$: liked = $page.data.session ? project.userHasLiked : false;

	let bookmarked = false;
	$: bookmarked = $page.data.session ? project.userHasBookmarked : false;

	let session: Session | null = null;
	$: session = $page.data.session;
	let interactionButtonsDisabled = true;
	$: interactionButtonsDisabled = session ? false : true;

	let openDeleteDialog = false;

	let isLiking = false;
	let isBookmarking = false;

	const handleLikeButtonClick = async () => {
		if (session) {
			isLiking = true;
			if (project.userHasLiked) {
				// console.log({ project_id: project.id, user_id: $page.data.session?.user.id as string });
				// delete from likes table
				const { error } = await supabase
					.from('likes')
					.delete()
					.match({ project_id: project.id, user_id: session.user.id });
				if (!error) {
					await invalidateAll();
					toast(`Unliked ${project.title}`);
					isLiking = false;
				} else {
					console.error(error);
				}
			} else {
				// add to likes table
				const { error } = await supabase
					.from('likes')
					.insert({ user_id: session.user.id, project_id: project.id });
				if (!error) {
					await invalidateAll();
					toast(`Liked ${project.title}!`);
					isLiking = false;
				} else {
					console.error(error);
				}
			}
		}
	};

	const handleBookmarkButtonClick = async () => {
		if (session) {
			isBookmarking = true;
			if (project.userHasBookmarked) {
				const { error } = await supabase
					.from('bookmarks')
					.delete()
					.match({ project_id: project.id, user_id: session.user.id });
				if (!error) {
					await invalidateAll();
					toast(`Removed ${project.title} from bookmarks`);
					isBookmarking = false;
				} else {
					console.error(error);
				}
			} else {
				const { error } = await supabase
					.from('bookmarks')
					.insert({ user_id: session.user.id, project_id: project.id });
				if (!error) {
					await invalidateAll();
					toast(`Added ${project.title} to bookmarks`);
					isBookmarking = false;
				} else {
					console.error(error);
				}
			}
		}
	};

	const handleDeleteClick = async () => {
		if (session) {
			const { error } = await supabase.from('projects').delete().match({ id: project.id });
			if (!error) {
				await invalidateAll();
				toast(`Deleted project ${project.title}`);
			} else {
				console.error(error);
			}
		}
	};
</script>

<Card.Root class="flex max-w-full flex-col md:flex-row-reverse md:items-center md:justify-end">
	<!-- <Card.Content>
		<p>A picture ig</p>
	</Card.Content> -->

	<!-- <Dialog.Root>
		<Dialog.Trigger class="h-full w-full overflow-hidden rounded-t-lg md:hidden">
			<img
				src="https://blog.logrocket.com/wp-content/uploads/2023/10/dynamic-property-assignment-using-type-assertion.png"
				alt="an apple"
				class="h-48 w-full object-cover transition-all hover:scale-105"
			/>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header class="flex flex-col gap-4">
				<Dialog.Title>{project.title}</Dialog.Title>
				<img
					src="https://blog.logrocket.com/wp-content/uploads/2023/10/dynamic-property-assignment-using-type-assertion.png"
					alt="cover"
					class="object-cover"
				/>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root> -->

	<!-- <div class="flex flex-col md:w-7/12"> -->
	<div class="flex w-full flex-col">
		<Card.Header>
			<span class="text-xs text-muted-foreground"
				>Created by @{project.owner} on {formatDate(project.createdAt)}</span
			>

			<Card.Title>
				<h1 class="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
					{project.title}
				</h1>
			</Card.Title>

			<Card.Description class="text-foreground">{project.description}</Card.Description>
		</Card.Header>

		<Card.Content class="flex w-full flex-col gap-3">
			<div class="flex flex-col gap-3 sm:w-full sm:flex-row sm:justify-between">
				<span
					class="justify center flex w-fit items-center gap-1.5 rounded-full border border-input px-4 py-1 text-sm text-accent-foreground"
				>
					<div
						class={cn('size-2 rounded-full', {
							'bg-red-600': project.status === 'Abandoned',
							'bg-green-600': project.status === 'Developing',
							'bg-orange-600': project.status === 'On Hold',
							'bg-blue-600': project.status === 'Completed'
						})}
					/>
					{project.status}
				</span>

				<div class="flex justify-start gap-2">
					<span
						class="flex items-center gap-2 rounded-lg bg-yellow-300 px-3 py-2 text-sm text-secondary-foreground dark:text-accent"
					>
						<Star class="size-4" />
						{project.github_stars}
					</span>
					<span
						class="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm text-primary-foreground"
					>
						<GitFork class="size-4" />
						{project.github_forks}
					</span>
				</div>
			</div>
			<div class="flex flex-col gap-8">
				<div
					class="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:items-end"
				>
					<div class="flex w-full justify-start">
						<span class="text-sm">
							<span class="font-semibold">Last commit: </span>
							{formatDateWithAgo(project.github_last_commit)}</span
						>
					</div>
					<a
						href={project.githubRepoLink}
						target="_blank"
						class={cn(buttonVariants({ variant: 'secondary' }), 'flex w-full gap-2 py-2 sm:w-fit')}
					>
						View on GitHub <ExternalLink class="size-4" />
					</a>
				</div>

				<div class="flex flex-wrap items-center gap-2">
					<span class="inline text-sm">Tags:</span>
					{#if topics.length !== 0}
						{#each topics as topic}
							<a href={`https://github.com/topics/${topic}`} target="_blank" class="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{topic}</a>
						{/each}
					{:else}
						<span class="inline text-sm text-muted-foreground">No tags found!</span>
					{/if}
				</div>
			</div>
		</Card.Content>
	</div>

	<Card.Footer class="flex flex-col items-center justify-between gap-4 md:h-full md:pt-6">
		<!-- <Card.Footer class="flex flex-col items-center justify-between gap-4 pt-6 md:h-full md:w-5/12"> -->
		<!-- <Dialog.Root>
			<Dialog.Trigger class="h-full overflow-hidden rounded-lg">
				<img
					src="https://blog.logrocket.com/wp-content/uploads/2023/10/dynamic-property-assignment-using-type-assertion.png"
					alt="an apple"
					class="hidden min-h-full scale-110 object-cover transition-all hover:scale-100 md:block"
				/>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header class="flex flex-col gap-4">
					<Dialog.Title>{project.title}</Dialog.Title>
					<img
						src="https://blog.logrocket.com/wp-content/uploads/2023/10/dynamic-property-assignment-using-type-assertion.png"
						alt="cover"
						class="object-cover"
					/>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root> -->

		<!-- <div class="flex w-full justify-between gap-6 md:gap-8"> -->
		<div class="flex h-full w-full flex-row justify-start gap-4 md:flex-col md:gap-6">
			<Button
				variant={liked ? 'secondary' : 'outline'}
				on:click={handleLikeButtonClick}
				class="flex h-10 w-20 gap-2 p-1 sm:w-36 md:h-12 md:w-20"
				disabled={interactionButtonsDisabled || isLiking}
			>
				<Heart class="size-4" />
				{project.likesNumber}
			</Button>

			{#if session}
				<Button
					variant={bookmarked ? 'secondary' : 'outline'}
					disabled={interactionButtonsDisabled || isBookmarking}
					on:click={handleBookmarkButtonClick}
					class="h-10 w-20 p-1 sm:w-36 md:h-12 md:w-20"
				>
					{#if bookmarked}
						<BookmarkCheck class="size-4" />
					{:else}
						<Bookmark class="size-4" />
					{/if}
				</Button>
			{/if}
			<!-- <Button variant="outline" class="h-10 w-20 p-1 sm:w-36 md:h-12 md:w-20">
				<Share class="size-4" />
			</Button> -->

			{#if project.user_id === session?.user.id}
				<Dialog.Root bind:open={openDeleteDialog}>
					<Dialog.Trigger>
						<Button variant="destructive" class="h-10 w-20 p-1 sm:w-36 md:h-12 md:w-20">
							<Trash2 class="size-4" />
						</Button>
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Delete {project.title}?</Dialog.Title>
							<Dialog.Description>
								This will permanently delete this project from our server. No take-backs.
							</Dialog.Description>
							<Dialog.Footer class="pt-5">
								<Button
									type="submit"
									variant="destructive"
									class="flex gap-2"
									on:click={async () => {
										await handleDeleteClick();
										openDeleteDialog = false;
									}}
								>
									<Trash2 class="size-4" /> I'm sure, delete it
								</Button>
							</Dialog.Footer>
						</Dialog.Header>
					</Dialog.Content>
				</Dialog.Root>
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
