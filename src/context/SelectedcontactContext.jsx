import React, { createContext, useState } from 'react';

const SelectedcontactContext = createContext();

const SelectedcontactProvider = ({ children }) => {
  const [selectedcontextContact, setSelectedContact] = useState('');
  const [loginuser,setloginuser]= useState('lol');

  return (
    <SelectedcontactContext.Provider value={{ selectedcontextContact, setSelectedContact,loginuser,setloginuser }}>
      {children}
    </SelectedcontactContext.Provider>
  );
};

export { SelectedcontactContext, SelectedcontactProvider };
