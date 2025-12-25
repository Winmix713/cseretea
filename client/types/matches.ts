export interface BTTSData {
  round: number;
  bttsCount: number;
}

export interface LeagueTeam {
  position: number;
  name: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  form: string[];
}
