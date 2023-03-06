import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="about">Click to view our about page</Link>
      
      <Link to="profile">Click to view our profile page</Link>
    </div>
  );
}
