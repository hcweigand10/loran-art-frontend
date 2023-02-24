import axios from "axios"

const galleryAPI = axios.create({
  baseURL: "https://lovely-fashion-hare.cyclic.app",
  timeout: 1000,
})

export default galleryAPI
