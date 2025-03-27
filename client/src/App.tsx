import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Dashboard from "@/pages/admin/Dashboard";
import Layout from "@/components/Layout";

function App() {
  return (
    <>
      <Switch>
        <Route path="/admin">
          <Dashboard />
        </Route>
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/products" component={Products} />
              <Route path="/products/:id" component={ProductDetail} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:id" component={BlogPost} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
