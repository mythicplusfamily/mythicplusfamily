import { useQuery } from '@tanstack/react-query';
import { classColors } from './constants';

const limit = 20;

export function Rankings() {
  const url =
    'https://corsproxy.io/?' +
    encodeURIComponent(
      'https://raider.io/api/guilds/roster?region=us&realm=thrall&guild=Mythic%20Plus%20Family'
    );
  const { isPending, error, data } = useQuery({
    queryKey: ['rankings'],
    queryFn: () => fetch(url).then((res) => res.json()).then(({ guildRoster: { roster } }) => {
      return roster.filter(player => player.rank !== 5 && player.rank !== 6).sort((a,b) => {
        return a.keystoneScores.allScore > b.keystoneScores.allScore ? -1 : 1
      }).slice(0, limit);
    }),
  });
  if (isPending) {
    return <Loader />;
  } else if (error) {
    return <p>There was an error loading raider.io score data</p>;
  }
  return (<div className='m-4 border-t-1 border-slate-900'>
    <table className='table-auto w-full text-white' style={{
      textShadow: '1px 1px rgba(0,0,0,0.5)'
    }}>
      <thead><tr className='border-b border-slate-900'><th className='text-left'><div className='py-2'>Character</div></th><th className='text-right'>IO Rating</th></tr></thead>
      <tbody>
      {data.map(player => <Ranking key={player.character.name} player={player} />)}
      </tbody>
    </table></div>);
}

function Ranking({ player }) {
  // console.log(player)
  return (
    <tr className='last:border-0 border-b border-slate-900'>
      <td style={{
        color: classColors[player.character.class.name]
      }}><div className='py-2'>{player.character.name}</div></td>
      <td className='text-right' style={{
        color: player.keystoneScores.allScoreColor,
      }}>{Math.floor(player.keystoneScores.allScore)}</td>
    </tr>);
}

function Loader() {
  return <div className='content-center p-4 text-center'><div className='loader w-10 h-10'></div></div>
}