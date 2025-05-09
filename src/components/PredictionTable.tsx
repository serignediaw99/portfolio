'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface MatchPrediction {
  homeTeam: string;
  awayTeam: string;
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  expectedHomeGoals: number;
  expectedAwayGoals: number;
  homeTeamLogo: string;
  awayTeamLogo: string;
}

const predictions: MatchPrediction[] = [
  {
    homeTeam: 'Wolverhampton-Wanderers',
    awayTeam: 'Arsenal',
    homeWinProb: 0.219250,
    drawProb: 0.202750,
    awayWinProb: 0.578000,
    expectedHomeGoals: 1.206537,
    expectedAwayGoals: 2.117472,
    homeTeamLogo: '/logos/wolves.png',
    awayTeamLogo: '/logos/arsenal.png',
  },
  {
    homeTeam: 'Southampton',
    awayTeam: 'Newcastle-United',
    homeWinProb: 0.256875,
    drawProb: 0.277250,
    awayWinProb: 0.465875,
    expectedHomeGoals: 0.872440,
    expectedAwayGoals: 1.292208,
    homeTeamLogo: '/logos/southampton.png',
    awayTeamLogo: '/logos/newcastle.png',
  },
  {
    homeTeam: 'Brighton-and-Hove-Albion',
    awayTeam: 'Everton',
    homeWinProb: 0.552750,
    drawProb: 0.245125,
    awayWinProb: 0.202125,
    expectedHomeGoals: 1.692623,
    expectedAwayGoals: 0.871897,
    homeTeamLogo: '/logos/brighton.png',
    awayTeamLogo: '/logos/everton.png',
  },
  {
    homeTeam: 'Liverpool',
    awayTeam: 'Ipswich-Town',
    homeWinProb: 0.773875,
    drawProb: 0.144875,
    awayWinProb: 0.081250,
    expectedHomeGoals: 2.651373,
    expectedAwayGoals: 0.686865,
    homeTeamLogo: '/logos/liverpool.png',
    awayTeamLogo: '/logos/ipswich.png',
  },
  {
    homeTeam: 'Bournemouth',
    awayTeam: 'Nottingham-Forest',
    homeWinProb: 0.412125,
    drawProb: 0.270375,
    awayWinProb: 0.317500,
    expectedHomeGoals: 1.234465,
    expectedAwayGoals: 1.033582,
    homeTeamLogo: '/logos/bournemouth.png',
    awayTeamLogo: '/logos/forest.png',
  },
  {
    homeTeam: 'Manchester-City',
    awayTeam: 'Chelsea',
    homeWinProb: 0.700250,
    drawProb: 0.144625,
    awayWinProb: 0.155125,
    expectedHomeGoals: 3.188405,
    expectedAwayGoals: 1.427086,
    homeTeamLogo: '/logos/mancity.png',
    awayTeamLogo: '/logos/chelsea.png',
  },
  {
    homeTeam: 'Crystal-Palace',
    awayTeam: 'Brentford',
    homeWinProb: 0.585375,
    drawProb: 0.206875,
    awayWinProb: 0.207750,
    expectedHomeGoals: 2.138934,
    expectedAwayGoals: 1.156027,
    homeTeamLogo: '/logos/palace.png',
    awayTeamLogo: '/logos/brentford.png',
  },
  {
    homeTeam: 'Tottenham-Hotspur',
    awayTeam: 'Leicester-City',
    homeWinProb: 0.638125,
    drawProb: 0.213125,
    awayWinProb: 0.148750,
    expectedHomeGoals: 1.990956,
    expectedAwayGoals: 0.788238,
    homeTeamLogo: '/logos/tottenham.png',
    awayTeamLogo: '/logos/leicester.png',
  },
  {
    homeTeam: 'Aston-Villa',
    awayTeam: 'West-Ham-United',
    homeWinProb: 0.415375,
    drawProb: 0.270500,
    awayWinProb: 0.314125,
    expectedHomeGoals: 1.330822,
    expectedAwayGoals: 1.119448,
    homeTeamLogo: '/logos/villa.png',
    awayTeamLogo: '/logos/westham.png',
  },
  {
    homeTeam: 'Fulham',
    awayTeam: 'Manchester-United',
    homeWinProb: 0.456875,
    drawProb: 0.258125,
    awayWinProb: 0.285000,
    expectedHomeGoals: 1.484614,
    expectedAwayGoals: 1.069454,
    homeTeamLogo: '/logos/fulham.png',
    awayTeamLogo: '/logos/manutd.png',
  }
];

export default function PredictionTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="h-full overflow-y-auto bg-stone-50 dark:bg-stone-800">
        <table className="w-full divide-y divide-stone-200 dark:divide-stone-700 [&_tr]:border-b [&_tr]:border-stone-200 [&_tr]:dark:border-stone-700 [&_tr]:border-b-[0.5px]">
          <thead className="bg-stone-100 dark:bg-stone-700 sticky top-0 z-10">
            <tr>
              <th className="w-[200px] px-2 py-1.5 text-left text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider border-b border-stone-200 dark:border-stone-700 border-b-[0.5px]">Match</th>
              <th className="w-[85px] px-2 py-1.5 text-center text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider border-b border-stone-200 dark:border-stone-700 border-b-[0.5px]">Win</th>
              <th className="w-[85px] px-2 py-1.5 text-center text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider border-b border-stone-200 dark:border-stone-700 border-b-[0.5px]">Draw</th>
              <th className="w-[85px] px-2 py-1.5 text-center text-xs font-medium text-stone-500 dark:text-stone-300 uppercase tracking-wider border-b border-stone-200 dark:border-stone-700 border-b-[0.5px]">xG</th>
            </tr>
          </thead>
          <tbody className="bg-stone-50 dark:bg-stone-800 divide-y divide-stone-200 dark:divide-stone-700">
            {predictions.map((prediction, index) => (
              <tr key={index} className="hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200">
                <td className="w-[200px] px-2 py-2 whitespace-nowrap text-xs text-stone-900 dark:text-stone-100">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 relative">
                        <Image
                          src={prediction.homeTeamLogo}
                          alt={prediction.homeTeam}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{prediction.homeTeam}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-stone-500 dark:text-stone-400 ml-6">vs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 relative">
                        <Image
                          src={prediction.awayTeamLogo}
                          alt={prediction.awayTeam}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{prediction.awayTeam}</span>
                    </div>
                  </div>
                </td>
                <td className="w-[85px] px-2 py-2 whitespace-nowrap text-xs text-center">
                  <div className="flex flex-col space-y-1">
                    <span className="text-green-600 dark:text-green-400 font-medium">{(prediction.homeWinProb * 100).toFixed(1)}%</span>
                    <span className="text-red-600 dark:text-red-400 font-medium">{(prediction.awayWinProb * 100).toFixed(1)}%</span>
                  </div>
                </td>
                <td className="w-[85px] px-2 py-2 whitespace-nowrap text-xs text-center text-stone-900 dark:text-stone-100 font-medium">
                  {(prediction.drawProb * 100).toFixed(1)}%
                </td>
                <td className="w-[85px] px-2 py-2 whitespace-nowrap text-xs text-center">
                  <div className="flex flex-col space-y-1">
                    <span className="text-stone-900 dark:text-stone-100 font-medium">{prediction.expectedHomeGoals.toFixed(1)}</span>
                    <span className="text-stone-500 dark:text-stone-400">-</span>
                    <span className="text-stone-900 dark:text-stone-100 font-medium">{prediction.expectedAwayGoals.toFixed(1)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 