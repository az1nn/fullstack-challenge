import styled from "styled-components";

export const FormContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #24bcf8;
`
export const FormInput = styled.input`
  width: 200px;
  height: 50px;
  margin: 0px 20px;
  padding: 0px 14px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
`
export const FormButton = styled.button`
  width: 140px;
  height: 50px;
  margin: 0px 20px;
  padding: 0px 10px;
  border: 2px solid white;
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
export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 50%;
  color: #394B50;
`
export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 60px;
`
export const Table = styled.table`
  margin-left: 80px;
  min-width: 80%;
  border-collapse: collapse;
  td, th {
    border: 1px solid lightgray;
    padding: 6px 10px;
  }
  .participation {
    text-align: center;
  }
`
export const ChartContainer = styled.div`
  height: 280px;
  width: 50%;
  text {
    font-size: 18px !important; 
  }
`
export const PageTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #394B50;
  h2 {
    margin-top: 40px;
  }
  p {
    font-size: 22px;
  }
`