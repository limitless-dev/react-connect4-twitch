import { Flex } from '@chakra-ui/layout'
import gameStyles from './Home.module.css'

export const Row = ({ row, play }) => {
  return (
    <tr style={{background: '#1990ff'}}>
      {row.map((cell, i) => (
        <Cell key={i} value={cell} columnIndex={i} play={play} />
      ))}
    </tr>
  )
}

export const Cell = ({ value, columnIndex, play }) => {
  let color = 'whiteCircle'
  if (value === 1) {
    color = 'redCircle'
  } else if (value === 2) {
    color = 'yellowCircle'
  }
  return (
    <td>
      <Flex
        justify="center"
        align="center"
        className={gameStyles.gameCell + ' cell'}
        onClick={() => {
          play(columnIndex)
        }}
      >
        <div className={gameStyles[color]}>
        </div>
      </Flex>
    </td>
  )
}
