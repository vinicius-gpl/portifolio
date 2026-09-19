import { fetchGitHubUser } from '$lib/service/github.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const token = platform?.env?.GITHUB_TOKEN;
	const github = await fetchGitHubUser('vinicius-gpl', token);

	return { github };
};
