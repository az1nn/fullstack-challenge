import type { User } from '../interfaces'
import useSwr from 'swr'
import GlobalStyle from '../styles/globalstyles';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { DataChart } from '../components/DataChart/DataChart';
import { TableData } from '../components/TableData/TableData';

import { ChartContainer, ContentContainer, FormButton, FormContainer, FormInput, PageTitle, Table, TableContainer } from './styles';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    participation: "",
  })
  const { data, error, isLoading, mutate } = useSwr<User[]>('/api/users', fetcher)

  const handleOnChange = useCallback(
    (evt) => {
      const value = evt.target.value;
      setFormState({
        ...formState,
        [evt.target.name]: value
      });
    }, [formState]
  )
  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault()
      console.log(formState)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      };
      fetch('api/users', requestOptions)
        .then(response => response.json())
      mutate()
      setFormState({
        first_name: "",
        last_name: "",
        participation: "",
      })
    }, [formState]
  )

  if (error) return <div>Failed to load users</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <main>
      <GlobalStyle />
      <>
        <FormContainer>
          <FormInput type="text" name="first_name" placeholder="First Name" onChange={handleOnChange} value={formState.first_name} required />
          <FormInput type="text" name="last_name" placeholder="Last Name" onChange={handleOnChange} value={formState.last_name} required/>
          <FormInput type="number" name="participation" placeholder="Participation" onChange={handleOnChange} value={formState.participation} required/>
          <FormButton onClick={handleSubmit}>SEND</FormButton>
        </FormContainer>
      </>
      <PageTitle>
        <h2>Percentages</h2>
        <h3>See the percentage of all users, one by one.</h3>
      </PageTitle>
      <ContentContainer>
        <TableContainer>
          <Table>
            <tr>
              <th>
              </th>
              <th>
                First Name
              </th>
              <th>
                Last Name
              </th>
              <th>
                Participation
              </th>
            </tr>
            {data.map((item) => {
              return (
                <TableData key={item.id} item={item} />
              )
            })}
          </Table>
        </TableContainer>
        <ChartContainer>
          <DataChart data={data} />
        </ChartContainer>
      </ContentContainer>
    </main>
  )
}