import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BlogPostType } from "@shared/schema";
import { 
  Calendar, 
  User, 
  Tag, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ArrowLeft, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import BlogCard from "@/components/BlogCard";

const BlogPost = () => {
  const [, params] = useRoute("/blog/:id");
  
  const { data: post, isLoading } = useQuery<BlogPostType>({
    queryKey: [`/api/blog/${params?.id}`],
  });

  const { data: relatedPosts = [] } = useQuery<BlogPostType[]>({
    queryKey: [`/api/blog/related/${params?.id}`],
    enabled: !!post,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 w-3/4 rounded animate-pulse mb-4"></div>
          <div className="h-6 bg-gray-200 w-1/2 rounded animate-pulse mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-semibold mb-4">Blog Post Not Found</h1>
        <p>The blog post you're looking for does not exist or has been removed.</p>
        <Link href="/blog">
          <a className="text-primary hover:underline mt-4 inline-block">Back to Blog</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Blog Navigation */}
        <div className="mb-8">
          <Link href="/blog">
            <a className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </a>
          </Link>
        </div>

        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Featured Image */}
          <div className="h-64 sm:h-80 md:h-96 relative">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Post Content */}
          <div className="p-6 md:p-8">
            {/* Category Badge */}
            <Link href={`/blog?category=${post.category}`}>
              <a className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {post.category}
              </a>
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                <span>{post.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose max-w-none mb-8">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link key={index} href={`/blog?tag=${tag}`}>
                      <a className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h4 className="text-gray-700 font-medium mb-3">Share this post</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Post Navigation */}
        <div className="max-w-3xl mx-auto mt-8 flex justify-between">
          {post.previousPost && (
            <Link href={`/blog/${post.previousPost.id}`}>
              <a className="flex items-center text-primary hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" /> {post.previousPost.title}
              </a>
            </Link>
          )}
          <div className="flex-1"></div>
          {post.nextPost && (
            <Link href={`/blog/${post.nextPost.id}`}>
              <a className="flex items-center text-primary hover:underline">
                {post.nextPost.title} <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </Link>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-12" />
            <h2 className="text-2xl font-display font-bold text-primary mb-8 text-center">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
