import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import { DefaultLayout } from 'layouts';
import './styles/index.scss';

function App() {
  return (
    <Router>
      <Routes>
        {/* Loop all public routes */}
        { publicRoutes.map((route, index) => {
          const Layout = route.layout ?? (route.layout === null ? Fragment : DefaultLayout); // use DefaultLayout when route not define layout
          const Page = route.component; // route.component just a name

          return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
        })}
      </Routes>
    </Router>
  );
}

export default App;
