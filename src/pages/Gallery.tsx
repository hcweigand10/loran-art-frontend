import React, { ChangeEvent, useState, useEffect } from "react";
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
// import ArtModal from "../components/ArtModal";
import WallArt from "./WallArt";
import Back from "../components/Back";
import NoPricePiece from "../components/NoPricePiece";
import WholesalePiece from "../components/WholesalePiece";

const Gallery = () => {
  const [art, setArt] = useState<artPiece[]>([]);
  const [nodes, setNodes] = useState<React.ReactNode>([]);
  // const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  // const [selectedSizes, setSelectedSizes] = useState<Option[]>([]);
  // const [hideSold, setHideSold] = useState<boolean>(false);
  const [purchaseString, setPurchaseString] = useState<React.ReactNode>(
    <div></div>
  );
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
      const artPieces = res.data.arts.sort((a: artPiece,b: artPiece) => b.web_sort - a.web_sort);
      console.log(artPieces)
      setArt(artPieces);
    },
  });

  const email = (
    <p className="block align-items-bottom text-neutral-600 text-sm md:text-md">
      To purchase, email me at
      <a className="ml-1 underline" href="mailto:loranscruggs8@gmail.com">
        loranscruggs8@gmail.com
      </a>
    </p>
  );
  const etsy = (
    <p className="block align-items-bottom text-neutral-600 text-sm md:text-lg">
      To purchase, view on{" "}
      <a
        className="underline"
        href="https://www.etsy.com/shop/BottleCapWhistles"
      >
        Etsy
      </a>
    </p>
  );
  
  useEffect(() => {
    switch (galleryCategory) {
      case "sculptures":
        setPurchaseString(
          <div>
            <h4 className="text-neutral-600 text-sm md:text-lg">
              3 Dimensional art work created out of tin cans and found objects
            </h4>
            {email}
          </div>
        );
        setNodes(
          art.map((art: artPiece) => {
            return (
              <NoPricePiece
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                description={art.description}
                date_created={art.date_created}
                height={art.height}
                width={art.width}
                depth={art.depth}
                price={art.price}
                web={art.web}
                image={art.image}
                web_sort={art.web_sort}
                link_url={art.link_url}
                link_text={art.link_text}
                sold={art.sold}
                sold_date={art.sold_date}
                sold_location={art.sold_location}
                history={art.history}
                location={art.location}
                category={categoryIdToName(art.categoryId)}
                tags={art.tags.map((tagObj: any) => tagObj.name)}
              />
            );
          })
        );
        break;
      case "toys":
        setPurchaseString(
          <div>
            <h4 className="text-neutral-600 text-sm md:text-lg">
              Wooden toys covered in tin cans with bottle cap wheels
            </h4>
            {etsy}
          </div>
        );
        setNodes(
          art.map((art: artPiece) => {
            return (
              <NoPricePiece
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                description={art.description}
                date_created={art.date_created}
                height={art.height}
                width={art.width}
                depth={art.depth}
                price={art.price}
                web={art.web}
                image={art.image}
                web_sort={art.web_sort}
                link_url={art.link_url}
                link_text={art.link_text}
                sold={art.sold}
                sold_date={art.sold_date}
                sold_location={art.sold_location}
                history={art.history}
                location={art.location}
                category={categoryIdToName(art.categoryId)}
                tags={art.tags.map((tagObj: any) => tagObj.name)}
              />
            );
          })
        );
        break;
      case "planes":
        setPurchaseString(
          <div>
            <h4 className="text-neutral-600 text-sm md:text-lg">
              Airplanes made from tin cans, look great hung in a tree or rear view
              mirror
            </h4>
          </div>
        );
        setNodes(
          art.map((art: artPiece) => {
            return (
              <NoPricePiece
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                description={art.description}
                date_created={art.date_created}
                height={art.height}
                width={art.width}
                depth={art.depth}
                price={art.price}
                web={art.web}
                image={art.image}
                web_sort={art.web_sort}
                link_url={art.link_url}
                link_text={art.link_text}
                sold={art.sold}
                sold_date={art.sold_date}
                sold_location={art.sold_location}
                history={art.history}
                location={art.location}
                category={categoryIdToName(art.categoryId)}
                tags={art.tags.map((tagObj: any) => tagObj.name)}
              />
            );
          })
        );
        break;
      case "whistles":
        setPurchaseString(
          <div>
            <h4 className="text-neutral-600 text-sm md:text-lg">
              A working whistle made from bottle caps and tin.
            </h4>
            {etsy}
          </div>
        );
        setNodes(
          art.map((art: artPiece) => {
            return (
              <NoPricePiece
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                description={art.description}
                date_created={art.date_created}
                height={art.height}
                width={art.width}
                depth={art.depth}
                price={art.price}
                web={art.web}
                image={art.image}
                web_sort={art.web_sort}
                link_url={art.link_url}
                link_text={art.link_text}
                sold={art.sold}
                sold_date={art.sold_date}
                sold_location={art.sold_location}
                history={art.history}
                location={art.location}
                category={categoryIdToName(art.categoryId)}
                tags={art.tags.map((tagObj: any) => tagObj.name)}
              />
            );
          })
        );
        break;
      case "wholesale":
        setPurchaseString(
          <div>
            <h4 className="text-neutral-600 text-sm md:text-lg">
              Wholesale Whistles
            </h4>
          </div>
        );
        setNodes(
          art.map((art: artPiece) => {
            return (
              <WholesalePiece
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                description={art.description}
                date_created={art.date_created}
                height={art.height}
                width={art.width}
                depth={art.depth}
                price={art.price}
                web={art.web}
                image={art.image}
                web_sort={art.web_sort}
                link_url={art.link_url}
                link_text={art.link_text}
                sold={art.sold}
                sold_date={art.sold_date}
                sold_location={art.sold_location}
                history={art.history}
                location={art.location}
                category={categoryIdToName(art.categoryId)}
                tags={art.tags.map((tagObj: any) => tagObj.name)}
              />
            );
          })
        );
        break;
      default:
        setPurchaseString(
          <div>
            <h4 className="text-neutral-600 text-sm md:text-lg">
              3 Dimensional art work created out of tin cans and found objects
            </h4>
            {email}
          </div>
        );
        setNodes(
          art.map((art: artPiece) => {
            return (
              <ArtPiece
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                description={art.description}
                date_created={art.date_created}
                height={art.height}
                width={art.width}
                depth={art.depth}
                price={art.price}
                web={art.web}
                image={art.image}
                web_sort={art.web_sort}
                link_url={art.link_url}
                link_text={art.link_text}
                sold={art.sold}
                sold_date={art.sold_date}
                sold_location={art.sold_location}
                history={art.history}
                location={art.location}
                category={categoryIdToName(art.categoryId)}
                tags={art.tags.map((tagObj: any) => tagObj.name)}
              />
            );
          })
        );
        break;
    }
  
  }, [art])
  

  

  return (
    <div className="relative lg:max-w-4xl mx-auto">
      {/* <Back/> */}
      {/* <Hero/> */}
      <div className="mt-12 mb-4">
        <h1 className="text-3xl tracking-wider block">
          {toSentenceCase(galleryCategory)}
        </h1>
        {purchaseString}
      </div>
      <hr />
      <div className="my-4 pt-2 max-w-md mx-auto">
        {artLoading ? (
          <div className="">
            <Loading />
          </div>
        ) : null}
        {artData ? <div className="">{nodes}</div> : null}
      </div>
      {/* {showModal && modalArt ? (
        <ArtModal artpiece={modalArt} setShowModal={setShowModal} />
      ) : null} */}
    </div>
  );
};

export default Gallery;
