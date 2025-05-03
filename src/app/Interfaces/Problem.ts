import { Example } from "./Example";

export interface Problem {
    id: number;
    title: string;
    difficulty: string;
    tags: string[];
    solvedCount: number;
    totalAttempts: number;
    description: string;
    examples: Example[];
    constraints: string[];
    initialCode: string;
  }