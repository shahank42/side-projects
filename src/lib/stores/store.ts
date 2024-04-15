import { writable } from 'svelte/store';
import type { GithubUserData } from '../../types/octokit';


export const username = writable('');
export const githubUserData = writable<GithubUserData>();
