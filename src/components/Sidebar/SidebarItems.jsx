import { CreatePost } from "./CreatePost"
import { Home } from "./Home"
import { Notifications } from "./Notifications"
import { ProfileLink } from "./ProfileLink"
import { Search } from "./Search"
import { Suggested } from "./Suggested"
import { ToogleDark } from "./ToogleDark"

export const SidebarItems = () => {
  return (
    <>
        {/* <Home /> */}
        <ToogleDark />
        <Suggested color={'white'}/>
        <Search color={'white'}/>
        {/* <Notifications /> */}
        <CreatePost color={'white'}/>
        <ProfileLink />
    </>
  )
}
