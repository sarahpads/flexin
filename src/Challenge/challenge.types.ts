export interface Challenge {
  id: string,
  expiresAt: string,
  createdAt: string,
  flex: number,
  reps: number,
  exercise: {
    title: string;
    id: string;
  },
  user: { id: string, name: string }
  responses: Response[]
}

export interface Response {
  user: {
    name: string;
    id: string;
  };
  reps: number;
  flex: number;
}