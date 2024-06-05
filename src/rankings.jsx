import { useQuery } from '@tanstack/react-query';
import Loader from './loader';
import Ranking from './ranking';
import { filterByRating, sortByRating } from './utils';

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
          return roster.filter(filterByRating(2000)).sort(sortByRating);
        }),
  });
  if (isPending) {
    return <Loader />;
  } else if (error) {
    return (
      <p className='p-8'>There was an error loading raider.io score data</p>
    );
  }
  return (
    <div className='m-4 border-t-1 border-slate-900'>
      <h3 className='text-center text-yellow-400 text-xl mt-8'>
        Guild Leaderboard
      </h3>
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
          {data.map((player, index) => (
            <Ranking
              key={player.character.name}
              index={index}
              player={player}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
