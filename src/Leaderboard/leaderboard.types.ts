export interface Leaderboard {
  standings: UserStanding[]
}

export interface UserStanding {
  user: {
    name: string;
    id: string;
  }
  waffles: number;
  rank: number;
}