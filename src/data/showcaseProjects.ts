import cArotOne from "../../showcase_landing/c-arot/c-arot-1.png";
import cArotTwo from "../../showcase_landing/c-arot/c-arot-2.png";
import cArotThree from "../../showcase_landing/c-arot/c-arot-3.png";
import cArotFour from "../../showcase_landing/c-arot/c-arot-4.png";
import goDaikinOne from "../../showcase_landing/daikin-acson/go-daikin-p4-1.png";
import goDaikinTwo from "../../showcase_landing/daikin-acson/go-daikin-p4-2.png";
import goDaikinThree from "../../showcase_landing/daikin-acson/go-daikin-p4-3.png";
import myAcsonOne from "../../showcase_landing/daikin-acson/my-acson-1.PNG";
import docsToDataOne from "../../showcase_landing/docs-to-data/docs-to-data-1.png";
import docsToDataTwo from "../../showcase_landing/docs-to-data/docs-to-data-2.png";
import kamiOne from "../../showcase_landing/kami-inventory-demo/kami-inventory-demo-1.png";
import kamiTwo from "../../showcase_landing/kami-inventory-demo/kami-inventory-demo-2.png";
import n0tedOne from "../../showcase_landing/n0ted/n0ted-1.png";
import n0tedTwo from "../../showcase_landing/n0ted/n0ted-2.png";
import n0tedThree from "../../showcase_landing/n0ted/n0ted-3.png";
import shibaOne from "../../showcase_landing/shiba-watch-tracker/shiba-watch-tracker-1.png";
import shibaTwo from "../../showcase_landing/shiba-watch-tracker/shiba-watch-tracker-2.png";
import shibaThree from "../../showcase_landing/shiba-watch-tracker/shiba-watch-tracker-3.png";
import shibaWatchOne from "../../showcase_landing/shiba-watch-tracker/shiba-watch-tracker-watch-1.png";
import shibaWatchTwo from "../../showcase_landing/shiba-watch-tracker/shiba-watch-tracker-watch-2.png";

export type ShowcaseDevice = "phone" | "laptop";

export type ShowcaseImage = {
  src: string;
  alt: string;
  frameRatio?: number;
};

export type ShowcaseProject = {
  id: string;
  title: string;
  description: string;
  device: ShowcaseDevice;
  images: ShowcaseImage[];
  watchImages?: string[];
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "go-daikin-phase-4",
    title: "Go Daikin Phase 4",
    description: "App UI redesign",
    device: "phone",
    images: [
      { src: goDaikinOne, alt: "Go Daikin mobile app home screen", frameRatio: 1179 / 2556 },
      { src: goDaikinTwo, alt: "Go Daikin mobile app feature screen", frameRatio: 1179 / 2556 },
      { src: goDaikinThree, alt: "Go Daikin mobile app content screen", frameRatio: 1179 / 2556 },
    ],
  },
  {
    id: "my-acson",
    title: "My Acson",
    description: "Connected-home control experience",
    device: "phone",
    images: [{ src: myAcsonOne, alt: "My Acson mobile app screen", frameRatio: 1170 / 2532 }],
  },
  {
    id: "docs-to-data",
    title: "DocsToData",
    description: "Document intelligence workspace",
    device: "laptop",
    images: [
      { src: docsToDataOne, alt: "DocsToData document chat interface" },
      { src: docsToDataTwo, alt: "DocsToData document summary interface" },
    ],
  },
  {
    id: "c-arot",
    title: "C-arot",
    description: "Playful tarot and astrology experience",
    device: "laptop",
    images: [
      { src: cArotOne, alt: "C-arot tarot and astrology landing page" },
      { src: cArotTwo, alt: "C-arot tarot experience screen" },
      { src: cArotThree, alt: "C-arot astrology experience screen" },
      { src: cArotFour, alt: "C-arot interpretation screen" },
    ],
  },
  {
    id: "kami-inventory",
    title: "KAMI Inventory",
    description: "Inventory tracking for small teams",
    device: "phone",
    images: [
      { src: kamiOne, alt: "KAMI Inventory mobile interface", frameRatio: 988 / 1738 },
      { src: kamiTwo, alt: "KAMI Inventory mobile inventory screen", frameRatio: 994 / 1658 },
    ],
  },
  {
    id: "n0ted",
    title: "N0ted",
    description: "Mobile notes for ideas on the move",
    device: "phone",
    images: [
      { src: n0tedOne, alt: "N0ted mobile notes screen", frameRatio: 1206 / 2622 },
      { src: n0tedTwo, alt: "N0ted mobile notes detail screen", frameRatio: 1206 / 2622 },
      { src: n0tedThree, alt: "N0ted mobile notes organization screen", frameRatio: 1206 / 2622 },
    ],
  },
  {
    id: "shiba-watch-tracker",
    title: "Shiba Watch Tracker",
    description: "A health and to-do leveling app",
    device: "phone",
    images: [
      { src: shibaOne, alt: "Shiba Watch Tracker mobile dashboard", frameRatio: 1206 / 2622 },
      { src: shibaTwo, alt: "Shiba Watch Tracker mobile growth screen", frameRatio: 1206 / 2622 },
      { src: shibaThree, alt: "Shiba Watch Tracker mobile tracker screen", frameRatio: 1206 / 2622 },
    ],
    watchImages: [shibaWatchOne, shibaWatchTwo, shibaWatchTwo],
  },
];
