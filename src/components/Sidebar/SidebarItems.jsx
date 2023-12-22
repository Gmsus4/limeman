import { CreatePost } from "./CreatePost"
import { Home } from "./Home"
import { Notifications } from "./Notifications"
import { ProfileLink } from "./ProfileLink"
import { Search } from "./Search"
import { ToogleDark } from "./ToogleDark"

export const SidebarItems = () => {
  return (
    <>
        {/* <Home /> */}
        <ToogleDark />
        <Search />
        {/* <Notifications /> */}
        <CreatePost />
        <ProfileLink />
    </>
  )
}
