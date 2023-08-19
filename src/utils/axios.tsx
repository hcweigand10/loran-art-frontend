import axios from "axios"


const galleryAPI = axios.create({
  baseURL: "https://lovely-fashion-hare.cyclic.app",
  // baseURL: "http://localhost:3001",
  timeout: 15000,
})

export default galleryAPI
