import arshaluysPic from "@/../public/cover_project-arshaluys.jpg";
import cancerPic from "@/../public/cover_project-cancer.jpg";
import caspianGoldPic from "@/../public/cover_project-caspian-gold.jpg";
import fffPic from "@/../public/cover_project-fff.jpg";
import smartStoryPic from "@/../public/cover_project-smart-stroy.jpg";
import spilePic from "@/../public/cover_project-spile.jpg";

import Project from "./project";

const projects: Project[] = [
  new Project("Feel Full Free", fffPic, "", ["Logo", "Product branding"], 6),
  new Project("Spile", spilePic, "", ["Logo", "Product branding"], 5),
  new Project(
    "Caspian Gold",
    caspianGoldPic,
    "",
    ["Logo", "Product branding"],
    4,
  ),
  new Project(
    "Cancer screening campaign in Moscow",
    cancerPic,
    "",
    ["Logo", "Product branding"],
    3,
  ),
  new Project(
    "Arshaluys",
    arshaluysPic,
    "Logo, Product branding",
    ["Logo", "Product branding"],
    2,
    "arshaluys",
  ),
  new Project(
    "Smartstroy",
    smartStoryPic,
    "",
    ["Logo", "Product branding"],
    1,
    "smartstroy",
  ),
];

export default projects;
