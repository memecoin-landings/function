import arshaluysPic from "@/../public/cover_project-arshaluys.jpg";
import cancerPic from "@/../public/cover_project-cancer.jpg";
import caspianGoldPic from "@/../public/cover_project-caspian-gold.jpg";
import fffPic from "@/../public/cover_project-fff.jpg";
import smartStoryPic from "@/../public/cover_project-smart-stroy.jpg";
import spilePic from "@/../public/cover_project-spile.jpg";
import Project from "@/domain/project/project";

const projects: Project[] = [
  new Project({
    title: "Feel Full Free",
    image: fffPic,
    topics: [
      "Corporate identity",
      "Naming",
      "Logo",
      "Brand guidelines",
      "Key Visual",
    ],
    tags: [
      "corporate-identity",
      "naming",
      "logo",
      "brand-guidelines",
      "key-visual",
    ],
    weight: 6,
  }),

  new Project({
    title: "Spile",
    image: spilePic,
    topics: [
      "Product identity",
      "Naming",
      "Logo",
      "Packaging",
      "Brand guidelines",
      "Key Visual",
    ],
    tags: [
      "product-identity",
      "naming",
      "logo",
      "packaging",
      "brand-guidelines",
      "key-visual",
    ],
    weight: 5,
  }),
  new Project({
    title: "Caspian Gold",
    image: caspianGoldPic,
    topics: [
      "Product identity",
      "Naming",
      "Logo",
      "Packaging",
      "Brand guidelines",
      "Key Visual",
    ],
    tags: [
      "product-identity",
      "naming",
      "logo",
      "packaging",
      "brand-guidelines",
      "key-visual",
    ],
    weight: 4,
  }),
  new Project({
    title: "Cancer screening campaign in Moscow",
    image: cancerPic,
    topics: [
      "Campaign Identity",
      "Brand guidelines",
      "Key Visual",
      "Social Media Branding",
    ],
    tags: [
      "campaign-identity",
      "brand-guidelines",
      "key-visual",
      "social-media-branding",
    ],
    weight: 3,
  }),
  new Project({
    title: "Arshaluys",
    image: arshaluysPic,
    description: "Logo, Product branding",
    topics: [
      "Product identity",
      "Logo",
      "Packaging",
      "Brand guidelines",
      "Key Visual",
    ],
    tags: [
      "product-identity",
      "logo",
      "packaging",
      "brand-guidelines",
      "key-visual",
    ],
    weight: 2,
    slug: "arshaluys",
  }),
  new Project({
    title: "Smartstroy",
    image: smartStoryPic,
    topics: ["Product identity", "Logo", "Brand guidelines"],
    tags: ["product-identity", "logo", "brand-guidelines"],
    weight: 1,
    slug: "smartstroy",
  }),
];

export default projects;
