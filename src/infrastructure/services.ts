import Service from "../domain/service/service";

const services: Service[] = [
  new Service(
    "Corporate identity",
    "corporate-identity",
    "Creating a brand identity that reflects the uniqueness of the brand and strengthens its competitive advantages. A complete process — from research and concept development to finalized materials and brand guidelines — aimed at shaping a cohesive and recognizable brand image.",
    [
      {
        name: ["Research", "and Analysis"],
        description:
          "Brand, target audience, competitor, market, and current trend analysis. Creation of a mood board to define the visual direction of the brand identity.",
        duration: "20+ business days",
      },
      {
        name: ["Brand Visual", "Concept"],
        description:
          "Development of the brand's visual concept: logo, brand mark, color palette, typography, graphic elements, visual patterns, photographic style, and brand blocks.",
        duration: "15+ business days",
        revisions: "1 concept, 2 rounds of revisions",
      },
      {
        name: ["Creation of Brand", "Materials"],
        description:
          "Adaptation of the brand’s visual concept for various channels and materials, tailored to the brand’s characteristics and objectives. This includes the creation of business documentation, corporate identity items, presentations, master mockups, advertising materials, and other brand elements.",
        duration: "10+ business days",
      },
      {
        name: ["Brand Guidelines", "and Materials"],
        description:
          "Development of a brand guidelines document with recommendations on the use of visual elements, and the systematization of all brand assets, including logos, fonts, color schemes, and other components. <br/> <a href='https://google.com' target='_blank'  class='text-[#FF3F1A] underline'>Click here to view a sample brand guidelines PDF.</a>",
        duration: "8+ business days",
      },
    ],
  ),
  new Service(
    "Product identity",
    "product-identity",
    "Creating an identity that reflects the uniqueness of the product and enhances its competitive advantages in the market. A complete process — from research and concept development to preparation of materials and guidelines — aimed at forming a cohesive and recognizable brand image.",
    [
      {
        name: ["Research", "and Analysis"],
        description:
          "Analyzing the product, target audience, competitors, and market trends. Assessing unique characteristics and competitive advantages. Defining the visual and positioning direction of the brand and creating a mood board that reflects the conceptual foundation of the identity.",
        duration: "15+ business days",
      },
      {
        name: ["Brand Visual", "Concept"],
        description:
          "Creating the visual concept of the product identity: logo, brand mark, packaging for various product lines and sizes, including material selection and the creation of graphic elements for each type of packaging.",
        duration: "25+ business days",
        revisions: "1 concept, 2 rounds of revisions",
      },
      {
        name: ["Creation of Brand", "Materials"],
        description:
          "Adapting the visual concept of the product identity for different product lines and packaging sizes, including the development of mandatory and graphic elements, packaging layouts, and transport packaging. Preparing POS materials, advertising elements, and other branding assets.",
        duration: "15+ business days",
      },
      {
        name: ["Brand Guidelines", "and Materials"],
        description:
          "Developing brand guidelines with recommendations on how to use visual elements of the product identity, and organizing all source materials, including logos, fonts, color schemes, packaging layouts, and other components.",
        duration: "8+ business days",
      },
    ],
  ),
  new Service(
    "Campaign identity",
    "campaign-identity",
    "Development of identity systems for international and national forums, events, festivals, exhibitions, promotional and social campaigns, as well as special projects. A complete workflow — from research and concept development to design assets and brand guidelines — aimed at shaping a consistent, recognizable identity and ensuring effective visual communication across the entire campaign.",
    [
      {
        name: ["Research", "and Analysis"],
        description:
          "Conducting a briefing to define campaign goals, target audience, and key messages. Analyzing competing events and the broader cultural context. Developing the visual and strategic direction, supported by a moodboard that captures the conceptual foundation of the identity.",
        duration: "15+ business days",
      },
      {
        name: ["Visual Concept", "of the Campaign"],
        description:
          "Development of a unifying creative concept — the Big Idea that sets the tone and defines the visual language of all communications. Establishing the core design elements: logo or signature mark, color palette, typography, graphic patterns, photography style, copywriting, and iconography. All components are aligned under a single concept, ensuring a cohesive and consistent brand experience across every medium.",
        duration: "25+ business days",
        revisions: "1 concept, 2 rounds of revisions",
      },
      {
        name: ["Creation of Brand", "Materials"],
        description:
          "The adaptation of the visual concept extends across all formats and channels, including event and venue design, promotional and advertising assets, merchandise and souvenirs, as well as digital solutions for social media and web platforms. Every touchpoint follows the same identity system, ensuring a cohesive and recognizable visual presence.",
        duration: "20+ business days",
      },
      {
        name: ["Brand Guidelines", "and Materials"],
        description:
          "Creation of a brand guidelines document with recommendations on applying the campaign’s visual identity, along with the systematization of all source materials — including the signature mark, color schemes, typography, graphic elements, photo style, and templates for key deliverables. Preparation of a complete asset package to ensure consistent adaptation of the identity across formats.",
        duration: "8+ business days",
      },
    ],
  ),
  new Service(
    "Personal identity",
    "personal-identity",
    "Creation of a unique identity that reflects the individuality, values, and professional strengths of the person. A full cycle of work — from in-depth research of the individual and target audience to the development of visual elements and a brand guideline — aimed at shaping a cohesive, recognizable image and strengthening the personal brand.",
    [
      {
        name: ["In-Depth", "Interview", "and Research"],
        description:
          "Conducting a detailed and expert interview to explore the individual’s personality, values, goals, and professional environment. Analysis of the target audience and competitors. Based on this data, the conceptual foundation of the identity and a mood board are created.",
        duration: "10+ business days",
      },
      {
        name: ["Development of", "Visual", "Elements"],
        description:
          "Creating a logo, color palette, typography, graphic elements, and photo style that best reflect the individuality and values of the brand.",
        duration: "15+ business days",
        revisions: "1 concept, 2 rounds of revisions",
      },
      {
        name: ["Brand Guidelines", "and Materials"],
        description:
          "Adapting the visual concept to various media, including social media design, publication layouts, presentations, business documentation, packaging, and other materials to ensure brand consistency. Developing a guideline with recommendations for using the visual components of the brand and organizing materials for convenient use.",
        duration: "8+ business days",
      },
    ],
  ),
  new Service(
    "Brand support",
    "brand-support",
    "Brand support and development throughout its lifecycle. Ensuring the long-term relevance of the identity through regular monitoring, adaptation, and expansion. This includes overseeing brand standards compliance, market perception analysis, and staff training to ensure proper application of the brand in their activities.",
    [
      {
        name: ["Brand", "Supervision", "and Analysis"],
        description:
          "Ensuring correct application of brand elements across various media and communications in accordance with established standards, as well as regular assessment ofbrand perception by consumers and analysis of the competitive environment to make timely strategic adjustments.",
      },
      {
        name: ["Brand Adaptation", "and Expansion"],
        description:
          "Regular updates and adaptation of visual and verbal brand components based on new trends, technologies, and audience needs, along with the development of new products or services under the existing brand to maintain its relevance and expand its audience.",
      },
      {
        name: ["Employee", "Training", "and Support"],
        description:
          "Conducting training sessions and workshops for employees to ensure they properly represent and utilize the brand in their activities.",
      },
    ],
  ),
  new Service(
    "Naming",
    "naming",
    "Development of unique and strategically appropriate names for brands, products, or services. Market and competitor analysis is conducted, and creative techniques are used to create names aligned with project goals. Evaluation and validation of options ensure their uniqueness and strategic relevance.",
    [
      {
        name: ["Briefing", "and Research"],
        description:
          "Discussion of project goals, brand values, and target audience expectations during a detailed briefing. In-depth research of the product, market, and competitors to identify unique opportunities and niches.",
        duration: "7+ business days",
      },
      {
        name: ["Name Generation"],
        description:
          "Creation of name options using creative methods: associative and verbal mixing, generating new words by combining existing ones, utilizing cultural and historical references, as well as competitor analysis to ensure uniqueness. Final name options are presented with a rationale for their strategic relevance, along with an extended evaluation based on internal analysis, testing, and expert opinions.",
        duration: "10+ business days",
        revisions: "20 options, 2 rounds of revisions",
      },
      {
        name: ["Trademark Check", "and Registration", "(Optional)"],
        description:
          "Checking the availability of trademarks. Full legal registration is available through trusted partners in international markets. <br/> <br/>The next stage of brand development:<br/> <a href='/services/corporate-identity' class='text-[#FF3F1A] underline'>Corporate identity</a>, <a href='/services/product-identity' class='text-[#FF3F1A] underline'>Product identity</a>, <a href='/services/personal-identity' class='text-[#FF3F1A] underline'>Personal identity</a>, <a href='/services/logo' class='text-[#FF3F1A] underline'>Logo</a>",
      },
    ],
  ),
  new Service(
    "Logo",
    "logo",
    "Creation of a logo that accurately reflects the values and key characteristics of the brand. Development of concepts, including the selection of color schemes, typography, and stylistic elements, followed by the presentation of final versions adapted for different formats and media. The result is a logo that effectively conveys the brand's identity and serves as the foundation for further visual communication.",
    [
      {
        name: ["Briefing", "and Research"],
        description:
          "Conducting a briefing to define the project's goals and the brand's values. Analyzing the audience, competitors, and cultural context to identify unique opportunities. Creating a mood board to visualize the brand’s style and character.",
        duration: "7+ business days",
      },
      {
        name: ["Logo", "Development"],
        description:
          "Creation of a brand mark and logo: refining concepts, including color solutions, typography, and stylistic features. Presentation of final variants, including the brand mark, logo, permissible compositions, and color variations, adapted for various formats and media.",
        duration: "12+ business days",
        revisions: "3 options, 1 rounds of revisions",
      },
      {
        name: ["Logobook", "and Logo Assets"],
        description:
          "Development of a logobook with recommendations on logo usage across various media and in different formats and scales. Includes safe zone guidelines, typography, color palette, and source files in both vector and raster formats.<br/> <a href='https://google.com' target='_blank' class='text-[#FF3F1A] underline'>Click here to view a sample logobook PDF.</a>",
        duration: "5+ business days",
        nextStages:
          "The next stage of brand development:<br/> <a href='/services/corporate-identity' class='text-[#FF3F1A] underline'>Corporate identity</a>, <a href='/services/product-identity' class='text-[#FF3F1A] underline'>Product identity</a>, <a href='/services/campaign-identity' class='text-[#FF3F1A] underline'>Campaign identity</a>, <a href='/services/personal-identity' class='text-[#FF3F1A] underline'>Personal identity</a>",
      },
    ],
  ),
  new Service(
    "Packaging",
    "packaging",
    "Comprehensive packaging development: from product, audience, and competitor analysis to the preparation of production-ready materials. Packaging is designed to reflect brand identity, highlight competitive advantages, and meet market requirements. The design is adapted to various sizes and formats, ensuring versatility and brand consistency across all levels of communication.",
    [
      {
        name: ["Research", "and Analysis"],
        description:
          "Evaluation of the product, target audience, competitors, and market trends to identify unique characteristics and competitive advantages. Development of the brand’s visual and positioning direction, including the creation of a mood board that reflects the conceptual foundation of the brand identity.",
        duration: "15+ business days",
      },
      {
        name: ["Concept", "and Design", "Development"],
        description:
          "Development of conceptual solutions that reflect the brand identity, including the selection of materials, shapes, and functional features of the packaging. Detailed elaboration of graphic elements: logo, brand mark, typography, and color palette.",
        duration: "25+ business days",
        revisions: "1 concept, 2 rounds of revisions",
      },
      {
        name: ["Design", "Adaptation", "and Prepress", "Preparation"],
        description:
          "Adaptation of the packaging design for product lines, sizes, and types of products. Preparation of final layouts and technical files for printing, including specifications required for production.",
        duration: "15+ business days",
      },
      {
        name: ["Brand Guidelines", "and Materials"],
        description:
          "Development of a guide with recommendations for packaging usage, including logo placement, typography, color palette, and other design elements. Ensuring compliance with brand standards at all stages of production and application.",
        duration: "8+ business days",
      },
    ],
  ),
  new Service(
    "Brand guidelines",
    "brand-guidelines",
    "The development of Brand Guidelines is a key step in maintaining brand integrity. It includes the analysis of visual solutions, structuring of brand elements, and preparation of source materials. The guidelines standardize the application of brand components, ensuring consistency and brand recognition.",
    [
      {
        name: ["Style Analysis", "and Standardization"],
        description:
          "Audit of layouts and visual solutions. Identification of key elements, development of stylistic solutions, and rules for their application to form a unified brand concept.",
        duration: "3+ business days",
      },
      {
        name: ["Brand Guidelines", "Structure", "Development"],
        description:
          "Structuring the Brand Guidelines: positioning, values, and key brand messages. Development of recommendations for the application of the logo, fonts, color palette, graphics, and other elements. Definition of a set of rules and technical requirements for each category.",
        duration: "4+ business days",
      },
      {
        name: ["Material", "Adaptation", "and Description"],
        description:
          "Аdaptation of graphics and layouts for different formats and media in a unified style. Detailed description of layouts and materials with recommendations for application and production.",
        duration: "4+ business days",
      },
      {
        name: ["Preparation", "of Source", "Materials"],
        description:
          "Development of source files for logos, fonts, graphics, and other elements. Ensuring compliance with technical requirements for print and digital production.",
        duration: "4+ business days",
        nextStages:
          "The guidelines ensure brand integrity and standardize the use of visual elements across all communication levels. The development of Brand Guidelines is a key part of comprehensive work in creating <br/> <a href='/services/corporate-identity' class='text-[#FF3F1A] underline'>Corporate identity</a>, <a href='/services/product-identity' class='text-[#FF3F1A] underline'>Product identity</a>, <a href='/services/campaign-identity' class='text-[#FF3F1A] underline'>Campaign identity</a>, <a href='/services/personal-identity' class='text-[#FF3F1A] underline'>Personal identity</a>",
      },
    ],
  ),
  new Service(
    "UI/UX",
    "ui-ux",
    "UI/UX design focuses on creating convenient, functional, and visually refined digital products. This includes the development of landing pages, corporate websites, e‑commerce platforms, mobile, and web applications tailored to the brand's goals.",
    [
      {
        name: ["Research", "and Analysis"],
        description:
          "Assessment of the target audience, competitive environment, and industry trends. Formulating business objectives and defining functional requirements for further development.",
        duration: "5+ business days",
      },
      {
        name: ["Wireframing", "and User Flow"],
        description:
          "Creation of wireframes for key screens and user flow diagrams, defining navigation logic and user experience.",
        duration: "10+ business days",
      },
      {
        name: ["Content", "and Copywriting"],
        description:
          "Creation and integration of content (text, images, videos). Adapting materials for devices and platforms while considering the brand's concept. Developing text content and forming media assets.",
        duration: "12+ business days",
      },
      {
        name: ["Interface Design", "Development"],
        description:
          "Designing key screens and product pages, including the homepage, internal templates, forms, and interface elements. Designing with the brand's visual characteristics, functionality, and user convenience in mind. This includes responsive design, dynamic content animation, and screen transitions.",
        duration: "20+ business days",
      },
      {
        name: ["Development", "and Integration"],
        description:
          "Implementing UI/UX design into the product, including responsive layout and programming, using advanced technologies to create a functional digital product.",
        duration: "25+ business days",
      },
      {
        name: ["Testing,", "Optimization,", "and Deployment"],
        description:
          "Testing on various devices to identify functional and operational defects. System optimization, error correction, and content finalization. Deploying the product on target platforms with ensured stable performance.",
        duration: "10+ business days",
      },
      {
        name: ["Post-Launch", "Support"],
        description:
          "Providing technical support after the product launch: monitoring, identifying and fixing errors, optimizing functionality and performance based on analytics and user feedback. Adapting the product to changing requirements and continuous improvement.",
      },
    ],
  ),
  new Service(
    "Key Visual",
    "key-visual",
    "The Key Visual strengthens the brand identity, expressing its uniqueness through visual elements and creating a unified concept for all advertising materials. The development of the key visual image complements the existing identity, enhancing brand recognition and maintaining consistency across all communication channels.",
    [
      {
        name: ["Research", "and Analysis"],
        description:
          "Market research, target audience analysis, and competitor evaluation. Identifying audience needs and analyzing marketing trends. The results form the basis for creating a unique visual identity that reinforces the brand's positioning.",
        duration: "7+ business days",
      },
      {
        name: ["Strategy", "and Concept"],
        description:
          "Development of the strategic foundation and key message that reflects the brand's values. Creation of a creative concept based on unique metaphors to effectively convey the core ideas.",
        duration: "10+ business days",
      },
      {
        name: ["Key Visual", "Development"],
        description:
          "Creation of a visual image that complements the existing brand identity and strengthens its strategic message, forming a cohesive style that supports the brand’s perception.",
        duration: "12+ business days",
        revisions: "3 options, 1 rounds of revisions",
      },
      {
        name: ["Adaptation", "and Preparation", "of Materials"],
        description:
          "Adaptation of the Key Visual for various formats and communication channels: digital media, outdoor advertising, print materials, events, and other communications. Preparation of source files for use across all platforms, taking into account the requirements of each format.",
        duration: "5+ business days",
      },
    ],
  ),
  new Service(
    "Social Media Branding",
    "social-media-branding",
    "Creating a tailored social media identity that reflects your brand’s uniqueness and strengthens its competitive edge in the digital space. A full cycle of work — from developing the visual concept and content system to preparing templates and guidelines — ensures a consistent and recognizable brand presence across social media platforms.",
    [
      {
        name: ["Research", "and Analysis"],
        description:
          "In-depth analysis of the brand, target audience, and competitors within the digital landscape. Defining communication goals and selecting the key channels. Development of a mood board to establish the visual direction of the brand’s social media identity.",
        duration: "7+ business days",
      },
      {
        name: ["Visual Identity", "Concept"],
        description:
          "Designing a unified style and visual language for social media: color palette, typography, graphic elements, photography style, rubric design, and copywriting guidelines. Building a cohesive system that conveys the brand’s values and enhances recognition.",
        duration: "15+ business days",
      },
      {
        name: ["Branded Assets", "Development"],
        description:
          "Adapting the visual concept to various content formats: profile layouts, cover images and avatars, post and story design, rubric templates, video content design, and banners. Deliverables can be compiled into a comprehensive brand guideline for seamless implementation and scalability.",
        duration: "12+ business days",
      },
    ],
  ),
];

export default services;
