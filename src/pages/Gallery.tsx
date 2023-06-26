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
          className="underline"
          href="https://www.etsy.com/shop/bottlecapwhistles/?etsrc=sdt"
        >
          Etsy
        </a>
      </p>
    );
    switch (galleryCategory) {
      case "sculptures":
        return (<div>
          <h4 className="text-neutral-600 text-sm md:text-md">3 Dimensional art work created out of tin cans and found objects</h4>
          {email}
        </div>);
      case "toys":
        return (<div>
          <h4 className="text-neutral-600 text-sm md:text-md">Wooden toys covered in tin cans  with bottle cap wheels</h4>
          {etsy}
        </div>);
      case "planes":
        return (<div>
          <h4 className="text-neutral-600 text-sm md:text-md">Airplanes made from tin cans, look great hung in a tree or rear view mirror</h4>
          {etsy}
        </div>);
      case "whistles":
        return (<div>
          <h4 className="text-neutral-600 text-sm md:text-md">A working whistle made from bottle caps and tin.</h4>
          {etsy}
        </div>);
      case "wholesale":
        return (<div>
          <h4 className="text-neutral-600 text-sm md:text-md">25 Whistles: All Soda cap whistles, $250</h4>
          <h4 className="text-neutral-600 text-sm md:text-md">Mixture of 13 Soda cap and 12 beer caps. $231.25</h4>
          {etsy}
        </div>);
      default:
        break;
    }
  };

  return (
        <div className="relative lg:max-w-5xl mx-auto">
          {/* <Back/> */}
          {/* <Hero/> */}
          <div className="mt-12 mb-4">
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
