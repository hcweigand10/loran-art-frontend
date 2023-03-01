import axios from "axios"

const galleryAPI = axios.create({
  baseURL: "https://lovely-fashion-hare.cyclic.app",
  timeout: 15000,
})

export default galleryAPI
