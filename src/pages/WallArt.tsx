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
import ArtModal from "../components/ArtModal";
import Back from "../components/Back";

const sizeOptions = [
  { label: `Small (under 8")`, value: "S" },
  { label: `Medium (between 8" and 18")`, value: "M" },
  { label: `Large (over 18")`, value: "L" },
];

const WallArt = () => {
  const [art, setArt] = useState<JSX.Element[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Option[]>([]);
  const [hideSold, setHideSold] = useState<boolean>(true);
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [modalArt, setModalArt] = useState<artPiece>();

  const queryParameters = new URLSearchParams(window.location.search);
  const galleryCategory = queryParameters.get("category") || "wall-art";

  const { data: tagsData, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => galleryAPI.get("/api/tags"),
    onSuccess: (data) => {
      // setSelectedTags(data.data.map(
      //   (tag: { id: number; name: string }) => {
      //     return {
      //       label: toSentenceCase(tag.name),
      //       value: tag.id,
      //     };
      //   }
      // ))
    },
  });

  const { data: artData, isLoading: artLoading } = useQuery({
    queryKey: [galleryCategory],
    queryFn: () =>
      galleryAPI.get(
        `/api/categories/byname/${toSentenceCase(galleryCategory)}`
      ),
    // onSuccess: (res): void => {
    //   const artPieces = res.data.Arts;
    //   setArt(artPieces);
    // },
  });

  useEffect(() => {
    applyFilters();
  }, [selectedSizes, selectedTags, artData, hideSold]);

  const applyFilters = () => {
    if (!artData) {
      setArt([]);
    } else {
      let filteredArt: any[] = artData?.data.Arts.map((artPiece: artPiece) => {
        if (Math.max(artPiece.height, artPiece.width) <= 8) {
          return {
            ...artPiece,
            size: "S",
          };
        } else if (
          Math.max(artPiece.height, artPiece.width) >= 8 &&
          Math.max(artPiece.height, artPiece.width) <= 18
        ) {
          return {
            ...artPiece,
            size: "M",
          };
        } else {
          return {
            ...artPiece,
            size: "L",
          };
        }
      });
      if (selectedSizes.length === 1 || selectedSizes.length === 2) {
        filteredArt = filteredArt.filter((artPiece: any) => {
          return selectedSizes
            .map((option: Option) => option.value)
            .includes(artPiece.size);
        });
      }
      if (hideSold) {
        filteredArt = filteredArt.filter(
          (artPiece: artPiece) => artPiece.forSale
        );
      }
      if (
        selectedTags.length !== 0 &&
        selectedTags.length !== tagsData?.data.length
      ) {
        filteredArt = filteredArt.filter((artPiece: artPiece) => {
          return artPiece.Tags.some((tagObj: any) =>
            selectedTags
              .map((option: Option) => option.value)
              .includes(tagObj.id)
          );
        });
      }
      setArt(
        filteredArt.map((art: artPiece) => (
          <div key={art.id}>
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
              sortPriority={art.sortPriority}
              linkUrl={art.linkUrl}
              linkText={art.linkText}
              category={categoryIdToName(art.CategoryId)}
              tags={art.Tags.map((tagObj: any) => tagObj.name)}
            />
          </div>
        ))
      );
    }
  };

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHideSold(!hideSold);
  };

  const purchaseString = (
    <p className="block align-items-bottom text-neutral-600 text-sm md:text-md">
      To purchase, email me at
      <a className="ml-1 underline" href="mailto:loranscruggs8@gmail.com">
        loranscruggs8@gmail.com
      </a>
    </p>
  );

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
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
        {/* filters */}
        <div className="col-span-1 md:col-span-2">
          <div className="relative w-full">
            {tagsLoading ? (
              <div className="">
                <Loading />
              </div>
            ) : null}
            {tagsData ? (
              <>
                <div className="my-3">
                  <h4 className="text-md md:text-lg font-normal">Sizes</h4>

                  <MultiSelect
                    options={sizeOptions}
                    value={selectedSizes}
                    onChange={setSelectedSizes}
                    labelledBy="Select"
                    className="w-full"
                    hasSelectAll={false}
                  />
                </div>
                <hr className="w-full" />
                <div className="my-3">
                  <h4 className="font-normal">Tags</h4>
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

            <div className="my-3">
              <h4 className="font-normal">For Sale</h4>
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
          <hr className="md:hidden" />
        </div>
        <div className="col-span-1 md:col-span-4">
          {artLoading ? (
            <div className="">
              <Loading />
            </div>
          ) : null}
          {artData && tagsData ? (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-3 max-w-4xl">
              {art}
            </div>
          ) : null}
        </div>
      </div>
      {/* {showModal && modalArt ? (
        <ArtModal artpiece={modalArt} setShowModal={setShowModal} />
      ) : null} */}
    </div>
  );
};

export default WallArt;
