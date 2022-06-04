import "../styles/Sidebar.css";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="title">Latest posts</div>
      <SidebarItem />
      <SidebarItem />
      <SidebarItem />
      <SidebarItem />
    </div>
  );
}

export default Sidebar;
