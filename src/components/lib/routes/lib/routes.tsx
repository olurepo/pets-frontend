/* eslint-disable react/no-array-index-key */
import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Page from '../../page';

interface RouteObject {
    path: string,
    component: any,
}

// Lazy component imports
const SearchPage = React.lazy(() => import('../../search/lib/Search'));
const DetailsPage = React.lazy(() => import('../../details/lib/Details'));

// Routes
const routes:RouteObject[] = [
    {
        path: '/',
        component: SearchPage,
    },
    {
        path: '/pets/:id',
        component: DetailsPage,
    },
    {
        path: '*',
        component: () => <p>Page not found</p>,
    },
];

export const AppRoutes = () => (
  <Router>
    <Page>
      <Routes>
        {
            routes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={(
                      <Suspense fallback={<div>Loading...</div>}>
                        <Component />
                      </Suspense>
                    )}
                  />
                );
            })
        }
      </Routes>
    </Page>
  </Router>
);

export default AppRoutes;
