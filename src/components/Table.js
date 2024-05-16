import React, { useContext } from 'react'
import UserContext from './UserContext'

const Table = () => {
    const {tableData} = useContext(UserContext);

  return (
    <table>
        <thead>
            <tr>
            {tableData.headers.map((header, index) => (
                <th key={index}>{header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {tableData.body.map((columnData, id) => (
            <tr key={id}>{Object.values(columnData).map((value, valueId) => (
                <td key={valueId}>{value}</td>
            ))}</tr>
            ))}
        </tbody>
  </table>
  )
}

export default Table