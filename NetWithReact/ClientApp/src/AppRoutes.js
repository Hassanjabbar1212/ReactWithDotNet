import { Counter } from "./components/Counter";
import Edit from "./components/Edit";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Login from "./components/Login";
import RankItems from "./components/RankItems";
import Registertion from "./components/Registertion";
import ShowData from "./components/ShowData";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
   {
        path: '/rank-items',
        element: <RankItems />
    },
{
    path: '/login',
    element: <Login />
    },
{
    path: '/UserData',
    element: <ShowData />
    },
    {
        path: '/Reg',
        element: <Registertion />
    },
    {
        path: '/Edit',
        element: <Edit />
    },
];

export default AppRoutes;
