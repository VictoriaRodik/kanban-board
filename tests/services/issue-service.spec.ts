import { fetchIssues } from "../../src/services/issue-service";
import { describe, expect, it } from 'vitest';

describe('fetchIssues', () => {
  it('Should fetch issues from GitHub API', async () => {
    const repoURL = "https://github.com/facebook/react";
    const issues = await fetchIssues(repoURL);

    expect(issues).toBeDefined();
    expect(Array.isArray(issues)).toBe(true);
    expect(issues.length).toBeGreaterThan(0);

    issues.forEach(issue => {
      expect(issue).toHaveProperty('title');
      expect(issue).toHaveProperty('body');
    });
  });

  it('Should throw an error for invalid repo URL', async () => {
    const invalidRepoURL = 'https://github.com/invalid/repo';
    await expect(fetchIssues(invalidRepoURL)).rejects.toThrow();
  });
});
