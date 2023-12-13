import { Link, Outlet } from "react-router-dom";
import layoutCss from './layout.module.css';

const Layout = () => (
  <>
    <nav className={layoutCss.layout}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cards">Cards</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>  
      </ul>
    </nav>
    
    <div className={layoutCss.page_data}>
      <Outlet />
    </div>
  </>
);

export default Layout
