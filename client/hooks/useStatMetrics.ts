export interface StatMetrics {
  current: string;
  average: string;
  lastMatch: string;
  trend: string;
  insight: string;
}

export const useStatMetrics = (title: string, value: string | number): StatMetrics => {
  const metricsMap: Record<string, StatMetrics> = {
    'Possession': {
      current: '64%',
      average: '58%',
      lastMatch: '61%',
      trend: '+6% vs season avg',
      insight: 'Team is controlling the game effectively with strong midfield presence'
    },
    'Expected Goals (xG)': {
      current: '2.42',
      average: '1.85',
      lastMatch: '1.98',
      trend: '+0.57 above average',
      insight: 'Creating high-quality scoring opportunities, especially from inside the box'
    },
    'Pass Accuracy': {
      current: '91%',
      average: '87%',
      lastMatch: '89%',
      trend: '+4% improvement',
      insight: 'Exceptional ball retention and progressive passing in the final third'
    },
    'Total Shots': {
      current: '18',
      average: '14',
      lastMatch: '16',
      trend: '+4 shots above avg',
      insight: 'Aggressive attacking play with sustained pressure on opposition defense'
    },
  };

  return metricsMap[title] || {
    current: value.toString(),
    average: 'N/A',
    lastMatch: 'N/A',
    trend: 'N/A',
    insight: 'No additional data available'
  };
};
