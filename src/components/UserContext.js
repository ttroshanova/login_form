import { createContext, useState } from "react";

const UserContext = createContext();

export const ContextProvider = ({children}) => {

    const [people, setPeople] = useState([]);
    const [tableData, setTableData] = useState({headers: [], body: []})
    
    const columns = (results) => {
        console.log(results)
        const columnsData = [];
        for(const {name, mass, height, hair_color, skin_color} of results) {
          columnsData.push(
            {
              'Name': name,
              'Mass': mass,
              'Height': height,
              'Hair color': hair_color,
              'Skin color': skin_color
            }
          )
        }
        const columnsHeaders = [];
        for(const key of Object.keys(columnsData[0])){
          columnsHeaders.push(key)
        }
        console.log(columnsHeaders, columnsData)
      return {headers: columnsHeaders, body: columnsData}
    }

    const fetchData = () => {
        return fetch(`https://swapi.dev/api/people`)
        .then(response => {
            if(!response.ok){
                return response.json().then(errData => {
                    const error = new Error('there is an error')
                    errData = error.data;
                    throw error;
                })
            }
            return response.json()
        })
        .then(data => {
            console.log(data.results)
            setPeople(data.results)
            setTableData(columns(data.results))
        })
    }

    return (
        <UserContext.Provider value={{ columns, fetchData, tableData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext