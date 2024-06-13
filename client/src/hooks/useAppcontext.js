import { createContext, useContext } from 'react';

const Cotext = createContext({});
const useAppContext = () => useContext(Cotext);
export const Provider = Cotext.Provider;
export default useAppContext;
