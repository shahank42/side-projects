export interface Project {
	created_at: string;
	description: string | null;
	github: string;
	id: string;
	owner: string;
	repo_name: string;
	title: string;
	github_forks: number;
	github_stars: number;
	github_last_commit: string;
	github_topics: string[] | undefined;
}
