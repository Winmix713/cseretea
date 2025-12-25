import { useState, useEffect } from 'react';
import { BTTSData, LeagueTeam } from '../types/matches';

export const useMatchData = () => {
  const [loading, setLoading] = useState(true);

  const bttsData: BTTSData[] = Array.from({ length: 30 }, (_, i) => ({
    round: i + 1,
    bttsCount: Math.min(Math.floor(Math.random() * 9), 8)
  }));

  const leagueTable: LeagueTeam[] = [
    { position: 1, name: 'Liverpool', wins: 8, draws: 0, losses: 0, points: 24, form: ['W','W','W','W','W'] },
    { position: 2, name: 'Man City', wins: 5, draws: 1, losses: 2, points: 16, form: ['W','L','W','D','W'] },
    { position: 3, name: 'Arsenal', wins: 4, draws: 3, losses: 1, points: 15, form: ['D','W','D','W','L'] },
    { position: 4, name: 'Leicester', wins: 4, draws: 2, losses: 2, points: 14, form: ['L','W','W','L','D'] },
    { position: 5, name: 'Chelsea', wins: 4, draws: 2, losses: 2, points: 14, form: ['W','W','L','D','W'] },
    { position: 6, name: 'C. Palace', wins: 4, draws: 2, losses: 2, points: 14, form: ['D','L','W','W','L'] },
    { position: 7, name: 'Burnley', wins: 3, draws: 3, losses: 2, points: 12, form: ['L','D','D','W','W'] },
    { position: 8, name: 'West Ham', wins: 3, draws: 2, losses: 3, points: 11, form: ['W','L','L','D','W'] },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return { loading, bttsData, leagueTable };
};
