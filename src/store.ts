import { create } from 'zustand';


export interface Issue {
  id: number;
  title: string;
  number: number;
  comments: number;
  user: { login: string };
  created_at: Date;
  opened: string;
  assignee: {id: number};
  state: string;
}

interface StoreState {
  repoURL: string;
  isLoading: boolean;
  issues: Issue[]; 
  setRepoURL: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setIssues: (issues: Issue[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  repoURL: '',
  isLoading: false,
  issues: [], 
  setRepoURL: (url: string) => set({ repoURL: url }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setIssues: (issues: Issue[]) => set({ issues: issues }) 
}));
