import { PUBLIC_GITHUB_PAT } from '$env/static/public';
import type { Project } from '../types/general';
import { Octokit } from 'octokit';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { getOwnerAndRepoNameFromGithubUrl } from './utils';

export const fetchBookmarks = async (supabase: SupabaseClient<Database>, currentUserId: string) => {
	const { data: bookmarks } = await supabase
		.from('bookmarks')
		.select('*, projects(*)')
		.eq('user_id', currentUserId)
		.order('createdAt', { ascending: false });
	const octokit = new Octokit({
		auth: PUBLIC_GITHUB_PAT
	});

	const projects: Project[] = [];

	if (bookmarks) {
		const bookmarkedProjects = bookmarks?.map((bookmark) => bookmark.projects);
		for (const project of bookmarkedProjects) {
			if (project) {
				const parsedUrl = getOwnerAndRepoNameFromGithubUrl(project.githubRepoLink);
				console.log(parsedUrl);
				const projectDataResponse = await octokit.request('GET /repos/{owner}/{repo}', {
					owner: parsedUrl?.owner as string,
					repo: parsedUrl?.repoName as string
				});

				const { data: likes } = await supabase
					.from('likes')
					.select()
					.eq('user_id', currentUserId)
					.eq('project_id', project.id)
					.order('created_at', { ascending: false });

				projects.push({
					...project,
					userHasBookmarked: true,
					bookmarksNumber: 69, // doesn't matter
					userHasLiked: currentUserId
						? likes?.map((like) => like.user_id === currentUserId).length === 0
							? false
							: true
						: false,
					likesNumber: likes ? likes.length : 0,
					github_forks: projectDataResponse.data.forks,
					github_stars: projectDataResponse.data.stargazers_count,
					github_last_commit: projectDataResponse.data.updated_at,
					github_topics: projectDataResponse.data.topics
				});
			}
		}
	}

	return projects;
};

export const fetchProjects = async (supabase: SupabaseClient<Database>, currentUserId?: string) => {
	const { data: dbProjects } = await supabase
		.from('projects')
		.select('*, likes(*), bookmarks(*)')
		.order('createdAt', { ascending: false });

	const projects: Project[] = [];

	const octokit = new Octokit({
		auth: PUBLIC_GITHUB_PAT
	});

	if (dbProjects) {
		for (const project of dbProjects) {
			const parsedUrl = getOwnerAndRepoNameFromGithubUrl(project.githubRepoLink);
			console.log(parsedUrl);
			const projectDataResponse = await octokit.request('GET /repos/{owner}/{repo}', {
				owner: parsedUrl?.owner as string,
				repo: parsedUrl?.repoName as string
			});

			projects.push({
				...project,
				userHasBookmarked: currentUserId
					? project.bookmarks.map((bookmark) => bookmark.user_id === currentUserId).length === 0
						? false
						: true
					: false,
				bookmarksNumber: project.bookmarks.length,
				userHasLiked: currentUserId
					? project.likes.map((like) => like.user_id === currentUserId).length === 0
						? false
						: true
					: false,
				likesNumber: project.likes.length,
				github_forks: projectDataResponse.data.forks,
				github_stars: projectDataResponse.data.stargazers_count,
				github_last_commit: projectDataResponse.data.updated_at,
				github_topics: projectDataResponse.data.topics
			});
		}
	}

	return projects;
};

export const fetchProjectsOfUser = async (supabase: SupabaseClient<Database>, userId: string) => {
	const { data: dbProjects } = await supabase
		.from('projects')
		.select('*, likes(*), bookmarks(*)')
		.eq('user_id', userId)
		.order('createdAt', { ascending: false });

	const projects: Project[] = [];

	const octokit = new Octokit({
		auth: PUBLIC_GITHUB_PAT
	});

	if (dbProjects) {
		for (const project of dbProjects) {
			const parsedUrl = getOwnerAndRepoNameFromGithubUrl(project.githubRepoLink);
			console.log(parsedUrl);
			const projectDataResponse = await octokit.request('GET /repos/{owner}/{repo}', {
				owner: parsedUrl?.owner as string,
				repo: parsedUrl?.repoName as string
			});

			projects.push({
				...project,
				userHasBookmarked: userId
					? project.bookmarks.map((bookmark) => bookmark.user_id === userId).length === 0
						? false
						: true
					: false,
				bookmarksNumber: project.bookmarks.length,
				userHasLiked: userId
					? project.likes.map((like) => like.user_id === userId).length === 0
						? false
						: true
					: false,
				likesNumber: project.likes.length,
				github_forks: projectDataResponse.data.forks,
				github_stars: projectDataResponse.data.stargazers_count,
				github_last_commit: projectDataResponse.data.updated_at,
				github_topics: projectDataResponse.data.topics
			});
		}
	}

	return projects;
};

export const fetchProject = async (
	supabase: SupabaseClient<Database>,
	owner: string,
	repo_name: string
) => {
	const { data: dbProject } = await supabase
		.from('projects')
		.select()
		.eq('owner', owner)
		.eq('repo_name', repo_name);
	// console.log(dbProjects)

	let project: Project = {} as Project;

	const octokit = new Octokit({
		auth: PUBLIC_GITHUB_PAT
	});

	if (dbProject) {
		const projectDataResponse = await octokit.request('GET /repos/{owner}/{repo}', {
			owner: owner,
			repo: repo_name
		});

		project = {
			...dbProject[0],
			likesNumber: 69, // doesn't really matter here, just satisfying the ts compiler
			bookmarksNumber: 69, // doesn't really matter here, just satisfying the ts compiler
			userHasLiked: false, // i'll prolly think of something better later in the fututre
			userHasBookmarked: false, // i'll prolly think of something better later in the fututre
			github_forks: projectDataResponse.data.forks,
			github_stars: projectDataResponse.data.stargazers_count,
			github_last_commit: projectDataResponse.data.updated_at,
			github_topics: projectDataResponse.data.topics
		};

		return project;
	}
};

export const fetchGithubRepoData = async (githubRepoLink: string) => {
	const parsedUrl = getOwnerAndRepoNameFromGithubUrl(githubRepoLink);
	const octokit = new Octokit({ auth: PUBLIC_GITHUB_PAT });
	return await octokit.request('GET /repos/{owner}/{repo}', {
		owner: parsedUrl?.owner as string,
		repo: parsedUrl?.repoName as string
	});
};

export const fetchGithubUserData = async (username: string) => {
	const octokit = new Octokit({
		auth: PUBLIC_GITHUB_PAT
	});
	// const githubUserData: GithubUserData;
	const githubUserDataReq = await octokit.request('GET /users/{username}', {
		username
	});
	const githubUserData = githubUserDataReq.data;
	return githubUserData;
};
