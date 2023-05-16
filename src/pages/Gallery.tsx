import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import galleryAPI from "../utils/axios";
import Loading from "../components/Loading";
import ArtPiece from "../components/ArtPiece";
import toSentenceCase from "../utils/toSentenceCase";
import { artPiece } from "../interfaces/interfaces";
import { useQuery } from "react-query";
import { MultiSelect, Option } from "react-multi-select-component";
import Hero from "../components/Hero";
import categoryIdToName from "../utils/categoryIdToName";
import categoryNameToId from "../utils/categoryNameToId";
import ArtModal from "../components/ArtModal";

const Gallery = () => {
  const [art, setArt] = useState<artPiece[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Option[]>([]);
  const [hideSold, setHideSold] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalArt, setModalArt] = useState<artPiece>();

  const queryParameters = new URLSearchParams(window.location.search);
  const galleryCategory = queryParameters.get("category") || "wall-art";

  const sizeOptions = [
    { label: `Small (largest dimension under 8")`, value: "small" },
    { label: `Medium (largest dimension between 8" and 18")`, value: "medium" },
    { label: `Large (largest dimension over 18")`, value: "large" },
  ];

  const { data: tagsData, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => galleryAPI.get("/api/tags"),
    // onSuccess: (res: any): void => {

    // },
  });

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

  const applyFilters = (art: artPiece[]) => {
    let filteredArt = [...art];
    if (hideSold) {
      filteredArt = filteredArt.filter(
        (artPiece: artPiece) => artPiece.forSale
      );
    }
    if (selectedSizes.length === 1 || selectedSizes.length === 2) {
      // console.log(selectedSizes)
      if (!selectedSizes.includes({ label: "Small", value: "small" })) {
        filteredArt = filteredArt.filter((artPiece: artPiece) => {
          return Math.max(artPiece.height, artPiece.width) >= 8;
        });
      }
      if (!selectedSizes.includes({ label: "Medium", value: "medium" })) {
        filteredArt = filteredArt.filter((artPiece: artPiece) => {
          return (
            Math.max(artPiece.height, artPiece.width) <= 8 ||
            Math.max(artPiece.height, artPiece.width) >= 18
          );
        });
      }
      if (!selectedSizes.includes({ label: "Large", value: "large" })) {
        filteredArt = filteredArt.filter((artPiece: artPiece) => {
          return Math.max(artPiece.height, artPiece.width) <= 18;
        });
      }
    }
    if (selectedTags.length !== 0) {
      filteredArt = filteredArt.filter((artPiece: artPiece) => {
        return artPiece.Tags.some((tagObj: any) =>
          selectedTags.map((option: Option) => option.value).includes(tagObj.id)
        );
      });
    }
    return filteredArt.map((art: artPiece) => (
      <div
        onClick={() => {
          setShowModal(true);
          setModalArt(art);
        }}
      >
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
      </div>
    ));
  };

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHideSold(!hideSold);
  };

  const purchaseString = () => {
    const email = (
      <p className="block flex align-items-bottom text-neutral-600">
        To purchase, email me at
        <a className="ml-1 underline" href="mailto:loranscruggs8@gmail.com">
          loranscruggs8@gmail.com
        </a>
      </p>
    );
    const etsy = (
      <p className="block flex align-items-bottom text-neutral-600">
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
      case "wall-art":
        return email;
        break;
      case "sculptures":
        return email;
        break;
      case "toys":
        return email;
        break;
      case "planes":
        return etsy;
        break;
      case "whistles":
        return etsy;
        break;
      case "wholesale":
        return etsy;
        break;
      default:
        break;
    }
  };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="relative lg:max-w-6xl mx-auto">
      <Link
        to="/"
        className="absolute top-2 left-0 border-b border-primary text-neutral-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Go back
      </Link>
      {/* <Hero/> */}
      <div className="pt-12 mt-6 mb-4">
        <h1 className="text-2xl font-light tracking-wider block">
          {toSentenceCase(galleryCategory)}
        </h1>
        {purchaseString()}
      </div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        {/* filters */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl mt-4 font-light">Filters</h3>
          <div className="relative w-full">
            {galleryCategory === "wall-art" && (
              <>
                {tagsLoading ? (
                  <div className="">
                    <Loading />
                  </div>
                ) : null}
                {tagsData ? (
                  <>
                    <div className="my-4">
                      <h4 className="font-bold">Sizes</h4>
                      <label
                        className="inline-block text-sm text-gray-600"
                        htmlFor="min-height"
                      >
                        Select multiple sizes
                      </label>
                      <MultiSelect
                        options={sizeOptions}
                        value={selectedSizes}
                        onChange={setSelectedSizes}
                        labelledBy="Select"
                        className="w-full"
                      />
                    </div>
                    <hr className="w-full" />
                    <div className="my-5">
                      <h4 className="font-bold">Tags</h4>
                      <label
                        className="inline-block text-sm text-gray-600"
                        htmlFor="tags"
                      >
                        Select multiple tags
                      </label>
                      <MultiSelect
                        options={tagsData.data.map(
                          (tag: { id: number; name: string }) => {
                            return {
                              label: toSentenceCase(tag.name),
                              value: tag.id,
                            };
                          }
                        )}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        labelledBy="Select"
                        className="w-full"
                      />
                    </div>
                    <hr className="w-full" />
                  </>
                ) : null}
              </>
            )}
            <div className="my-4">
              <h4 className="font-bold">For Sale</h4>
              <div className="flex h-6 items-center">
                <input
                  id="forSale"
                  name="forSale"
                  title="forSale"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={handleCheckBoxChange}
                  checked={hideSold}
                />
                <label
                  htmlFor="forSale"
                  className="font-normal text-sm text-gray-900 ml-2"
                >
                  Hide art that is not for sale
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-6">
          {artLoading ? (
            <div className="">
              <Loading />
            </div>
          ) : null}
          {artData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {applyFilters(art)}
            </div>
          ) : null}
        </div>
      </div>
      {showModal && modalArt ? (
        <ArtModal artpiece={modalArt} setShowModal={setShowModal} />
      ) : null}
    </div>
  );
};

export default Gallery;
