import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import galleryAPI from "../utils/axios";
import Loading from "../components/Loading";
import ArtPiece from "../components/ArtPiece";
import toSentenceCase from "../utils/toSentenceCase";
import { artPiece } from "../interfaces/interfaces";
import { useQuery } from "react-query";
import Hero from "../components/Hero";
import categoryIdToName from "../utils/categoryIdToName";

const Gallery = () => {
  const [art, setArt] = useState<ReactNode>();
  const [loading, setLoading] = useState<boolean>(true);
  const queryParameters = new URLSearchParams(window.location.search);
  const galleryCategory = queryParameters.get("category") || "wall";

  const { data, isLoading } = useQuery({
    queryKey: [galleryCategory],
    queryFn: () =>
      galleryAPI.get(
        `/api/categories/byname/${toSentenceCase(galleryCategory)}`
      ),
    onSuccess: (data): void => {
      console.log(data);
      setArt(
        data.data.Arts.map((art: artPiece) => (
          <ArtPiece
            id={art.id}
            key={art.id}
            title={art.title}
            description={art.description}
            size={art.size}
            price={art.price}
            forSale={art.forSale}
            image={art.image}
            category={categoryIdToName(art.CategoryId)}
            setLoading={setLoading}
          />
        ))
      );
    },
  });

  return (
    <div className="relative lg:max-w-4xl mx-auto container">
      <Link to="/" className="absolute top-3 left-0 border-b border-primary">
        <FontAwesomeIcon icon={faArrowLeft}/> Go back
      </Link>
      <Hero/>
      <div className="flex justify-between">
        <h1 className="text-3xl font-light tracking-wider mb-4 block">
          {toSentenceCase(galleryCategory)}
        </h1>
        <p className="block flex align-items-bottom text-neutral-600 italic">
          To purchase, email me at{" "}
          <a href="mailto:loranscruggs8@gmail.com">loranscruggs8@gmail.com</a>
        </p>
      </div>
      <hr />
      {isLoading ? (
        <div className="">
          <Loading />
        </div>
      ) : null}
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">{art}</div>
      ) : null}
    </div>
  );
};

export default Gallery;
