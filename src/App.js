import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '@/routes';
import { DefaultLayout } from 'layouts';
import { AuthContext } from '@/context';
import './styles/index.scss';

function App() {
  const { currentUser } = useContext(AuthContext);
  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  }
  
  return (
    <Router>
      <Routes>
        {/* Loop all public routes */}
        { publicRoutes.map((route, index) => {
          const Layout = route.layout ?? (route.layout === null ? Fragment : DefaultLayout); // use DefaultLayout when route not define layout
          const Page = route.component; // route.component just a name

          return <Route 
            key={index}
            path={route.path}
            element={<Layout><Page /></Layout>}
          />
        })}

        {/* Loop all private routes */}
        { privateRoutes.map((route, index) => {
           const Layout = route.layout ?? (route.layout === null ? Fragment : DefaultLayout); // use DefaultLayout when route not define layout
           const Page = route.component; // route.component just a name

          return <Route 
            key={index}
            path={route.path}
            element={
              <PrivateRoute>
                <Layout>
                  <Page />
                </Layout>
              </PrivateRoute>
            }
          />
        })}
      </Routes>
    </Router>
  );
}

export default App;
