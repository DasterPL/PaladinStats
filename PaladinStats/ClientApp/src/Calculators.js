export function KdaCalculator(kills, deaths, assists) {
    return parseFloat((kills + (assists / 2)) / (deaths === 0 ? 1 : deaths)).toFixed(2);
}
export function WinRateCalculator(wins, losses) {
    if (wins + losses === 0) {
        return null;
    }
    return parseFloat(wins / (wins + losses) * 100).toFixed(2);
}
export function CalculateLocalTime(time) {
    const timeUTC = new Date(time);
    const datetime = new Date(Date.UTC(timeUTC.getFullYear(), timeUTC.getMonth(), timeUTC.getDate(), timeUTC.getHours(), timeUTC.getMinutes(), timeUTC.getSeconds()));
    return datetime;
}