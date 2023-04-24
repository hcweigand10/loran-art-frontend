import React, { ChangeEvent, ReactNode, useState } from "react";
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

const Gallery = () => {
  const [art, setArt] = useState<ReactNode>();
  const [tags, setTags] = useState<Option[]>();
  const [selected, setSelected] = useState<Option[]>([]);
  const [filteredArt, setFilteredArt] = useState<ReactNode>();
  const [hideSold, setHideSold] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const queryParameters = new URLSearchParams(window.location.search);
  const galleryCategory = queryParameters.get("category") || "wall";

  const { data: tagsData, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => galleryAPI.get("/api/tags"),
    onSuccess: (data: any): void => {
      console.log(data);
      setTags(
        data.data.map((tag: { id: number; name: string }) => {
          return { label: toSentenceCase(tag.name), value: tag.name };
        })
      );
    },
  });

  const { data: artData, isLoading: artLoading } = useQuery({
    queryKey: [galleryCategory],
    queryFn: () =>
      galleryAPI.get(
        `/api/categories/byname/${toSentenceCase(galleryCategory)}`
      ),
    onSuccess: (data): void => {
      console.log(data);
      const artPieces = data.data.Arts.map((art: artPiece) => (
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
          setLoading={setLoading}
        />
      ));
      setArt(artPieces);
      setFilteredArt(artPieces);
    },
  });

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHideSold(!hideSold);
  };

  return (
    <div className="relative lg:max-w-5xl mx-auto">
      <Link
        to="/"
        className="absolute top-2 left-0 border-b border-primary text-neutral-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Go back
      </Link>
      {/* <Hero/> */}
      <div className="flex justify-between pt-12 mt-6">
        <h1 className="text-2xl font-light tracking-wider mb-4 block">
          {toSentenceCase(galleryCategory)}
        </h1>
        {/* <p className="block flex align-items-bottom text-neutral-600 italic">
          To purchase, email me at{" "}
          <a className="ml-1 underline" href="mailto:loranscruggs8@gmail.com">loranscruggs8@gmail.com</a>
        </p> */}
      </div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        {/* filters */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl mt-4 font-light">Filters</h3>
          <div className="relative w-full">
            {tagsLoading ? (
              <div className="">
                <Loading />
              </div>
            ) : null}
            {tags ? (
              <>
                <div className="my-4">
                  <h4 className="font-bold">Tags</h4>
                  <label
                    className="inline-block text-sm text-gray-600"
                    htmlFor="tags"
                  >
                    Select multiple tags
                  </label>
                  <MultiSelect
                    options={tags}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    className="w-full"
                  />
                </div>
                <hr className="w-full" />
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
                <hr className="w-full" />
                <div className="my-4">
                  <h4 className="font-bold">Size</h4>
                  <label
                    className="inline-block text-sm text-gray-600"
                    htmlFor="size-filter"
                  >
                    filter by size
                  </label>
                </div>
              </>
            ) : null}
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
              {art}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
