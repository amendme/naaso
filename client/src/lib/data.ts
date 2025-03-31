import { 
  ProductType,
  BlogPostType,
  ReviewType,
  TestimonialType,
  SlideType
} from "@shared/schema";

export const sampleData = {
  slides: [
    {
      id: 1,
      image: "/images/slider1.jpg",
      alt: "Slider Image 1",
      order: 1,
      active: true
    },
    {
      id: 2,
      image: "/images/slider2.jpg",
      alt: "Slider Image 2",
      order: 2,
      active: true
    },
    {
      id: 3,
      image: "/images/slider3.jpg",
      alt: "Slider Image 3",
      order: 3,
      active: true
    },
    {
      id: 4,
      image: "/images/slider4.jpg",
      alt: "Slider Image 4",
      order: 4,
      active: true
    },
    {
      id: 5,
      image: "/images/slider5.jpg",
      alt: "Slider Image 5",
      order: 5,
      active: true
    },
    {
      id: 6,
      image: "/images/slider6.jpg",
      alt: "Slider Image 6",
      order: 6,
      active: true
    }
  ],
  products: [
    {
      id: 1,
      name: "Barley Satu",
      slug: "traditional-jumli-satu",
      description: "500g of pure barley satu",
      longDescription: "Traditional Jumli Barley Satu is a nutrient-rich, multi-grain flour that has been a staple of Himalayan cuisine for centuries. Our Satu is made from a blend of roasted barley, wheat, chickpeas, and millets, all stone-ground to preserve nutrients. High in protein, fiber, and complex carbohydrates, it provides sustained energy and is perfect for making traditional dishes, adding to smoothies, or preparing instant nutritious drinks. Each batch is slow-roasted to enhance the nutty flavor profile.",
      price: "250",
      image: "/images/products/satu1.jpg",
      category: "Flour",
      badge: "Bestseller",
      inStock: true,
      featured: true,
      reviewCount: 0,
      rating: 0,
      createdAt: new Date(),
      specifications: {
        weight: "500g",
        ingredients: "Roasted barley only",
        storage: "Store in an airtight container"
      }
    },
    {
      id: 2,
      name: "Mixed Satu",
      slug: "organic-jumli-satu",
      description: "500g pack of mixed satu",
      longDescription: "Our Organic Jumli Satu is made from certified organic grains grown in the pristine Himalayan region. This premium version of our traditional Satu is made from carefully selected organic barley, wheat, chickpeas, and millets. The grains are stone-ground and slow-roasted to preserve their natural nutrients and enhance their rich, nutty flavor. Perfect for health-conscious individuals who want the best quality traditional food.",
      price: "400",
      image: "/images/products/satu2.jpg",
      category: "Flour",
      badge: "Premium",
      inStock: true,
      featured: true,
      reviewCount: 0,
      rating: 0,
      createdAt: new Date(),
      specifications: {
        weight: "500g",
        ingredients: "Organic roasted barley, wheat, chickpeas, millets",
        storage: "Store in an airtight container"
      }
    },
    {
      id: 3,
      name: "Maize Satu",
      slug: "premium-jumli-satu",
      description: "500g pack of pure maize satu",
      longDescription: "Our Premium Jumli Satu is the finest quality traditional flour, made from hand-selected grains grown at high altitudes. This special blend includes premium varieties of barley, wheat, chickpeas, and millets, all carefully roasted and stone-ground to perfection. The result is a superior quality Satu with enhanced nutritional value and an exceptionally rich, nutty flavor. Ideal for those who appreciate the finest traditional food.",
      price: "150",
      image: "/images/products/satu3.jpg",
      category: "Flour",
      badge: "New",
      inStock: true,
      featured: true,
      reviewCount: 0,
      rating: 0,
      createdAt: new Date(),
      specifications: {
        weight: "500g",
        ingredients: "maize only",
        storage: "Store in an airtight container"
      }
    },
    {
      id: 4,
      name: "Chana Satu",
      slug: "premium-jumli-satu",
      description: "500g pack of pure chana satu",
      longDescription: "Our Premium Jumli Satu is the finest quality traditional flour, made from hand-selected grains grown at high altitudes. This special blend includes premium varieties of barley, wheat, chickpeas, and millets, all carefully roasted and stone-ground to perfection. The result is a superior quality Satu with enhanced nutritional value and an exceptionally rich, nutty flavor. Ideal for those who appreciate the finest traditional food.",
      price: "150",
      image: "/images/products/satu4.jpg",
      category: "Flour",
      badge: "New",
      inStock: true,
      featured: true,
      reviewCount: 0,
      rating: 0,
      createdAt: new Date(),
      specifications: {
        weight: "500g",
        ingredients: "chana only",
        storage: "Store in an airtight container"
      }
      
    }
  ],
  
  blogPosts: [
    {
      id: 1,
      title: "The Ancient Wisdom of Jumli Satu",
      slug: "ancient-wisdom-jumli-satu",
      excerpt: "Discover the traditional preparation methods and health benefits of Jumli Satu that have been passed down through generations.",
      content: "Jumli Satu has been a cornerstone of Himalayan nutrition for centuries. Our ancestors discovered that roasting grains before grinding not only enhanced their flavor but also made them more digestible and nutritious. The traditional stone-grinding process preserves all the essential nutrients, making Jumli Satu a complete food. Today, we continue these time-honored practices while ensuring the highest quality standards.\n\nThe careful selection of grains begins with choosing the finest barley, wheat, and legumes from the pristine fields of Jumla Valley. Each grain variety is chosen for its specific nutritional profile and contribution to the final product. The roasting process, perfected over generations, requires precise temperature control and timing to develop the characteristic nutty flavor while maximizing nutritional benefits.\n\nOur stone-grinding technique, unchanged for centuries, is what truly sets Jumli Satu apart. Unlike modern mechanical grinding that generates heat and potentially degrades nutrients, our traditional stone mills work slowly and coolly, preserving the delicate nutrients and natural oils within the grains. This patient, methodical process results in a product that not only tastes authentic but also delivers the full spectrum of nutrients our ancestors relied upon for their strength and vitality.",
      image: "/images/blog/satu-tradition.jpg",
      author: "Devaki Rawal",
      category: "Heritage & Culture",
      tags: ["satu", "tradition", "health", "himalayan-food"],
      featured: true,
      date: new Date("2025-02-28T14:30:00")
    },
    {
      id: 2,
      title: "Modern Benefits of Traditional Satu",
      slug: "modern-benefits-traditional-satu",
      excerpt: "Learn how this ancient superfood fits perfectly into modern healthy lifestyles.",
      content: "In today's fast-paced world, Jumli Satu offers the perfect solution for health-conscious individuals. Rich in protein, fiber, and complex carbohydrates, it provides sustained energy throughout the day. Its convenience makes it ideal for busy professionals, students, and athletes. Recent studies have shown that regular consumption of Satu can help maintain healthy blood sugar levels and improve digestion.\n\nThe science behind Satu's effectiveness lies in its unique composition. The combination of roasted grains creates a perfect balance of macronutrients - proteins for muscle maintenance, complex carbohydrates for sustained energy, and fiber for digestive health. The roasting process also enhances the bioavailability of essential minerals like iron, zinc, and magnesium, making them more easily absorbed by the body.\n\nWhat makes Jumli Satu particularly relevant in modern times is its role in preventive health care. As more people seek natural, unprocessed foods to support their wellness goals, Satu emerges as a time-tested solution. Its anti-inflammatory properties, coupled with its high antioxidant content, make it an excellent choice for those looking to maintain their health naturally. The convenience of preparation means you can enjoy its benefits whether you're at home, at work, or on the go.",
      image: "/images/blog/satu-benefits.jpg",
      author: "Ram Bahadur Rawal",
      category: "Health & Wellness",
      tags: ["health", "nutrition", "lifestyle", "satu"],
      featured: false,
      date: new Date("2025-03-15T09:45:00")
    },
    {
      id: 3,
      title: "5 Quick and Healthy Satu Recipes",
      slug: "quick-healthy-satu-recipes",
      excerpt: "Explore these simple yet delicious ways to incorporate Jumli Satu into your daily diet.",
      content: "Jumli Satu's versatility makes it a perfect ingredient for countless healthy recipes. The most basic and popular preparation is the traditional Satu drink - simply mix it with cold water, add a pinch of salt and roasted cumin powder for a refreshing and energizing beverage. For those with a sweet tooth, blend it with cold milk, honey, and a dash of cardamom powder for a delicious smoothie that can replace your morning meal.\n\nOne of our favorite recipes is the Satu Energy Balls, perfect for busy days and pre-workout snacks. Mix Satu with dates, nuts, and a touch of honey, then roll into small balls. These can be stored for up to a week and provide instant energy when needed. Another quick recipe is Satu Porridge - simply add hot water to Satu, mix in your choice of fruits, nuts, and seeds, and enjoy a warming, nutritious breakfast in minutes.\n\nFor more experimental cooks, try incorporating Satu into your baking. Use it to replace up to 25% of regular flour in cookies and muffins for added nutrition and a unique, nutty flavor. You can also use it as a coating for traditional snacks instead of gram flour, or add it to your smoothie bowl for an extra protein boost. The possibilities are endless, and each preparation method brings out different aspects of Satu's rich, complex flavor profile.",
      image: "/images/blog/satu-recipes.jpg",
      author: "Devaki Rawal",
      category: "Recipes",
      tags: ["recipes", "cooking", "healthy-eating", "satu"],
      featured: true,
      date: new Date("2025-03-05T11:20:00")
    },
    {
      id: 4,
      title: "Sustainable Farming in Jumla Valley",
      slug: "sustainable-farming-jumla",
      excerpt: "How our farmers maintain traditional organic farming practices in the Jumla Valley.",
      content: "The Jumla Valley's unique geography and climate create the perfect conditions for growing exceptional grains. Situated at an altitude of over 2,500 meters, the valley benefits from pristine mountain air, mineral-rich soil, and pure glacial water. Our farmers harness these natural advantages while maintaining traditional organic farming methods that have been perfected over generations.\n\nOur sustainable farming practices go beyond simply avoiding chemical pesticides and fertilizers. We implement sophisticated crop rotation systems that naturally enrich the soil and prevent pest infestations. The traditional knowledge of planting times, guided by lunar cycles and seasonal patterns, ensures optimal growth and harvest conditions. Each field is carefully maintained using time-tested techniques that preserve soil health and promote biodiversity.\n\nThe commitment to quality extends beyond the growing season. Post-harvest handling follows strict protocols to ensure the grains are properly dried and stored. Our farmers understand that the quality of Jumli Satu begins in the fields, and their dedication to excellence shows in every batch. This combination of traditional wisdom and careful stewardship not only produces exceptional Satu but also helps preserve our agricultural heritage and ensures the sustainability of farming in the Jumla Valley for future generations.",
      image: "/images/blog/jumla-farming.jpg",
      author: "Ram Bahadur Rawal",
      category: "Farming",
      tags: ["farming", "organic", "sustainability", "jumla"],
      date: new Date("2025-03-22T16:15:00"),
      featured: false
    }
  ],
  
  reviews: [
    {
      id: 1,
      productId: 1,
      userId: null,
      author: "John Smith",
      title: "Delicious Honey",
      comment: "This is the best honey I've ever tasted!",
      rating: "5",
      date: new Date()
    },
    {
      id: 2,
      productId: 1,
      userId: null,
      author: "Emma Wilson",
      title: "Great Quality",
      comment: "Pure and natural taste, will buy again!",
      rating: "5",
      date: new Date()
    },
    {
      id: 3,
      productId: 1,
      userId: null,
      author: "Meera Patel",
      title: "Amazing quality",
      comment: "Crystallized a bit after a few months, but I learned that's normal for real raw honey. Warming the jar gently brought it back to liquid form. The taste is exceptional!",
      rating: "4",
      date: "2023-02-18T11:20:00.000Z"
    },
    {
      id: 4,
      productId: 2,
      userId: null,
      author: "Ankit Shah",
      title: "Incredibly fresh and crisp",
      comment: "These apples arrived in perfect condition and have the perfect balance of sweetness and tartness. My children love them as snacks, and they've been lasting well in the refrigerator.",
      rating: "5",
      date: "2023-04-05T10:45:00.000Z"
    },
    {
      id: 5,
      productId: 2,
      userId: null,
      author: "Sanya Gupta",
      title: "Just like from the orchard",
      comment: "I grew up near apple orchards, and these remind me of picking apples straight from the tree. So flavorful and juicy! Will definitely order again when these run out.",
      rating: "5",
      date: "2023-03-27T16:30:00.000Z"
    },
    {
      id: 6,
      productId: 3,
      userId: null,
      author: "Vikram Mehta",
      title: "Nutritious and versatile",
      comment: "I've been using this Satu flour in my morning smoothie and as a quick energy drink when mixed with water and a bit of salt. It's incredibly satisfying and keeps me full for hours. The nutty flavor is pleasant and not overwhelming.",
      rating: "4",
      date: "2023-04-02T08:15:00.000Z"
    },
    {
      id: 7,
      productId: 3,
      userId: null,
      author: "Anita Desai",
      title: "Traditional taste, convenient packaging",
      comment: "My grandmother used to make Satu at home, and this tastes remarkably similar! I appreciate that it's still stone-ground but comes in convenient packaging. Makes a quick, nutritious breakfast for my family.",
      rating: "5",
      date: "2023-03-15T13:40:00.000Z"
    }
  ],
  
  testimonials: [
    {
      id: 1,
      name: "Himi Budha",
      rating: "5",
      title: "Village Grandmother",
      text: "This is the food that takes me back to my younger days when my parents made it for us. Now, I am really happy that Naaso has brought back these cherished memories.",
      avatar: "/images/testimonials/farmer1.jpg"
    },
    {
      id: 2,
      name: "Abishkar Dakhal",
      rating: "5",
      title: "Doctor",
      text: "As a health-conscious and busy professional, Naaso's Satu has made my life easier and healthier.",
      avatar: "/images/testimonials/nutritionist.jpg"
    },
    {
      id: 3,
      name: "Kala Bahadur",
      title: "Professor",
      text: "As an early riser who needs to get to school quickly, I often don't have time for a cooked breakfast. Naaso has become my reliable everyday breakfast solution.",
      avatar: "/images/testimonials/professor.jpg",
      rating: "5"
    },
    {
      id: 4,
      name: "Jitendra Jung Khatri",
      title: "Student",
      text: "As a high school student who used to rely on junk food, Naaso has transformed my eating habits. Its delicious taste and positive impact on my body and mind have made a significant difference.",
      avatar: "/images/testimonials/student.jpg",
      rating: "5"
    }
  ]
};
