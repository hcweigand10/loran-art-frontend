import React, { ReactNode, useState } from "react";
import galleryAPI from "../utils/axios";
import Loading from "../components/Loading";
import ArtPiece from "../components/ArtPiece";
import toSentenceCase from "../utils/toSentenceCase";
import { artPiece } from "../interfaces/interfaces";
import { useQuery } from "react-query";
import Hero from "../components/Hero";

const Gallery = () => {
  const [art, setArt] = useState<ReactNode>();
  const queryParameters = new URLSearchParams(window.location.search);
  const galleryCategory = queryParameters.get("category") || "wall";

  const { data, isLoading, isSuccess, isError } = useQuery({
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
            key={art.id}
            title={art.title}
            description={art.description}
            size={art.size}
            price={art.price}
            forSale={art.forSale}
            image={art.image}
          />
        ))
      );
    },
    staleTime: 100000000000,
  });

  return (
    <div className="">
      <Hero/>
      <h1 className='text-3xl font-light tracking-wider mb-4'>{toSentenceCase(galleryCategory)}</h1>
      <hr/>
      {isLoading ? (
        <div className="w-full">
          <Loading/>
        </div>
      ) : null}
      {data ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">{art}</div> : null}
    </div>
  );
};

export default Gallery;
