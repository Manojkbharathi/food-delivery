import { Outlet } from 'react-router';
import Navbar from '../components/navbar';
const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
