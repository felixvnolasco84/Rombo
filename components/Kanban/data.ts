import { colors } from "@atlaskit/theme";
import type { Author, Quote, QuoteMap } from "./types";
import finnImg from "../static/media/finn-min.png";
import bmoImg from "../static/media/bmo-min.png";
import princessImg from "../static/media/princess-min.png";
import jakeImg from "../static/media/jake-min.png";

const jake: Author = {
  id: "1",
  name: "Jake",
  url: "http://adventuretime.wikia.com/wiki/Jake",
  avatarUrl:
    "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png/revision/latest?cb=20190807133015",
  colors: {
    soft: colors.Y50,
    hard: colors.N400A,
  },
};

const BMO: Author = {
  id: "2",
  name: "BMO",
  url: "http://adventuretime.wikia.com/wiki/BMO",
  avatarUrl:
    "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/8/81/BMO.png/revision/latest?cb=20200613123757",
  colors: {
    soft: colors.G50,
    hard: colors.N400A,
  },
};

const finn: Author = {
  id: "3",
  name: "Finn",
  url: "http://adventuretime.wikia.com/wiki/Finn",
  avatarUrl:
    "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/f/f3/Original_Finn.png/revision/latest/scale-to-width-down/1000?cb=20200424114126",
  colors: {
    soft: colors.B50,
    hard: colors.N400A,
  },
};

const princess: Author = {
  id: "4",
  name: "Princess bubblegum",
  url: "http://adventuretime.wikia.com/wiki/Princess_Bubblegum",
  avatarUrl:
    "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/0/00/Princess_Bubblegum.png/revision/latest?cb=20190807133134",
  colors: {
    soft: colors.P50,
    hard: colors.N400A,
  },
};

export const authors: Author[] = [jake, BMO, finn, princess];

export const quotes: Quote[] = [
  {
    id: "1",
    content: "Sometimes life is scary and dark",
    author: BMO,
  },
  {
    id: "2",
    content:
      "Sucking at something is the first step towards being sorta good at something.",
    author: jake,
  },
  {
    id: "3",
    content: "You got to focus on what's real, man",
    author: jake,
  },
  {
    id: "4",
    content: "Is that where creativity comes from? From sad biz?",
    author: finn,
  },
  {
    id: "5",
    content: "Homies help homies. Always",
    author: finn,
  },
  {
    id: "6",
    content: "Responsibility demands sacrifice",
    author: princess,
  },
  {
    id: "7",
    content: "That's it! The answer was so simple, I was too smart to see it!",
    author: princess,
  },
  {
    id: "8",
    content:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    author: finn,
  },
  {
    id: "9",
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    author: finn,
  },
  {
    id: "10",
    content: "I should not have drunk that much tea!",
    author: princess,
  },
  {
    id: "11",
    content: "Please! I need the real you!",
    author: princess,
  },
  {
    id: "12",
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    author: princess,
  },
];
