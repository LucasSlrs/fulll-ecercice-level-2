import React, { useState } from 'react';

export default function App() {

  const [ inputName, setName ] = useState(""); // initiate state to empty character for the input 
  const [ listOfNames, nameList ] = useState([]); //initiate state of an empty array to put every names into and map around in render

  const searchNames = (e) => {
    setName(e.target.value);
  }
  const launchSearch = (e) => {
    e.preventDefault();
    const user = inputName;
    fetch(`https://api.github.com/search/users?q=${user}`).then(response => response.json()).then(result => nameList(result.items)); // response.json() to return a promise which resolve the result to a json format
  }
// Doing a research only when button submit is clicked to avoir API rate limit
  return(
    <>
    <form onSubmit={(e) => { launchSearch(e) }}>
    <label htmlFor="githubname">Enter a Github name</label>
      <input type="text" name="githubname" value={inputName} onChange={searchNames}/>
      <button type='submit'>Search</button>
    </form>
    <ul>
    {
      listOfNames?.length === 0 ? <div>No user found</div> : <div>List of users</div> // if there's no result, display a message else diplay list of result
    }
    {
      listOfNames?.map((el) => { // .map to list every name of the aray listOfNames
        return (
          <li key={el.id}>{el.login}</li>
        )
      })
    }
    </ul>
    </>
  )
}
