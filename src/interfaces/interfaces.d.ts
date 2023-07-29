import { Dispatch, SetStateAction } from "react";

export interface artPiece {
  id: number;
  title: string;
  description: string;
  height: number;
  width: number;
  thickness: number;
  price: number;
  forSale: boolean;
  image: string;
  notes: string;
  CategoryId: number;
  category?: string;
  hours: number;
  oldPrice: number;
  date: string;
  sortPriority: number,
  linkUrl: string,
  linkText: string,
  Tags: any[]
}

export interface formProps {
  artId: number;
}

export interface artPieceNode {
  key?: number;
  id: number;
  title: string;
  description: string;
  height: number;
  width: number;
  thickness: number;
  price: number;
  forSale: boolean;
  image: string;
  category: string;
  sortPriority: number,
  linkUrl: string,
  linkText: string,
  tags: string[]
}

export interface table {
  art: artPiece[];
  selectedCategory: string;
  deleteArt: (id: number, title: string) => Promise<void>;
  setModalArt: Dispatch<SetStateAction<artPiece | undefined>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface tableRow {
  key?: number;
  id: number;
  title: string;
  description: string;
  height: number;
  width: number;
  thickness: number;
  price: number;
  forSale: boolean;
  image: string;
  category: string;
  notes: string;
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
