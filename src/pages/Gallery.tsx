import React, { ReactNode, useState } from "react";
import galleryAPI from "../utils/axios";
import Loading from "../components/Loading";
import ArtPiece from "../components/ArtPiece";
import toSentenceCase from "../utils/toSentenceCase";
import { artPiece } from "../interfaces/interfaces";
import { useQuery } from "react-query";

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
    <div className="p-4">
      <h3>Gallery</h3>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : null}
      {data ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">{art}</div> : null}
    </div>
  );
};

export default Gallery;
