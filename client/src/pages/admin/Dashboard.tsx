import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { toast } = useToast();

  // Check for authentication on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return <LoginForm onLogin={(token) => {
      setToken(token);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
    }} />;
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem('token');
              setToken(null);
              setIsAuthenticated(false);
              toast({
                title: "Logged out",
                description: "You have been logged out successfully",
              });
            }}
          >
            Logout
          </Button>
        </div>
        <p className="text-muted-foreground">Manage your Naaso eCommerce website</p>
      </header>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTab token={token!} />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrdersTab token={token!} />
        </TabsContent>
        
        <TabsContent value="blog">
          <BlogTab token={token!} />
        </TabsContent>
        
        <TabsContent value="media">
          <MediaTab token={token!} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab token={token!} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: (credentials: { username: string; password: string }) => 
      apiRequest('POST', '/api/auth/login', credentials),
    onSuccess: (data: any) => {
      onLogin(data.token);
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user?.username || 'admin'}!`,
      });
    },
    onError: (error: any) => {
      setError(error.message || 'Login failed. Please try again.');
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || 'Invalid credentials',
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

// Products Tab Component
const ProductsTab = ({ token }: { token: string }) => {
  const productsQuery = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/products');
      return response || [];
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/admin/products/${id}`, null, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      ),
    onSuccess: () => {
      productsQuery.refetch();
    }
  });

  if (productsQuery.isLoading) {
    return <div>Loading products...</div>;
  }

  if (productsQuery.isError) {
    return <div>Error loading products: {(productsQuery.error as Error).message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link href="/admin/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <Table>
        <TableCaption>A list of all products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(productsQuery.data) && productsQuery.data.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-12 h-12 object-cover rounded" 
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="space-x-2">
                <Link href={`/admin/products/${product.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this product?')) {
                      deleteProductMutation.mutate(product.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Orders Tab Component
const OrdersTab = ({ token }: { token: string }) => {
  const ordersQuery = useQuery({
    queryKey: ['/api/admin/orders'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/admin/orders', null, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      return response || [];
    },
  });

  if (ordersQuery.isLoading) {
    return <div>Loading orders...</div>;
  }

  if (ordersQuery.isError) {
    return <div>Error loading orders: {(ordersQuery.error as Error).message}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <Table>
        <TableCaption>A list of all orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersQuery.data && ordersQuery.data.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.firstName} {order.lastName}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusClassName(order.status)}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell>
                <Link href={`/admin/orders/${order.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Blog Tab Component
const BlogTab = ({ token }: { token: string }) => {
  const blogPostsQuery = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/blog');
      return response || [];
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/admin/blog/${id}`, null, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      ),
    onSuccess: () => {
      blogPostsQuery.refetch();
    }
  });

  if (blogPostsQuery.isLoading) {
    return <div>Loading blog posts...</div>;
  }

  if (blogPostsQuery.isError) {
    return <div>Error loading blog posts: {(blogPostsQuery.error as Error).message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Link href="/admin/blog/new">
          <Button>Add New Post</Button>
        </Link>
      </div>

      <Table>
        <TableCaption>A list of all blog posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogPostsQuery.data && blogPostsQuery.data.map((post: any) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-12 h-12 object-cover rounded" 
                />
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell className="space-x-2">
                <Link href={`/admin/blog/${post.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this blog post?')) {
                      deleteBlogPostMutation.mutate(post.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Media Tab Component
const MediaTab = ({ token }: { token: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const mediaQuery = useQuery({
    queryKey: ['/api/admin/media'],
    queryFn: () => 
      apiRequest('GET', '/api/admin/media', null, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      ),
  });

  const uploadMutation = useMutation({
    mutationFn: async (fileData: FormData) => {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fileData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload file');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      setFile(null);
      mediaQuery.refetch();
      toast({
        title: "Upload successful",
        description: "The file has been uploaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || 'Failed to upload file',
      });
    }
  });

  const deleteMediaMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/admin/media/${id}`, null, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      ),
    onSuccess: () => {
      mediaQuery.refetch();
      toast({
        title: "Media deleted",
        description: "The file has been deleted successfully",
      });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    uploadMutation.mutate(formData);
  };

  if (mediaQuery.isLoading) {
    return <div>Loading media...</div>;
  }

  if (mediaQuery.isError) {
    return <div>Error loading media: {(mediaQuery.error as Error).message}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Media Library</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload New Media</CardTitle>
          <CardDescription>Upload images for your products, blog posts, and more</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*"
            />
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploadMutation.isPending}
            >
              {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {mediaQuery.data && mediaQuery.data.map((media: any) => (
          <Card key={media.id}>
            <CardContent className="p-4">
              <img 
                src={media.path} 
                alt={media.originalName} 
                className="w-full h-40 object-cover rounded mb-2" 
              />
              <p className="text-sm truncate">{media.originalName}</p>
              <div className="flex justify-between mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(media.path);
                    toast({
                      title: "Copied to clipboard",
                      description: "The file path has been copied to your clipboard",
                    });
                  }}
                >
                  Copy Path
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this file?')) {
                      deleteMediaMutation.mutate(media.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = ({ token }: { token: string }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Account</CardTitle>
          <CardDescription>Manage your admin account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Future features will include:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Change password</li>
            <li>Update profile information</li>
            <li>Notification settings</li>
            <li>Two-factor authentication</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function for order status styling
const getStatusClassName = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default Dashboard;