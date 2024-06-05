import { classColors } from './constants';
import { buildRaiderIOUrl } from './utils';

export default function Ranking({ player, index }) {
  return (
    <tr className='last:border-0 border-b border-slate-900'>
      <td>
        <div className='py-2'>
          <span className='text-gray-500'>{index + 1}. </span>
          <a
            style={{
              color: classColors[player.character.class.name],
            }}
            href={buildRaiderIOUrl(player)}
            target='_blank'
          >
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
