
import React, { createContext, useState } from 'react'


export const UserContext = createContext();

const UserProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));

  const updateUser = (newUser) =>{
    setUser(newUser)
    localStorage.setItem('loggedIn', 'true');
  }

  const setLogOut = ()=>{
    localStorage.setItem('loggedIn', 'false');
  }

  return (
    <UserContext.Provider value={{user, updateUser, isLoggedIn, setLogOut}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

