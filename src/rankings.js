import { useQuery } from '@tanstack/react-query';
import { classColors } from './constants';

const limit = 20;
const url =
  'https://corsproxy.io/?' +
  encodeURIComponent(
    'https://raider.io/api/guilds/roster?region=us&realm=thrall&guild=Mythic%20Plus%20Family'
  );
export function Rankings() {
  const { isPending, error, data } = useQuery({
    queryKey: ['roster'],
    queryFn: () =>
      fetch(url)
        .then((res) => res.json())
        .then(({ guildRoster: { roster } }) => {
          return roster
            .filter(
              (player) =>
                player.rank !== 5 &&
                player.rank !== 6 &&
                player.keystoneScores.allScore !== 0
            )
            .sort(
              (
                { keystoneScores: { allScore: a } },
                { keystoneScores: { allScore: b } }
              ) => {
                if (a) return b - a;
              }
            );
          // .slice(0, limit);
        }),
  });
  if (isPending) {
    return <Loader />;
  } else if (error) {
    return <p>There was an error loading raider.io score data</p>;
  }
  return (
    <div className='m-4 border-t-1 border-slate-900'>
      <table
        className='table-auto w-full text-white'
        style={{
          textShadow: '1px 1px rgba(0,0,0,0.5)',
        }}
      >
        <thead>
          <tr className='border-b border-slate-900'>
            <th className='text-left'>
              <div className='py-2'>Character</div>
            </th>
            <th className='text-right'>IO Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player) => (
            <Ranking key={player.character.name} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ranking({ player }) {
  // console.log(player);
  return (
    <tr className='last:border-0 border-b border-slate-900'>
      <td
        style={{
          color: classColors[player.character.class.name],
        }}
      >
        <div className='py-2'>
          <a href={buildRaiderIOUrl(player)} target='_blank'>
            {player.character.name}
          </a>
        </div>
      </td>
      <td
        className='text-right'
        style={{
          color: player.keystoneScores.allScoreColor,
        }}
      >
        {Math.floor(player.keystoneScores.allScore)}
      </td>
    </tr>
  );
}

function buildRaiderIOUrl(player) {
  const { realm, region, name } = player.character;

  return `https://raider.io/characters/${region.slug}/${realm.slug}/${name}`;
}

function Loader() {
  return (
    <div className='relative'>
      <div className='absolute right-1/2 transform translate-x-1/2 translate-y-1/4'>
        <div className='border-t-blue-400 border-solid animate-spin rounded-full border-slate-900 border-8 h-32 w-32'></div>
      </div>
    </div>
  );
}
