import { fetchProject } from "$lib/controllers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { owner, repo_name }, locals: { supabase }  }) => {
  return {
    project: await fetchProject(supabase, owner, repo_name)
  }
}