import React, { useState, useEffect, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const CloudinaryBtn = () => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(window.cloudinary)
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dz815dbbu",
          uploadPreset: "xokmzqf8",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
          }
        }
      );
    }
    console.log(widgetRef)
  }, []);

  return (
    <button
      type="button"
      className="button p-2 bg-primary text-white rounded hover:drop-shadow-md"
      onClick={() => {
        console.log(widgetRef);
        widgetRef.current.open();
      }}
    >
      Upload
    </button>
  );
};

export default CloudinaryBtn;
