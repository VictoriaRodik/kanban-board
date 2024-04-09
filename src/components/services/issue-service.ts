import { Issue } from "../../store";

export async function fetchIssues(repoURL: string): Promise<Issue[]> {
    try {
      const urlParts = repoURL.split("/");
      const owner = urlParts[urlParts.length - 2];
      const repoName = urlParts[urlParts.length - 1];
  
      const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/issues`;
  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }
      const data = await response.json();
      console.log(data)
        return data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  }
  