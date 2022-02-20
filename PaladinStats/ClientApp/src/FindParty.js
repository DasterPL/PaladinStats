export default function FindParty(matchData) {
    const partyIds = matchData.map(match => match.PartyId);

    const partyIdsWithoutDuplicates = [...new Set(partyIds)]

    let duplicates = [...partyIds]
    partyIdsWithoutDuplicates.forEach((item) => {
        const i = duplicates.indexOf(item)
        duplicates = duplicates
            .slice(0, i)
            .concat(duplicates.slice(i + 1, duplicates.length))
    });

    const partyString = partyIds.map((id) => {
        if (duplicates.includes(id)) {
            return `Party ${duplicates.indexOf(id) + 1}`;
        } else {
            return 'Solo';
        }
    });

    return partyString;
}