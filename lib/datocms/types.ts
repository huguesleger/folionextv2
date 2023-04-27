import { StructuredText } from "datocms-structured-text-utils";

export namespace GraphQLResponse {
  export interface HomePage {
    home: Home;
  }

  export interface ContactPage {
    contact: Contact;
  }

  export interface AllProjets {
    allProjets: [Projet];
  }

  export interface Projet {
    projet: Projet;
  }

  export interface AboutPage {
    about: About;
  }

  export interface About {
    id: string;
    _modelApiKey: string;
    titre: string;
    titre2: string;
    titreBio: string;
    iconBio: string;
    texteBio: StructuredText<any>;
    imageBio: Image;
    texteCircle: TexteCircle[];
    titreCursus: string;
    listeCursus: ListeCursus[];
    titreCompetence: TitreCompetence[];
    listeCompetence: ListeCompetence[];
    listeCompetenceItems: ListeCompetenceItems[];
    titreContact: string;
    emailContact: string;
  }

  export interface Projet {
    id: string;
    slug: string;
    colorSection: Color;
    colorText: string;
    titre: string;
    imageSlider: Image;
    annee: string;
    titreCharte: string;
    descriptionCharte: string;
    texteProjet: StructuredText<any>;
    intervention: string;
    siteWeb: string;
    imageCharte: ImageCharte[];
    imageCharteBottom: ImageCharte[];
    imageFull: Image;
    imagePage: ImagePage[];
    imageTemplateDesktopFull: Image;
    imageTemplateDesktop: Image;
    colorSectionMobile: Color;
    imageTemplateMobile: Image;
    imageDevice: Image;
    description: StructuredText<any>;
    codeCouleur: CodeColor[];
    texteSlider: StructuredText<any>;
    imageGraphique: Image;
    imageCard: ImageCard[];
    texteImageCard: StructuredText<any>;
  }

  export interface Home {
    id: string;
    _modelApiKey: string;
    titre: string;
    image: Image;
    titleLastProject: string;
    subtitleLastProject: string;
    lastWork: LastWork[];
    texteEntrer: string;
    titreEntrer: string;
    email: string;
    titreContact: string;
  }

  export interface Contact {
    id: string;
    _modelApiKey: string;
    titre: string;
    titre2: string;
    email: string;
    image: Image;
  }

  // export interface Projet {
  //   id: string;
  //   slider: Slider[];
  // }
}

interface LastWork {
  id: string;
  _modelApiKey: string;
  titre: string;
  typeProjet: string;
  slug: string;
  image: Image;
  target: number;
}

interface ImageCharte {
  id: string;
  image: Image;
}

interface ImagePage {
  id: string;
  image: Image;
}
interface ImageCard {
  id: string;
  image: Image;
}

interface Image {
  id: string;
  alt: string;
  url: string;
  width: number;
  height: number;
}

interface CodeColor {
  id: string;
  _modelApiKey: string;
  titre: string;
  colorText: string;
  color: Color;
}

interface Color {
  hex: string;
}

interface TexteCircle {
  _modelApiKey: string;
  id: string;
  texte: string;
}

interface ListeCursus {
  _modelApiKey: string;
  id: string;
  titre: string;
  ecole: string;
  annee: string;
  image: Image;
}

interface TitreCompetence {
  _modelApiKey: string;
  id: string;
  titre: string;
  icon: string;
}

interface ListeCompetence {
  _modelApiKey: string;
  id: string;
  number: string;
  icon: string;
  titre: string;
  description: StructuredText<any>;
}

interface ListeCompetenceItems {
  _modelApiKey: string;
  id: string;
  number: string;
  icon: string;
  titre: string;
  listeServiceLeft: ListeService[];
  listeServiceCenter: ListeService[];
  listeServiceRight: ListeService[];
}

interface ListeService {
  _modelApiKey: string;
  id: string;
  texte: string;
}

interface Slider {
  id: string;
  _modeApiKey: string;
  titre: string;
  image: Image;
  lien: string;
}
