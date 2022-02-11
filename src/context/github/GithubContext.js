import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const BASE_URL = process.env.REACT_APP_GITHUB_BASE_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer,initialState) 

  // Get initial users (testing purpose)
  const fetchUsers = async() => {
    setLoading()

    fetch(`${BASE_URL}/users`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })
    .then(res => res.json()) 
    .then(data => {
      dispatch({
        type: 'GET_USERS',
        payload: data,
      })
    })
  }

  // Set loading
  const setLoading = () => dispatch({type:'SET_LOADING'})

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    fetchUsers,
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext