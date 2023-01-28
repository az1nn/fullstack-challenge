import { useRouter } from 'next/router'
import useSwr from 'swr'
import styled from "styled-components";
import { User } from '../../interfaces';
import { useCallback, useEffect, useState } from 'react';
import { FormContainer, FormInput, FormButton, PageTitle } from '../styles';
import GlobalStyle from '../../styles/globalstyles';
import Link from 'next/link';

const Button = styled.button`
  width: 140px;
  height: 50px;
  margin: 40px 20px;
  padding: 0px 10px;
  border: 2px solid #24bcf8;
  border-radius: 4px;
  background-color: #24bcf8;
  color: white;
  font-size: 22px;
  font-weight: 700;
  :hover {
    background-color: white;
    color: #24bcf8;
  }
`

const Post = () => {
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    participation: 0,
  })
  const router = useRouter()
  const { id } = router.query

  const fetcher = (url: string) => fetch(url).then((res) => {
    if(res.status === 404) {
      throw new Error('Not Found')
    }
    if(res.status === 200){
       return res.json()
    } 
  })
  const { data, error, isLoading } = useSwr<User>('/api/user/' + id, fetcher)
  
  useEffect(() => {
    if(data) {
      setFormState({
        first_name: data.first_name,
        last_name: data.last_name,
        participation: data.participation,
      }) 
    }
  }, [data])
  
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
      console.log(formState, "client")
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      };
      fetch('/api/user/' + id, requestOptions)
        .then(response => response.json())
      router.push('/')
    }, [formState]
  )
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load user</div>

  return (
    <div>
      <GlobalStyle />
      <div>
        <FormContainer>
          <FormInput type="text" name="first_name" placeholder="First Name" onChange={handleOnChange} value={formState.first_name} required />
          <FormInput type="text" name="last_name" placeholder="Last Name" onChange={handleOnChange} value={formState.last_name} required/>
          <FormInput type="number" name="participation" placeholder="Participation" onChange={handleOnChange} value={formState.participation} required/>
          <FormButton onClick={handleSubmit}>SEND</FormButton>
        </FormContainer>
        <PageTitle>
          <h2>Edit User</h2>
          <h3>Edit the current user data:</h3>
          <p>{data.first_name + " " + data.last_name}</p>
          <Link href={'/'}>
            <Button>Cancel</Button>
          </Link>
        </PageTitle>
      </div>
    </div>
  )
}

export default Post