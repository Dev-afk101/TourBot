import React, { createContext, useState } from 'react';

export const dataContext = createContext();

function UserContext({ children }) {
  const [input, setInput] = useState("");

  return (
    <dataContext.Provider value={{ input, setInput }}>
      {children}
    </dataContext.Provider>
  );
}

export default UserContext;
