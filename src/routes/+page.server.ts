// import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Octokit } from 'octokit';
import { PUBLIC_GITHUB_PAT } from '$env/static/public';
import type { Project } from '../types/general';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (session) {
		const { data: dbProjects } = await supabase.from('projects').select();
		// console.log(dbProjects)

		const projects: Project[] = [];

		const octokit = new Octokit({
			auth: PUBLIC_GITHUB_PAT
		});

		if (dbProjects) {
			for (const project of dbProjects) {
				const projectDataResponse = await octokit.request('GET /repos/{owner}/{repo}', {
					owner: project.owner,
					repo: project.repo_name
				});

				projects.push({
					...project,
					github_forks: projectDataResponse.data.forks,
					github_stars: projectDataResponse.data.stargazers_count,
					github_last_commit: projectDataResponse.data.updated_at,
					github_topics: projectDataResponse.data.topics
				});
			}
		}

		return { projects }
	}
};
