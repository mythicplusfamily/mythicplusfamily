export function buildRaiderIOUrl(player) {
  const { realm, region, name } = player.character;

  return `https://raider.io/characters/${region.slug}/${realm.slug}/${name}`;
}

export function filterByRating(rating) {
  return (player) =>
    player.rank !== 5 &&
    player.rank !== 6 &&
    player.keystoneScores.allScore >= rating;
}

export function sortByRating(
  { keystoneScores: { allScore: a } },
  { keystoneScores: { allScore: b } }
) {
  if (a) return b - a;
}
