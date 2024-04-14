import { writable } from 'svelte/store';

export const username = writable('');
export const githubUserData = writable<{
	name: string;
	login: string;
	avatar_url: string;
	twitter_username: string;
	bio: string;
} | null>();
