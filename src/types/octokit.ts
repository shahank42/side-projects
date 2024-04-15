import type { Endpoints } from "@octokit/types"

export type GithubUserData = Endpoints["GET /users/{username}"]["response"]["data"]