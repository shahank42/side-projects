<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import AddProjectForm from '$lib/components/add-project-form.svelte';
	import UserAvatar from '$lib/components/user-avatar.svelte';
	import type { ActionData, PageData } from './$types';
  import { toast } from "svelte-sonner";
	import EditProjectForm from '$lib/components/edit-project-form.svelte';

	export let data: PageData;
  export let form: ActionData;

  $: if (form && form.message) toast(form.message)
</script>

<MaxWidthWrapper>
	<main class="flex flex-col gap-6 pb-20 pt-12">
		<div>
			<span class="flex flex-col w-full gap-1">
				<h2
					class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
				>
					Edit Project
				</h2>
				<p class="text-muted-foreground">
					Projects change, so be sure to reflect their updated status so that everyone can see!
				</p>
			</span>
		</div>

		<EditProjectForm {data} {form} />
	</main>
</MaxWidthWrapper>
