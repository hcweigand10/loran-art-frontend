import { Dispatch, SetStateAction } from "react";

export interface artPiece {
  mdk: number;
  title: string;
  description: string;
  date_created: string;
  height: number;
  width: number;
  depth: number;
  price: number;
  web: boolean;
  image: string;
  notes: string;
  categoryId: number;
  category?: string;
  hours: number;
  old_price: number;
  date: string;
  web_sort: number,
  link_url: string,
  link_text: string,
  location: string,
  sold: boolean,
  sold_date: string
  sold_location: string,
  history: string,
  mdk: number,
  
  tags: any[]
}

export interface formProps {
  artId: number;
}

export interface artPieceNode {
  key?: number;
  mdk: number;
  title: string;
  location: string;
  description: string;
  date_created: string;
  height: number;
  width: number;
  depth: number;
  price: number;
  web: boolean;
  image: string;
  category: string;
  web_sort: number,
  link_url: string,
  link_text: string,
  location: string,
  sold: boolean,
  sold_date: string
  sold_location: string,
  history: string,
  mdk: number,
  tags: string[]
}

export interface table {
  art: artPiece[];
  selectedCategory: string;
  tagsData: {id: number, name: string}[]
  deleteArt: (id: number, title: string) => Promise<void>;
  setModalArt: Dispatch<SetStateAction<artPiece | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface tableRow {
  key?: number;
  mdk: number;
  title: string;
  location: string;
  description: string;
  date_created: string;
  height: number;
  width: number;
  hours: number;
  depth: number;
  price: number;
  old_price: number;
  web: boolean;
  image: string;
  category: string;
  notes: string;
  sold: boolean,
  sold_date: string
  sold_location: string,
  history: string,
  link_url: string,
  link_text: string,
  web_sort: number,
  tags: {id: number, name: string}[]
  delete: (id: number, title: string) => Promise<void>;
  setModalArt: () => void;
  setShowModal: () => void;
}

export interface userInterface {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface emailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type Email = (props: emailProps) => {
  subject: string;
  body: ReactElement;
};

export type csvItem = {
  Category: string;
  Location: string;
  "Inventory No#": string;
  "Lorans internal description": string;
  Title: string;
  Tags: string;
  "Date Created": string;
  Hours: string;
  Price: string;
  "Old Price": string;
  Width: number;
  Height: number;
  Depth: number;
  Area: number;
  "Recommended Price $2 x Sq Inch": string;
  "Sold- or otherwise not available": string;
  "Sold Date": string;
  "Sold Location or Gift or Donation": string;
  "Histry Theme Price WAS": string;
  "Notes Location": string;
  "Web Description": string;
  "Link URL": string;
  "Link Text": string;
  Web: string;
  "Web Short": string;
  "MDK UniqueID Do not change": string;
  "Photo Name": string;
};