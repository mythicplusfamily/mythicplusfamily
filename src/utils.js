export function buildRaiderIOUrl(player) {
  const { realm, region, name } = player.character;

  return `https://raider.io/characters/${region.slug}/${realm.slug}/${name}`;
}

export function filterByRating(rating) {
  return (player) => {
    const isNotInactive = player.rank !== 6;
    const isNotAlt = player.rank !== 7;
    const hasScoreAboveThreshhold = player.keystoneScores.allScore >= rating;
    const qualifies = isNotAlt && isNotInactive && hasScoreAboveThreshhold;
    // if (hasScoreAboveThreshhold) {
    //   console.log(player.name, qualifies);
    // }
    return qualifies;
  };
}

export function sortByRating(
  { keystoneScores: { allScore: a } },
  { keystoneScores: { allScore: b } }
) {
  if (a) return b - a;
}
