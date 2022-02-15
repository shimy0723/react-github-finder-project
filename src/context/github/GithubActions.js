const BASE_URL = process.env.REACT_APP_GITHUB_BASE_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Search users
export const searchUsers = async(text) => {
  const params = new URLSearchParams({
    q: text,
    per_page: 100,
  })

  const response = await fetch(`${BASE_URL}/search/users?${params}`,
  {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  
  const {items} = await response.json()
  return items
}

// Get a single user
export const getUser = async(login) => {
  const response = await fetch(`${BASE_URL}/users/${login}`,
  {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  if(response.status === 404){
    window.location = '/404'
  } else {
    const data = await response.json()
    return data
  }    
}

  // Get user repos
export const getUserRepos = async(login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const response = await fetch(`${BASE_URL}/users/${login}/repos?${params}`,
  {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  
  const data = await response.json()
  return data
}