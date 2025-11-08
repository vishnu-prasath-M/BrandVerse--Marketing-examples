import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Email Marketing", slug: "email-marketing" },
  { name: "Social Media", slug: "social-media" },
  { name: "Content Marketing", slug: "content-marketing" },
  { name: "SEO", slug: "seo" },
  { name: "Landing Pages", slug: "landing-pages" },
  { name: "E-commerce", slug: "e-commerce" },
  { name: "SaaS", slug: "saas" },
  { name: "B2B", slug: "b2b" },
];

const examples = [
  {
    slug: "airbnb-email-campaign",
    title: "Airbnb's Personalized Travel Recommendations",
    description:
      "Airbnb sends personalized email campaigns based on user search history and preferences, featuring destinations tailored to each user.",
    body: `# Airbnb's Personalized Travel Recommendations

Airbnb has mastered the art of personalized email marketing. Their campaigns are highly targeted, using data from user searches, saved listings, and past trips to deliver relevant content.

## Key Features

- **Personalized destinations**: Based on search history
- **Dynamic content**: Images and listings that match user preferences
- **Seasonal timing**: Emails sent when users are most likely to book
- **Clear CTAs**: "Explore [City]" buttons drive immediate action

## Revenue Impact

This email campaign strategy has contributed significantly to Airbnb's booking rates, with personalized emails showing 3x higher engagement compared to generic campaigns.

[View Case Study](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/6366f1/ffffff?text=Airbnb+Email",
    monthlyRevenue: 120000,
    categorySlugs: ["email-marketing", "e-commerce"],
  },
  {
    slug: "spotify-wrapped-social-campaign",
    title: "Spotify Wrapped Annual Campaign",
    description:
      "Spotify's annual Wrapped campaign creates massive social media buzz with personalized music statistics that users love to share.",
    body: `# Spotify Wrapped Annual Campaign

Spotify Wrapped is one of the most successful social media marketing campaigns ever created. Each year, Spotify generates user-specific statistics about listening habits, creating highly shareable content.

## Key Features

- **Personalization**: Each user gets unique statistics
- **Shareability**: Designed for social media sharing
- **Timing**: Released at year-end for maximum impact
- **Brand recognition**: Consistent design and colors

## Revenue Impact

Wrapped campaigns drive millions of social media shares, free advertising, and significant subscription increases during December.

[View Campaign](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/1db954/ffffff?text=Spotify+Wrapped",
    monthlyRevenue: 850000,
    categorySlugs: ["social-media", "content-marketing"],
  },
  {
    slug: "notion-landing-page-design",
    title: "Notion's Product-Led Landing Pages",
    description:
      "Notion uses clean, feature-focused landing pages that clearly communicate value propositions and drive conversions.",
    body: `# Notion's Product-Led Landing Pages

Notion's landing pages are masterclasses in clarity and conversion. They use clean design, clear value propositions, and interactive demos to convert visitors.

## Key Features

- **Feature clarity**: Each page focuses on one key use case
- **Interactive demos**: Embedded product previews
- **Social proof**: Customer testimonials and case studies
- **Clear pricing**: Transparent pricing tiers

## Revenue Impact

Notion's landing pages have achieved conversion rates above industry average, with feature-specific pages converting at 5-7%.

[View Examples](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/000000/ffffff?text=Notion+Landing",
    monthlyRevenue: 250000,
    categorySlugs: ["landing-pages", "saas"],
  },
  {
    slug: "shopify-seo-content-strategy",
    title: "Shopify's SEO Content Hub",
    description:
      "Shopify creates comprehensive, SEO-optimized content that ranks for high-intent keywords while providing genuine value.",
    body: `# Shopify's SEO Content Hub

Shopify has built a content marketing empire through comprehensive, SEO-optimized guides that rank for high-value keywords while providing genuine value to merchants.

## Key Features

- **Comprehensive guides**: In-depth resources on e-commerce topics
- **SEO optimization**: Targets high-intent commercial keywords
- **Internal linking**: Strong site architecture
- **Regular updates**: Content kept fresh and current

## Revenue Impact

Shopify's content marketing drives millions of organic visitors monthly, with content contributing to significant sign-up and trial conversions.

[View Content](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/96bf48/ffffff?text=Shopify+SEO",
    monthlyRevenue: 450000,
    categorySlugs: ["seo", "content-marketing", "e-commerce"],
  },
  {
    slug: "stripe-documentation-as-marketing",
    title: "Stripe's Developer-Focused Content",
    description:
      "Stripe uses exceptional documentation and tutorials as a core marketing strategy, building trust with developers.",
    body: `# Stripe's Developer-Focused Content

Stripe's approach to marketing through documentation has become legendary. They treat docs as a first-class product, making them a key differentiator.

## Key Features

- **Exceptional documentation**: Clear, comprehensive, always up-to-date
- **Interactive examples**: Code snippets that work
- **Developer experience**: Fast search, good navigation
- **Community resources**: Forums, GitHub repos, tutorials

## Revenue Impact

Stripe's documentation is often cited as a primary reason developers choose Stripe, contributing significantly to their market dominance.

[View Docs](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/635bff/ffffff?text=Stripe+Docs",
    monthlyRevenue: 320000,
    categorySlugs: ["content-marketing", "b2b", "saas"],
  },
  {
    slug: "duolingo-gamification-engagement",
    title: "Duolingo's Gamification Strategy",
    description:
      "Duolingo uses game mechanics, streaks, and social features to drive daily engagement and retention.",
    body: `# Duolingo's Gamification Strategy

Duolingo has perfected the art of gamification in education. Their use of streaks, XP, leaderboards, and achievements keeps users coming back daily.

## Key Features

- **Daily streaks**: Encourage consistent usage
- **XP and levels**: Progress tracking with rewards
- **Leaderboards**: Social competition
- **Achievements**: Milestone celebrations

## Revenue Impact

Gamification features have significantly improved Duolingo's retention rates, with daily active users increasing by over 60% after implementation.

[View Strategy](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/58cc02/ffffff?text=Duolingo+Gaming",
    monthlyRevenue: 180000,
    categorySlugs: ["content-marketing", "social-media"],
  },
  {
    slug: "dropbox-referral-program",
    title: "Dropbox's Viral Referral Program",
    description:
      "Dropbox's referral program offered storage space for both referrer and referee, driving massive growth.",
    body: `# Dropbox's Viral Referral Program

Dropbox's referral program is one of the most successful growth strategies ever implemented. By offering storage space to both parties, they created a win-win incentive.

## Key Features

- **Dual incentives**: Both parties get rewarded
- **Easy sharing**: Simple referral links
- **Clear messaging**: Obvious benefits
- **Integration**: Built into product experience

## Revenue Impact

The referral program helped Dropbox grow from 100,000 to 4 million users in 15 months, reducing customer acquisition cost by 50%.

[View Program](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/0061ff/ffffff?text=Dropbox+Referral",
    monthlyRevenue: 280000,
    categorySlugs: ["social-media", "saas"],
  },
  {
    slug: "hubspot-inbound-marketing",
    title: "HubSpot's Inbound Methodology",
    description:
      "HubSpot pioneered inbound marketing with free tools, educational content, and a comprehensive marketing platform.",
    body: `# HubSpot's Inbound Methodology

HubSpot didn't just practice inbound marketing—they created the methodology. Their approach of attracting, engaging, and delighting customers has become industry standard.

## Key Features

- **Free tools**: Lead magnets that provide real value
- **Educational content**: Blogs, courses, certifications
- **Marketing automation**: Platform that enables the methodology
- **Community**: Events, forums, certifications

## Revenue Impact

HubSpot's inbound approach has helped them grow to a multi-billion dollar company, with content marketing driving significant lead generation.

[View Methodology](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/ff7a59/ffffff?text=HubSpot+Inbound",
    monthlyRevenue: 520000,
    categorySlugs: ["content-marketing", "b2b", "seo"],
  },
  {
    slug: "warby-parker-try-at-home",
    title: "Warby Parker's Home Try-On Program",
    description:
      "Warby Parker revolutionized eyewear retail with a free home try-on program that removes purchase friction.",
    body: `# Warby Parker's Home Try-On Program

Warby Parker disrupted the eyewear industry by removing barriers to purchase. Their home try-on program lets customers try 5 pairs of glasses for free.

## Key Features

- **Free try-on**: No risk for customers
- **Easy process**: Simple online ordering
- **Fast shipping**: Quick turnaround times
- **Great customer service**: Hassle-free returns

## Revenue Impact

The home try-on program has been a key differentiator, contributing to Warby Parker's rapid growth and $3 billion+ valuation.

[View Program](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/41b6e6/ffffff?text=Warby+Parker",
    monthlyRevenue: 150000,
    categorySlugs: ["e-commerce", "landing-pages"],
  },
  {
    slug: "slack-freemium-model",
    title: "Slack's Freemium Growth Strategy",
    description:
      "Slack used a freemium model with team collaboration features to drive viral growth in workplaces.",
    body: `# Slack's Freemium Growth Strategy

Slack's freemium model allowed teams to start using the platform at no cost, then naturally upgraded as they saw value and needed more features.

## Key Features

- **Generous free tier**: Enough features for small teams
- **Team collaboration**: Viral growth within organizations
- **Integrations**: Connects with other tools
- **Smooth upgrade path**: Clear value for paid plans

## Revenue Impact

Slack's freemium model helped them reach $1 billion ARR faster than any other SaaS company, with most revenue coming from upgraded teams.

[View Strategy](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/4a154b/ffffff?text=Slack+Freemium",
    monthlyRevenue: 420000,
    categorySlugs: ["saas", "b2b"],
  },
  {
    slug: "canva-design-templates",
    title: "Canva's Template Library Strategy",
    description:
      "Canva provides thousands of free and premium templates, making design accessible while driving subscriptions.",
    body: `# Canva's Template Library Strategy

Canva democratized design by providing thousands of templates that make professional design accessible to everyone, regardless of skill level.

## Key Features

- **Massive template library**: 100,000+ templates
- **Free and premium tiers**: Upsell to Pro for premium assets
- **Easy to use**: Drag-and-drop interface
- **Regular updates**: New templates added constantly

## Revenue Impact

Canva's template strategy has helped them reach 100+ million users and $1.4 billion in revenue, with templates being a key differentiator.

[View Templates](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/00c4cc/ffffff?text=Canva+Templates",
    monthlyRevenue: 380000,
    categorySlugs: ["content-marketing", "saas"],
  },
  {
    slug: "glossier-social-community",
    title: "Glossier's Community-Driven Marketing",
    description:
      "Glossier built a beauty brand through Instagram and community engagement, creating authentic connections with customers.",
    body: `# Glossier's Community-Driven Marketing

Glossier revolutionized beauty marketing by building a community-first brand on Instagram, turning customers into brand ambassadors.

## Key Features

- **User-generated content**: Customers share their looks
- **Authentic voice**: Real, relatable content
- **Community engagement**: Active on social platforms
- **Influencer partnerships**: Micro-influencers, not celebrities

## Revenue Impact

Glossier's community approach helped them grow to $100M+ in revenue with minimal traditional advertising spend.

[View Community](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/fd669f/ffffff?text=Glossier+Community",
    monthlyRevenue: 95000,
    categorySlugs: ["social-media", "e-commerce"],
  },
  {
    slug: "intercom-product-tours",
    title: "Intercom's Interactive Product Tours",
    description:
      "Intercom uses in-app product tours and messaging to onboard users and highlight key features effectively.",
    body: `# Intercom's Interactive Product Tours

Intercom not only provides messaging tools—they excel at using their own product for onboarding and feature discovery.

## Key Features

- **Interactive tours**: Step-by-step guides
- **Contextual messaging**: Messages at the right time
- **Personalization**: Customized for user roles
- **Analytics**: Track engagement and completion

## Revenue Impact

Product tours have significantly improved Intercom's activation rates, with users who complete tours showing 3x higher engagement.

[View Tours](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/1f8ded/ffffff?text=Intercom+Tours",
    monthlyRevenue: 220000,
    categorySlugs: ["saas", "b2b"],
  },
  {
    slug: "monday-com-workflow-automation",
    title: "Monday.com's Workflow Templates",
    description:
      "Monday.com provides industry-specific workflow templates that demonstrate value and drive adoption.",
    body: `# Monday.com's Workflow Templates

Monday.com makes project management approachable by providing pre-built templates for common workflows across industries.

## Key Features

- **Industry templates**: Specific to user needs
- **Customizable**: Easy to adapt to any team
- **Visual boards**: Intuitive interface
- **Automation**: Built-in workflow automation

## Revenue Impact

Template library has been crucial to Monday.com's growth, helping them reach $150M+ ARR with high customer satisfaction.

[View Templates](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/ff3d71/ffffff?text=Monday+Workflows",
    monthlyRevenue: 290000,
    categorySlugs: ["saas", "b2b", "content-marketing"],
  },
  {
    slug: "gong-sales-intelligence",
    title: "Gong's Data-Driven Sales Content",
    description:
      "Gong uses sales intelligence data to create compelling content that demonstrates ROI and drives B2B sales.",
    body: `# Gong's Data-Driven Sales Content

Gong leverages their own sales intelligence data to create compelling content that shows real ROI, making their value proposition undeniable.

## Key Features

- **Real data**: Uses actual sales intelligence insights
- **Case studies**: Detailed customer success stories
- **ROI calculators**: Help prospects see value
- **Webinars**: Educational content with demos

## Revenue Impact

Gong's content strategy has been instrumental in their growth to $200M+ ARR, with content-driven leads converting at higher rates.

[View Content](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/8656ff/ffffff?text=Gong+Sales",
    monthlyRevenue: 350000,
    categorySlugs: ["b2b", "content-marketing", "seo"],
  },
  {
    slug: "calendly-scheduling-automation",
    title: "Calendly's Scheduling Integration Strategy",
    description:
      "Calendly integrates with hundreds of tools, making it essential infrastructure for sales and operations teams.",
    body: `# Calendly's Scheduling Integration Strategy

Calendly became essential infrastructure by integrating with every tool sales and operations teams use, making it impossible to avoid.

## Key Features

- **Wide integrations**: 100+ tool integrations
- **Embedded scheduling**: Works everywhere
- **Team features**: Multi-user coordination
- **Automation**: Reduces manual scheduling work

## Revenue Impact

Calendly's integration strategy has helped them grow to $70M+ ARR with high retention rates driven by network effects.

[View Integrations](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/006bff/ffffff?text=Calendly+Schedule",
    monthlyRevenue: 175000,
    categorySlugs: ["saas", "b2b"],
  },
  {
    slug: "notion-content-hub",
    title: "Notion's Community Content Hub",
    description:
      "Notion created a content hub featuring templates, guides, and community stories that drive organic growth.",
    body: `# Notion's Community Content Hub

Notion built a comprehensive content hub featuring templates, guides, and community stories that provide value while showcasing the product.

## Key Features

- **Template gallery**: User-submitted templates
- **Use case guides**: Show what's possible
- **Community stories**: Real user examples
- **Regular updates**: Fresh content weekly

## Revenue Impact

Notion's content hub drives significant organic traffic and conversions, with template pages converting visitors at 8-12%.

[View Hub](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/000000/ffffff?text=Notion+Content",
    monthlyRevenue: 310000,
    categorySlugs: ["content-marketing", "saas", "seo"],
  },
  {
    slug: "figma-design-system-docs",
    title: "Figma's Design System Documentation",
    description:
      "Figma publishes comprehensive design system documentation that serves as both resource and marketing.",
    body: `# Figma's Design System Documentation

Figma's design system documentation is so comprehensive and well-executed that it serves as both a learning resource and powerful marketing tool.

## Key Features

- **Comprehensive guides**: Everything about design systems
- **Visual examples**: Real-world implementations
- **Best practices**: Industry-leading insights
- **Regular updates**: Keeps content current

## Revenue Impact

Figma's documentation drives significant organic search traffic and positions them as thought leaders, contributing to their $20B+ valuation.

[View Docs](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/0acf83/ffffff?text=Figma+Design+System",
    monthlyRevenue: 480000,
    categorySlugs: ["content-marketing", "b2b", "seo"],
  },
  {
    slug: "zapier-automation-templates",
    title: "Zapier's Automation Template Library",
    description:
      "Zapier provides thousands of pre-built automation workflows that demonstrate value and drive adoption.",
    body: `# Zapier's Automation Template Library

Zapier makes automation accessible by providing thousands of pre-built "Zaps" that solve common workflow problems.

## Key Features

- **Template library**: 10,000+ automation templates
- **Easy to use**: One-click template activation
- **Wide integrations**: 5,000+ app connections
- **Community contributions**: User-submitted Zaps

## Revenue Impact

Zapier's template library has been crucial to their growth, helping them reach $140M+ ARR by making automation accessible to everyone.

[View Zaps](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/ff4a00/ffffff?text=Zapier+Automation",
    monthlyRevenue: 390000,
    categorySlugs: ["saas", "content-marketing"],
  },
  {
    slug: "airtable-database-templates",
    title: "Airtable's Template Marketplace",
    description:
      "Airtable provides industry-specific database templates that showcase flexibility and drive sign-ups.",
    body: `# Airtable's Template Marketplace

Airtable's template marketplace shows the platform's flexibility by providing ready-made databases for dozens of use cases and industries.

## Key Features

- **Industry templates**: Specific use cases covered
- **Copy and customize**: Easy to get started
- **Community templates**: User-submitted bases
- **Regular updates**: New templates added weekly

## Revenue Impact

Airtable's templates have been instrumental in user acquisition, with template views converting at 15-20% to sign-ups.

[View Templates](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/18bfff/ffffff?text=Airtable+Templates",
    monthlyRevenue: 270000,
    categorySlugs: ["saas", "content-marketing", "b2b"],
  },
  {
    slug: "convertkit-email-sequences",
    title: "ConvertKit's Creator-Focused Email Sequences",
    description:
      "ConvertKit provides pre-built email sequences and templates specifically designed for content creators and course builders.",
    body: `# ConvertKit's Creator-Focused Email Sequences

ConvertKit specializes in serving creators, and their email sequence templates are specifically designed for course launches, product promotions, and audience building.

## Key Features

- **Creator-focused**: Templates for specific creator workflows
- **Educational content**: Guides on email marketing
- **Free resources**: Templates and courses
- **Community support**: Active creator community

## Revenue Impact

ConvertKit's creator-focused approach has helped them grow to $30M+ ARR while maintaining high customer satisfaction in the creator economy.

[View Sequences](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/fb5b3a/ffffff?text=ConvertKit+Email",
    monthlyRevenue: 165000,
    categorySlugs: ["email-marketing", "content-marketing"],
  },
  {
    slug: "brevo-transactional-emails",
    title: "Brevo's Transactional Email Templates",
    description:
      "Brevo provides beautiful, customizable transactional email templates that improve deliverability and engagement.",
    body: `# Brevo's Transactional Email Templates

Brevo (formerly Sendinblue) provides professionally designed transactional email templates that improve deliverability and user experience.

## Key Features

- **Professional templates**: Design-focused transactional emails
- **High deliverability**: Built-in best practices
- **Customization**: Easy to brand
- **Analytics**: Track opens and clicks

## Revenue Impact

Brevo's email templates have contributed to their growth in the competitive email marketing space, with templates improving engagement rates by 25%+.

[View Templates](https://example.com)`,
    imageUrl: "https://via.placeholder.com/800x450/0092ff/ffffff?text=Brevo+Email",
    monthlyRevenue: 140000,
    categorySlugs: ["email-marketing", "saas"],
  },
];

async function main() {
  console.log("Seeding database...");

  // Create categories
  console.log("Creating categories...");
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  // Create examples with categories
  console.log("Creating examples...");
  for (const example of examples) {
    const { categorySlugs, ...exampleData } = example;

    const createdExample = await prisma.example.upsert({
      where: { slug: example.slug },
      update: {},
      create: exampleData,
    });

    // Link categories
    for (const categorySlug of categorySlugs) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });

      if (category) {
        await prisma.exampleCategory.upsert({
          where: {
            exampleId_categoryId: {
              exampleId: createdExample.id,
              categoryId: category.id,
            },
          },
          update: {},
          create: {
            exampleId: createdExample.id,
            categoryId: category.id,
          },
        });
      }
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

