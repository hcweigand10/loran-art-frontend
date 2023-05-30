import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import galleryAPI from "../utils/axios";
import Loading from "../components/Loading";
import ArtPiece from "../components/ArtPiece";
import toSentenceCase from "../utils/toSentenceCase";
import { artPiece } from "../interfaces/interfaces";
import { useQuery } from "react-query";
import { MultiSelect, Option } from "react-multi-select-component";
import Hero from "../components/Hero";
import categoryIdToName from "../utils/categoryIdToName";
import ArtModal from "../components/ArtModal";
import WallArt from "./WallArt";
import Back from "../components/Back";

const Gallery = () => {
  const [art, setArt] = useState<artPiece[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Option[]>([]);
  const [hideSold, setHideSold] = useState<boolean>(false);
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [modalArt, setModalArt] = useState<artPiece>();

  const queryParameters = new URLSearchParams(window.location.search);
  const galleryCategory = queryParameters.get("category") || "toys";

  const { data: artData, isLoading: artLoading } = useQuery({
    queryKey: [galleryCategory],
    queryFn: () =>
      galleryAPI.get(
        `/api/categories/byname/${toSentenceCase(galleryCategory)}`
      ),
    onSuccess: (res): void => {
      const artPieces = res.data.Arts;
      setArt(artPieces);
    },
  });

  const purchaseString = () => {
    const email = (
      <p className="block align-items-bottom text-neutral-600 text-sm md:text-md">
        To purchase, email me at
        <a className="ml-1 underline" href="mailto:loranscruggs8@gmail.com">
          loranscruggs8@gmail.com
        </a>
      </p>
    );
    const etsy = (
      <p className="block align-items-bottom text-neutral-600 text-sm md:text-md">
        To purchase, view on{" "}
        <a
          className="ml-1 underline"
          href="https://www.etsy.com/shop/bottlecapwhistles/?etsrc=sdt"
        >
          Etsy
        </a>
      </p>
    );
    switch (galleryCategory) {
      case "sculptures":
        return email;
      case "toys":
        return email;
      case "planes":
        return etsy;
      case "whistles":
        return etsy;
      case "wholesale":
        return etsy;
      default:
        break;
    }
  };

  return (
        <div className="relative lg:max-w-5xl mx-auto">
          <Back/>
          {/* <Hero/> */}
          <div className="pt-12 mt-6 mb-4">
            <h1 className="text-3xl tracking-wider block">
              {toSentenceCase(galleryCategory)}
            </h1>
            {purchaseString()}
          </div>
          <hr />
          <div className="my-4 pt-2 max-w-2xl mx-auto">
              {artLoading ? (
                <div className="">
                  <Loading />
                </div>
              ) : null}
              {artData ? (
                <div className="">
                  {art.map((art: artPiece) => {
                    return (
                      <ArtPiece
                        id={art.id}
                        key={art.id}
                        title={art.title}
                        description={art.description}
                        height={art.height}
                        width={art.width}
                        thickness={art.thickness}
                        price={art.price}
                        forSale={art.forSale}
                        image={art.image}
                        category={categoryIdToName(art.CategoryId)}
                        tags={art.Tags.map((tagObj: any) => tagObj.name)}
                      />
                    );
                  })}
                </div>
              ) : null}
          </div>
          {/* {showModal && modalArt ? (
        <ArtModal artpiece={modalArt} setShowModal={setShowModal} />
      ) : null} */}
        </div>
  );
};

export default Gallery;
