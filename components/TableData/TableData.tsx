import { useRouter } from "next/router"
import styled from "styled-components";

const TrHover = styled.tr`
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const TableData = ({ item }) => {
  const router = useRouter()
  return (
    <TrHover onClick={() => {router.push('/user/' + item.id)}}>
      <td>
        {item.id}
      </td>
      <td>
        {item.first_name}
      </td>
      <td>
        {item.last_name}
      </td>
      <td className='participation'>
        {item.participation}%
      </td>
    </TrHover>
  )
}