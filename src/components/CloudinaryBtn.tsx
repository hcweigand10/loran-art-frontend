import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import { artPiece } from "../interfaces/interfaces";
import { Cloudinary } from "@cloudinary/url-gen";
import { image } from "@cloudinary/url-gen/qualifiers/source";

interface props {
  image: boolean
  handleImageUpload: (url: string) => void
  artInfo: artPiece
  setArtInfo: Dispatch<SetStateAction<artPiece>>
}

const CloudinaryBtn = (props: props) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dz815dbbu",
          uploadPreset: "xokmzqf8",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            console.log(props.artInfo)
            props.setArtInfo({ ...props.artInfo, image: result.info.url });
          }
        }
      );
    }
  }, []);

  return (
    <button
      type="button"
      className="button p-2 bg-primary text-white rounded hover:drop-shadow-md"
      onClick={() => {
        widgetRef.current.open();
        console.log(props.artInfo)
      }}
    >
      {props.image ? "Change" : "Upload"}
    </button>
  );
};

export default CloudinaryBtn;
