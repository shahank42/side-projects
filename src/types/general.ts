export interface Project {
	createdAt: string;
	description: string | null;
	githubRepoLink: string;
	id: string;
	user_id: string;
	owner: string;
	title: string;
  status: string;
	github_forks: number;
	github_stars: number;
	github_last_commit: string;
	github_topics: string[] | undefined;
	likesNumber: number;
	userHasLiked: boolean;
	bookmarksNumber: number;
	userHasBookmarked: boolean;
}
