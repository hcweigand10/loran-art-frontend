import { Dispatch, SetStateAction } from "react"

export interface artPiece {
  id: number,
  title: string,
  description: string,
  size: string,
  price: number,
  forSale: boolean,
  image: string,
  CategoryId: number
}

export interface artPieceNode {
  key: number,
  title: string,
  description: string,
  size: string,
  price: number,
  forSale: boolean,
  image: string,
  category: string
}

export interface userInterface {
  loggedIn: boolean,
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
}