import React, { createContext, useState } from 'react';

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const authDataContext = createContext();

// Context provider component
const AuthContext = ({ children }) => {
    const serverUrl = "http://localhost:3000";
    const [loading,setLoading] = useState(false)
    const value = { serverUrl ,
        loading,setLoading
    };

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    );
}

export default AuthContext;
