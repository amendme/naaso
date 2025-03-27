import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { BlogPostType } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  post: BlogPostType;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <div className="h-48 overflow-hidden">
        <Link href={`/blog/${post.id}`}>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition duration-500 hover:scale-105 cursor-pointer" 
          />
        </Link>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</span>
          <span className="mx-2">•</span>
          <span>{post.category}</span>
        </div>
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-medium text-gray-900 mb-2 hover:text-primary transition duration-300 cursor-pointer">{post.title}</h3>
        </Link>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link href={`/blog/${post.id}`}>
          <span className="inline-block text-accent hover:text-primary font-medium transition duration-300 group cursor-pointer">
            Read More <ArrowRight className="h-4 w-4 ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
