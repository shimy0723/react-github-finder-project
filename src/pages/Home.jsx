import UserLists from "../components/users/UserLists"
import UserSearch from "../components/users/UserSearch"

function Home() {
  return (
    <>
      <UserSearch />
      <UserLists />
    </>
  )
}

export default Home