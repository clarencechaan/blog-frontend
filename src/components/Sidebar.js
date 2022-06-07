import "../styles/Sidebar.css";
import SidebarItem from "./SidebarItem";

function Sidebar({ latestPosts }) {
  return (
    <div className="sidebar">
      <div className="title">Latest posts</div>
      {latestPosts.map((post) => (
        <SidebarItem post={post} key={post._id} />
      ))}
    </div>
  );
}

export default Sidebar;
