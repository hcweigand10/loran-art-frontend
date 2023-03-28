import { Dispatch, SetStateAction } from "react"

export interface artPiece {
  id: number,
  title: string,
  description: string,
  size: string,
  price: number,
  forSale: boolean,
  image: string,
  CategoryId: number,
  category?: string
}

export interface formProps {
  artId: number
}

export interface artPieceNode {
  key: number,
  id: number,
  title: string,
  description: string,
  size: string,
  price: number,
  forSale: boolean,
  image: string,
  category: string,
  setLoading: Dispatch<SetStateAction<boolean>>
}

export interface tableRow {
  key: number,
  id: number,
  title: string,
  description: string,
  size: string,
  price: number,
  forSale: boolean,
  image: string,
  category: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  delete: (id: number, title: string) => Promise<void>
}

export interface userInterface {
  loggedIn: boolean,
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
}

