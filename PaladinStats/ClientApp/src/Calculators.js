export function KdaCalculator(kills, deaths, assists) {
    return parseFloat((kills + (assists / 2)) / (deaths === 0 ? 1 : deaths)).toFixed(2);
}
export function WinRateCalculator(wins, losses) {
    return parseFloat(wins / (wins + losses) * 100).toFixed(2);
}