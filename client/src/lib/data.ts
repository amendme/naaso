import { 
  ProductType,
  BlogPostType,
  ReviewType,
  TestimonialType,
  SlideType
} from "@shared/schema";

export const sampleData = {
  products: [
    {
      id: 1,
      name: "Pure Wildflower Honey",
      slug: "pure-wildflower-honey",
      description: "500g jar of natural honey",
      longDescription: "Our Pure Wildflower Honey is collected from bees that forage on diverse wildflower meadows in the Himalayan foothills. This honey has a rich, complex flavor profile with floral notes and a smooth texture. It's raw, unfiltered, and contains all the natural enzymes and beneficial properties that make honey a superfood. Perfect for drizzling over breakfast, sweetening tea, or enjoying straight from the jar.",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1587049633312-d628c4d04e3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Honey",
      badge: "Bestseller",
      inStock: true,
      rating: 4.5,
      reviewCount: 24,
      featured: true,
      origin: "Harvested from our own beehives in the Himalayan foothills, this honey is collected using traditional methods that ensure the highest quality and purity.",
      specifications: [
        { name: "Weight", value: "500g" },
        { name: "Ingredients", value: "100% Pure Raw Honey" },
        { name: "Storage", value: "Store in a cool, dry place" },
        { name: "Texture", value: "Smooth, crystallizes naturally over time" }
      ]
    },
    {
      id: 2,
      name: "Organic Red Apples",
      slug: "organic-red-apples",
      description: "1kg pack, fresh from our orchards",
      longDescription: "Our Organic Red Apples are grown without synthetic pesticides or fertilizers in our mountain orchards. These apples are crisp, juicy, and have the perfect balance of sweetness and tartness. Rich in antioxidants, fiber, and vitamin C, they make a healthy snack or can be used in cooking and baking. Each apple is hand-picked at peak ripeness to ensure the best flavor and nutritional value.",
      price: 8.49,
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Fruits",
      badge: "",
      inStock: true,
      rating: 5.0,
      reviewCount: 18,
      featured: true,
      origin: "Grown in our pesticide-free orchards at an altitude of 6,000 feet, where the clean mountain air and mineral-rich soil create the perfect conditions for flavorful apples.",
      specifications: [
        { name: "Weight", value: "1kg (approximately 5-6 apples)" },
        { name: "Variety", value: "Red Delicious" },
        { name: "Cultivation", value: "Organic, no synthetic pesticides" },
        { name: "Storage", value: "Refrigerate for up to 3 weeks" }
      ]
    },
    {
      id: 3,
      name: "Traditional Satu Flour",
      slug: "traditional-satu-flour",
      description: "250g pack of stone-ground flour",
      longDescription: "Traditional Satu Flour is a nutrient-rich, multi-grain flour that has been a staple of Himalayan cuisine for centuries. Our Satu is made from a blend of roasted barley, wheat, chickpeas, and millets, all stone-ground to preserve nutrients. High in protein, fiber, and complex carbohydrates, it provides sustained energy and is perfect for making traditional dishes, adding to smoothies, or preparing instant nutritious drinks. Each batch is slow-roasted to enhance the nutty flavor profile.",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Flour",
      badge: "New",
      inStock: true,
      rating: 4.0,
      reviewCount: 11,
      featured: true,
      origin: "Produced using traditional methods passed down through generations, our Satu flour is stone-ground in small batches to ensure maximum nutrient retention and authentic taste.",
      specifications: [
        { name: "Weight", value: "250g" },
        { name: "Ingredients", value: "Roasted barley, wheat, chickpeas, millets" },
        { name: "Process", value: "Stone-ground, preserving nutrients" },
        { name: "Storage", value: "Store in an airtight container" }
      ]
    },
    {
      id: 4,
      name: "Organic Herbal Tea Mix",
      slug: "organic-herbal-tea-mix",
      description: "100g of dried herbs and flowers",
      longDescription: "Our Organic Herbal Tea Mix combines hand-harvested herbs and flowers from our mountain farm to create a calming and delicious caffeine-free beverage. The blend includes chamomile, lemon balm, mint, and rose petals, offering a soothing experience with subtle floral notes and a refreshing finish. Each herb is carefully dried to preserve its therapeutic properties and natural flavors. This tea supports relaxation, digestion, and overall wellness as part of your daily ritual.",
      price: 9.29,
      image: "https://images.unsplash.com/photo-1615485925600-97605dbb85c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Tea",
      badge: "",
      inStock: true,
      rating: 3.5,
      reviewCount: 9,
      featured: true,
      origin: "All herbs in this blend are grown on our pesticide-free farm and hand-harvested at the optimal time to ensure the highest concentration of beneficial compounds and flavors.",
      specifications: [
        { name: "Weight", value: "100g" },
        { name: "Ingredients", value: "Organic chamomile, lemon balm, mint, rose petals" },
        { name: "Brewing", value: "1 tsp per cup, steep for 5-7 minutes" },
        { name: "Benefits", value: "Calming, aids digestion, caffeine-free" }
      ]
    },
    {
      id: 5,
      name: "Forest Honey",
      slug: "forest-honey",
      description: "350g jar of dark forest honey",
      longDescription: "Our Forest Honey is collected from bees that forage deep in pristine mountain forests, feeding primarily on oak and rhododendron flowers. This special honey has a rich, dark amber color and a robust, slightly smoky flavor with hints of molasses. More mineral-rich than regular honey, it has a lower glycemic index and is prized for its antioxidant properties. This rare honey variety makes a distinctive addition to cheese boards, marinades, or as a natural sweetener for teas and desserts.",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1623330911724-84f62e1cf9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Honey",
      badge: "Limited",
      inStock: true,
      rating: 4.8,
      reviewCount: 16,
      featured: false,
      origin: "Sourced from beehives placed in remote forest areas at elevations between 7,000-8,000 feet, where bees collect nectar from wild rhododendron and oak flowers.",
      specifications: [
        { name: "Weight", value: "350g" },
        { name: "Color", value: "Dark amber" },
        { name: "Flavor", value: "Rich, woody with molasses notes" },
        { name: "Crystallization", value: "Slow to crystallize due to higher fructose content" }
      ]
    },
    {
      id: 6,
      name: "Mountain Green Tea",
      slug: "mountain-green-tea",
      description: "75g of hand-picked green tea leaves",
      longDescription: "Our Mountain Green Tea is grown at high elevations where the cool climate and misty conditions produce leaves with exceptional flavor. Each leaf is hand-picked during the spring harvest and carefully processed to preserve its natural qualities. The resulting tea has a fresh, slightly sweet taste with grassy notes and a clean finish. Rich in antioxidants, this green tea offers a gentle caffeine boost and supports overall wellness. Enjoy hot or cold for a refreshing experience.",
      price: 11.49,
      image: "https://images.unsplash.com/photo-1546890975-c41c812798d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Tea",
      badge: "",
      inStock: true,
      rating: 4.3,
      reviewCount: 14,
      featured: false,
      origin: "Cultivated on our terraced tea gardens at 6,500 feet elevation, where slow growth in the cool mountain climate develops complex flavors in the tea leaves.",
      specifications: [
        { name: "Weight", value: "75g" },
        { name: "Harvest", value: "Spring flush, hand-picked" },
        { name: "Brewing", value: "1 tsp per cup, 80°C water, steep 2-3 minutes" },
        { name: "Caffeine", value: "Low to moderate" }
      ]
    },
    {
      id: 7,
      name: "Himalayan Nettle Powder",
      slug: "himalayan-nettle-powder",
      description: "150g of nutritious stinging nettle powder",
      longDescription: "Himalayan Nettle Powder is made from wild stinging nettles that grow naturally in the pristine mountain environment. After careful harvesting with gloves, the nettles are dried and ground into a fine powder that's easy to incorporate into your diet. Exceptionally rich in iron, calcium, and protein, as well as vitamins A, C, and K, this superfood boosts energy and supports immune function. Add to smoothies, soups, or baked goods for a nutritional boost with a mild, earthy flavor.",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Superfoods",
      badge: "Superfood",
      inStock: true,
      rating: 4.1,
      reviewCount: 8,
      featured: false,
      origin: "Wildcrafted nettles harvested sustainably from natural stands in undisturbed Himalayan valleys, far from pollution and agricultural activities.",
      specifications: [
        { name: "Weight", value: "150g" },
        { name: "Ingredients", value: "100% Himalayan stinging nettle (Urtica dioica)" },
        { name: "Nutritional Highlights", value: "Iron, calcium, protein, vitamins A, C, K" },
        { name: "Usage", value: "1-2 teaspoons daily in food or beverages" }
      ]
    },
    {
      id: 8,
      name: "Fresh Walnuts",
      slug: "fresh-walnuts",
      description: "500g of naturally grown walnuts in shell",
      longDescription: "Our Fresh Walnuts are harvested from trees that grow in the mineral-rich soil of mountain valleys. These nuts are larger and more flavorful than commercially grown varieties, with a perfect balance of omega fatty acids. The shells are naturally clean and easy to crack, revealing plump, golden kernels with no bitterness. Excellent for snacking, baking, or adding to salads, these walnuts provide heart-healthy fats, antioxidants, and protein. Each batch is tested for freshness to ensure you receive the highest quality.",
      price: 13.79,
      image: "https://images.unsplash.com/photo-1648234513334-c8493af15ce4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Nuts",
      badge: "",
      inStock: true,
      rating: 4.6,
      reviewCount: 13,
      featured: false,
      origin: "Harvested from walnut trees growing in protected valley groves that benefit from rich alluvial soil and natural irrigation from mountain streams.",
      specifications: [
        { name: "Weight", value: "500g" },
        { name: "Variety", value: "Himalayan thin-shell walnut" },
        { name: "Shell", value: "Medium hardness, easily cracked" },
        { name: "Storage", value: "Keep in cool, dry place; refrigerate after opening" }
      ]
    }
  ],
  
  blogPosts: [
    {
      id: 1,
      title: "Modern Beekeeping Techniques for Pure Honey",
      slug: "modern-beekeeping-techniques",
      excerpt: "Learn about how we maintain our bee colonies using eco-friendly methods to produce the purest honey...",
      content: `At Naaso, we believe in combining traditional wisdom with modern sustainable practices to produce the purest honey possible while supporting bee health and environmental balance.

Our beekeeping starts with proper hive placement. We carefully select locations in pristine meadows rich with diverse wildflowers, far from agricultural areas that use pesticides. This not only results in more flavorful honey but also provides bees with varied nutrition throughout the flowering season.

We practice minimal intervention beekeeping, allowing bees to build natural comb in some parts of the hive. This reduces stress on the colonies and lets them create an environment that best suits their needs. Our hives are designed with proper ventilation and predator protection while still resembling the bees' natural habitat.

Harvest timing is crucial for both honey quality and bee health. We only collect excess honey, ensuring colonies retain enough to sustain themselves. We never harvest all frames, and we avoid taking honey in early spring or late fall when bees need their stores most.

Instead of chemical treatments for pest management, we use integrated pest management techniques. This includes monitoring varroa mite levels, using screened bottom boards that allow mites to fall through, and occasionally applying organic treatments like essential oils only when necessary.

Our extraction process preserves all the beneficial properties of raw honey. We never heat the honey above natural hive temperatures, which would destroy enzymes and beneficial compounds. We filter minimally—just enough to remove large debris while leaving pollen and propolis in the final product.

By respecting bee biology and working with nature rather than against it, we're able to produce exceptional honey while maintaining healthy, thriving colonies that contribute to local ecosystem health through pollination.`,
      image: "https://images.unsplash.com/photo-1590138745379-98022daf9b68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Aanya Sharma",
      category: "Beekeeping",
      tags: ["honey", "bees", "sustainable", "organic"],
      date: "2023-05-12T10:30:00.000Z",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Farming Practices in the Digital Age",
      slug: "sustainable-farming-digital-age",
      excerpt: "Discover how we blend traditional farming wisdom with modern technology to create sustainable...",
      content: `At Naaso, we're passionate about finding the perfect balance between age-old farming wisdom and innovative technology to create truly sustainable agricultural systems.

Traditional farming knowledge handed down through generations gives us invaluable insights into our local ecosystem. Our elders understand the subtle signals of nature—which wild plants indicate soil health, how weather patterns affect different crops, and when to plant based on natural cycles. This knowledge forms the foundation of our farming approach.

However, we've thoughtfully integrated modern technology where it enhances sustainability. Solar-powered drip irrigation systems allow us to precisely control water usage, reducing consumption by up to 60% compared to conventional methods while still meeting each plant's exact needs.

We monitor soil health through both traditional observation and modern testing. This combination helps us maintain optimal nutrient levels naturally, using compost, mulch, and crop rotation rather than synthetic fertilizers. When our soil analysis shows specific deficiencies, we address them with targeted natural amendments like rock dust for minerals or specific compost blends.

For pest management, we embrace biodiversity rather than chemicals. Our farm features insectary strips of flowering plants that attract beneficial insects, integrated chicken systems that reduce pests while providing fertilizer, and strategic companion planting to naturally deter harmful insects.

Digital tools help us track and optimize these natural systems. Weather stations connected to our irrigation controls prevent overwatering, and mobile apps help us document crop rotations and yields, building our own localized database that improves decision-making each season.

By honoring traditional knowledge while selectively adopting appropriate technology, we've created a resilient farm system that produces nutritious food while actually improving the environment year after year.`,
      image: "https://images.unsplash.com/photo-1592859600972-1b0834d83996?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Rohan Singh",
      category: "Farming",
      tags: ["sustainable", "technology", "organic", "farming"],
      date: "2023-04-28T14:15:00.000Z",
      featured: true
    },
    {
      id: 3,
      title: "5 Traditional Recipes Using Satu Flour",
      slug: "traditional-satu-recipes",
      excerpt: "Try these authentic village recipes that make the most of our nutritious Satu flour for healthy meals...",
      content: `Satu flour has been a staple in Himalayan kitchens for centuries, prized for its complete nutrition and convenience. Here are five traditional ways to incorporate this powerful superfood into your diet:

1. **Morning Satu Drink (Sattu Sharbat)**
   This energizing breakfast drink takes just minutes to prepare and provides sustained energy throughout the morning.
   
   *Ingredients:*
   - 2 tablespoons Naaso Satu flour
   - 1 cup cool water or buttermilk
   - 1/2 teaspoon roasted cumin powder
   - 1/4 teaspoon black salt
   - 1 teaspoon lemon juice
   - Fresh mint leaves
   - Jaggery or honey to taste (optional)
   
   *Preparation:*
   Mix Satu flour with a small amount of water to make a smooth paste. Add remaining water, spices, lemon juice, and sweetener if using. Stir well and garnish with mint leaves. Enjoy immediately for maximum nutrition.

2. **Satu Paratha (Stuffed Flatbread)**
   These hearty flatbreads make a perfect lunch or dinner, especially when served with yogurt or pickle.
   
   *Ingredients:*
   - 1 cup whole wheat flour
   - 1/2 cup Naaso Satu flour
   - 1 small onion, finely chopped
   - 1 green chili, minced
   - 1/2 teaspoon each: cumin seeds, coriander powder
   - Fresh cilantro, chopped
   - Salt to taste
   - Ghee for cooking
   
   *Preparation:*
   Mix Satu flour with spices, herbs, and vegetables. Form into balls. Roll whole wheat dough into circles, place Satu mixture in center, fold and seal edges, then roll again. Cook on hot griddle with ghee until golden brown spots appear on both sides.

3. **Satu Ladoo (Energy Balls)**
   These nutritious sweet treats are perfect for a quick energy boost between meals.
   
   *Ingredients:*
   - 1 cup Naaso Satu flour
   - 1/4 cup ghee
   - 1/3 cup jaggery, crushed
   - 1/4 teaspoon cardamom powder
   - 2 tablespoons chopped nuts (almonds, walnuts)
   
   *Preparation:*
   Lightly roast Satu flour in ghee until fragrant. Add jaggery and continue stirring until melted. Add cardamom and nuts, mix well. Allow to cool slightly, then shape into small balls while still warm. Store in airtight container.

4. **Traditional Satu Soup**
   This savory soup is traditionally consumed during winter months for warmth and nourishment.
   
   *Ingredients:*
   - 3 tablespoons Naaso Satu flour
   - 4 cups vegetable stock
   - 1 tablespoon ginger-garlic paste
   - 1 teaspoon cumin seeds
   - Seasonal vegetables, chopped
   - Fresh herbs to garnish
   - Salt and pepper to taste
   
   *Preparation:*
   Toast cumin seeds in pot, add ginger-garlic paste and sauté. Whisk Satu flour with cold water to make smooth slurry. Add to pot with vegetable stock and bring to simmer. Add vegetables and cook until tender. Season and garnish with fresh herbs.

5. **Satu Chilla (Savory Pancakes)**
   These quick pancakes make a protein-rich breakfast or snack.
   
   *Ingredients:*
   - 1 cup Naaso Satu flour
   - 1/4 cup finely chopped onion
   - 1 small grated carrot
   - Green chilies and ginger to taste
   - 1/2 teaspoon each: turmeric, cumin powder
   - Water as needed
   - Oil for cooking
   
   *Preparation:*
   Mix all ingredients with enough water to make a medium-thick batter. Heat a non-stick pan, add oil, pour a ladle of batter and spread into a circle. Cook until edges become crisp, flip and cook other side. Serve hot with chutney.

These traditional recipes showcase Satu's versatility while providing exceptional nutrition. As our ancestors knew, this complete food offers a perfect balance of protein, fiber, and minerals that sustains energy levels and supports overall health.`,
      image: "https://images.unsplash.com/photo-1603569283843-5a75b441fff9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Priya Malhotra",
      category: "Recipes",
      tags: ["satu", "recipes", "traditional", "flour"],
      date: "2023-04-15T09:45:00.000Z",
      featured: true
    },
    {
      id: 4,
      title: "The Health Benefits of Raw Honey",
      slug: "health-benefits-raw-honey",
      excerpt: "Explore the numerous health benefits of consuming raw, unprocessed honey and why it's superior to commercial varieties...",
      content: `Raw honey, like the kind we produce at Naaso, is a true gift from nature with remarkable health properties that processed commercial honey simply cannot match.

**What Makes Honey "Raw"?**
Raw honey comes straight from the hive to your home. It's strained to remove visible debris but never heated above natural hive temperatures (around 35°C/95°F) or ultra-filtered. This minimal processing preserves all the beneficial enzymes, pollen, propolis, and antioxidants that make honey a superfood rather than just a sweetener.

**Nutritional Profile**
Raw honey contains more than 200 substances, including enzymes, amino acids, vitamins, minerals, and antioxidants. It provides small amounts of zinc, potassium, calcium, phosphorous, magnesium, selenium, B vitamins and vitamin C. While not calorie-free, honey has a lower glycemic index than refined sugar, meaning it raises blood sugar levels more gradually.

**Antimicrobial Properties**
One of honey's most studied benefits is its natural antimicrobial action. It contains hydrogen peroxide produced by an enzyme called glucose oxidase, and its low moisture content and slight acidity create an environment hostile to bacteria and fungi. These properties make raw honey effective for wound healing and fighting infections.

**Antioxidant Powerhouse**
Raw honey contains an impressive array of plant chemicals that function as antioxidants. These include phenolic acids and flavonoids, which help neutralize free radicals in the body and reduce oxidative stress. Our darker varieties, like forest honey, typically contain higher concentrations of these beneficial compounds.

**Digestive Health Support**
Many traditional medicine systems use honey for digestive issues. Modern research suggests honey may function as a prebiotic, feeding the beneficial bacteria in our gut. It can also help reduce inflammation in the digestive tract and has been used effectively to soothe acid reflux symptoms when consumed before bed.

**Respiratory Benefits**
Raw honey has long been used as a natural remedy for coughs and sore throats. Scientific studies now confirm its effectiveness; research shows honey can reduce cough frequency and severity, especially in children (though remember, honey should never be given to infants under 12 months).

**Allergy Relief**
Though more research is needed, many people report relief from seasonal allergies when consuming local raw honey. The theory is that trace amounts of pollen in the honey act as a form of immunotherapy, helping the body build tolerance to local allergens over time.

**Wound Healing**
Perhaps one of honey's most impressive medicinal uses is in wound care. Medical-grade honey is used in hospitals worldwide to treat burns, ulcers, and other wounds. It creates a moist healing environment, reduces inflammation, fights infection, and may stimulate tissue regeneration.

At Naaso, we ensure our honey retains all these beneficial properties by harvesting with care and minimal processing. We jar our honey directly after gentle straining, preserving the complex flavors and health benefits that make raw honey such a remarkable food.`,
      image: "https://images.unsplash.com/photo-1555211652-5c6222f76741?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Dr. Vikram Mehta",
      category: "Health",
      tags: ["honey", "health", "nutrition", "natural remedies"],
      date: "2023-03-22T11:20:00.000Z",
      featured: false
    },
    {
      id: 5,
      title: "From Blossom to Jar: The Journey of Our Honey",
      slug: "blossom-to-jar-honey-journey",
      excerpt: "Follow the fascinating process of how our honey travels from mountain flowers to your breakfast table...",
      content: `The journey of Naaso honey from flower to your table is a remarkable process that combines nature's perfect design with careful human stewardship.

**The Foraging Stage**
It begins with our honeybees visiting thousands of wildflowers across the pristine mountain meadows. A single worker bee visits between 50-100 flowers during each collection trip, using her long proboscis (tongue) to extract nectar from deep within the blossoms.

The foraging area for each of our hives spans approximately three kilometers in radius—meaning our bees have access to about 28 square kilometers of diverse wildflower terrain. In spring, they collect primarily from rhododendron and apple blossoms, while summer brings wild thyme, clover, and dozens of other mountain flowers.

**The Transformation**
Back at the hive, the forager bee passes the nectar to house bees through a process called trophallaxis (mouth-to-mouth feeding). These house bees add enzymes to the nectar, including invertase which begins breaking down complex sugars into simpler ones.

The house bees then deposit tiny droplets throughout the hive, increasing the nectar's surface area. The constant 35°C (95°F) temperature inside the hive and the steady fanning of worker bees' wings creates air circulation that evaporates excess moisture. Over 2-3 days, the nectar's water content drops from about 70% to less than 18%—concentrated enough to become honey.

**The Storage Process**
Once properly concentrated, the bees store the honey in hexagonal wax cells they've constructed specifically for this purpose. When a cell is full, they cap it with more beeswax, creating a perfect, airtight storage container. This remarkable engineering keeps honey fresh indefinitely—archaeologists have even found 3,000-year-old honey in Egyptian tombs that remained perfectly edible!

**The Harvest**
At Naaso, we practice sustainable harvesting, carefully timing our honey collection to ensure the bees maintain sufficient stores for themselves. We only harvest excess honey from strong, healthy colonies.

Our beekeepers gently remove frames where honey cells are at least 80% capped, indicating the honey is properly ripened. We use minimal smoke and handle frames carefully to reduce stress on the colonies.

**The Extraction**
Back at our processing facility, we remove the wax cappings with specially designed forks, exposing the honey without damaging the comb structure. The frames are then placed in a centrifugal extractor that spins the frames, using centrifugal force to draw honey out while leaving the valuable wax comb intact for the bees to reuse.

The extracted honey flows through a coarse strainer that removes large particles of wax and propolis while retaining beneficial pollen and enzymes. Importantly, our honey is never heated above hive temperature, keeping all beneficial compounds intact.

**The Finishing Touches**
After extraction, we allow our honey to settle naturally in tanks for a few days, allowing any remaining air bubbles and tiny particles to rise to the surface. We skim these off before the final straining through a fine mesh that preserves the honey's natural goodness while ensuring a clean product.

Finally, we jar our honey by hand in small batches, carefully labeling each jar with the harvest date and predominant floral sources. From mountain wildflower to your table, our honey makes a remarkable journey, carrying the essence of our pristine environment in every golden drop.`,
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      author: "Aanya Sharma",
      category: "Beekeeping",
      tags: ["honey", "bees", "production", "behind-the-scenes"],
      date: "2023-03-05T15:30:00.000Z",
      featured: false
    }
  ],
  
  reviews: [
    {
      id: 1,
      productId: 1,
      userId: null,
      author: "Priya Malhotra",
      title: "The best honey I've ever tasted!",
      comment: "This honey has an incredible depth of flavor unlike anything from the supermarket. You can really taste the wildflowers. I use it in my morning tea every day now and can't imagine going back to regular honey.",
      rating: 5,
      date: "2023-04-10T09:30:00.000Z"
    },
    {
      id: 2,
      productId: 1,
      userId: null,
      author: "Rahul Verma",
      title: "Worth every penny",
      comment: "I was hesitant about the price but decided to try it anyway. Now I understand why it costs more than regular honey. The texture and flavor are incomparable. This is what real honey should taste like!",
      rating: 5,
      date: "2023-03-22T14:15:00.000Z"
    },
    {
      id: 3,
      productId: 1,
      userId: null,
      author: "Meera Patel",
      title: "Amazing quality",
      comment: "Crystallized a bit after a few months, but I learned that's normal for real raw honey. Warming the jar gently brought it back to liquid form. The taste is exceptional!",
      rating: 4,
      date: "2023-02-18T11:20:00.000Z"
    },
    {
      id: 4,
      productId: 2,
      userId: null,
      author: "Ankit Shah",
      title: "Incredibly fresh and crisp",
      comment: "These apples arrived in perfect condition and have the perfect balance of sweetness and tartness. My children love them as snacks, and they've been lasting well in the refrigerator.",
      rating: 5,
      date: "2023-04-05T10:45:00.000Z"
    },
    {
      id: 5,
      productId: 2,
      userId: null,
      author: "Sanya Gupta",
      title: "Just like from the orchard",
      comment: "I grew up near apple orchards, and these remind me of picking apples straight from the tree. So flavorful and juicy! Will definitely order again when these run out.",
      rating: 5,
      date: "2023-03-27T16:30:00.000Z"
    },
    {
      id: 6,
      productId: 3,
      userId: null,
      author: "Vikram Mehta",
      title: "Nutritious and versatile",
      comment: "I've been using this Satu flour in my morning smoothie and as a quick energy drink when mixed with water and a bit of salt. It's incredibly satisfying and keeps me full for hours. The nutty flavor is pleasant and not overwhelming.",
      rating: 4,
      date: "2023-04-02T08:15:00.000Z"
    },
    {
      id: 7,
      productId: 3,
      userId: null,
      author: "Anita Desai",
      title: "Traditional taste, convenient packaging",
      comment: "My grandmother used to make Satu at home, and this tastes remarkably similar! I appreciate that it's still stone-ground but comes in convenient packaging. Makes a quick, nutritious breakfast for my family.",
      rating: 5,
      date: "2023-03-15T13:40:00.000Z"
    }
  ],
  
  testimonials: [
    {
      id: 1,
      name: "Priya Malhotra",
      title: "Loyal Customer",
      text: "The honey from Naaso is unlike anything I've ever tasted. It's pure, raw, and full of natural flavors. I've become a regular customer and can't imagine going back to store-bought honey.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Verma",
      title: "Health Enthusiast",
      text: "I ordered the Satu flour for my family, and we've been using it for our morning meals. It's fresh, nutritious, and has a wonderful earthy flavor. The packaging was also eco-friendly, which I appreciate!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Anita Desai",
      title: "Mother of Two",
      text: "Their organic apples are crisp, juicy, and so flavorful! My kids love them as snacks. The customer service is excellent too — they replaced a damaged item without any hassle.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 4.5
    },
    {
      id: 4,
      name: "Vikram Mehta",
      title: "Chef",
      text: "As a professional chef, I'm extremely particular about ingredients. Naaso's products consistently exceed my expectations with their quality and flavor profiles. The wild forest honey adds a remarkable dimension to my dessert creations.",
      avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    },
    {
      id: 5,
      name: "Sonali Sharma",
      title: "Yoga Instructor",
      text: "I recommend Naaso products to all my yoga students who are looking to incorporate more natural foods into their diet. The herbal tea blend has become a staple in my daily meditation practice - so calming and centering.",
      avatar: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 5
    }
  ],
  
  slides: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1589927986289-35812ab8c9ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      alt: "Fresh honey from our farm",
      order: 1
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1472245636299-85f0d69a5299?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      alt: "Organic apples from our orchards",
      order: 2
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      alt: "Natural village products",
      order: 3
    }
  ]
};
