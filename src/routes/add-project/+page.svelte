<script lang="ts">
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import AddProjectForm from '$lib/components/add-project-form.svelte';
	import UserAvatar from '$lib/components/user-avatar.svelte';
	import type { ActionData, PageData } from './$types';
  import { toast } from "svelte-sonner";

	export let data: PageData;
  export let form: ActionData;

  $: if (form && form.message) toast(form.message)
</script>

<MaxWidthWrapper>
	<main class="flex flex-col gap-6 pt-12">
		<div>
			<h2
				class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Add your side project
			</h2>
		</div>

		<AddProjectForm {data} />
	</main>
</MaxWidthWrapper>
