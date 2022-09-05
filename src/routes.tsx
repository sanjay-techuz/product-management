import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import ProductList from './components/Products/ProductList';
import CreateOrUpdateProduct from './components/Products/CreateOrUpdateProduct';
import ProductDetails from './components/Products/ProductDetails';
import { QueryClient, QueryClientProvider } from "react-query";

const Routes = () => {
  let routes = useRoutes([
    { path: "/", element: <ProductList /> },
    { path: "create", element: <CreateOrUpdateProduct /> },
    { path: "edit/:id", element: <CreateOrUpdateProduct /> },
    { path: "details", element: <ProductDetails /> }
  ]);
  return routes;
};

const RoutesWrapper = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes />
      </Router>
    </QueryClientProvider>
  );
};

export default RoutesWrapper;
