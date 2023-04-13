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
import Select from "react-select"
import Hero from "../components/Hero";
import categoryIdToName from "../utils/categoryIdToName";

interface props{
  tags: string[]
}

const Gallery = (props: props) => {
  const [art, setArt] = useState<ReactNode>();
  const [filteredArt, setFilteredArt] = useState<ReactNode>()
  const [showSold, setShowSold] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true);
  const queryParameters = new URLSearchParams(window.location.search);
  const galleryCategory = queryParameters.get("category") || "wall";
  console.log(props.tags)
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
      setFilteredArt(
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
          <label className="inline-block text-sm text-gray-600" htmlFor="tags"
        >Select multiple tags</label>
      <div className="relative flex w-full">
        <Select
          name="tags"
          isMulti
          options={props.tags}
          className="block w-full rounded-sm cursor-pointer focus:outline-none"
        />
      </div>
        </div>
        <div className="col-span-1 md:col-span-6">
          {isLoading ? (
            <div className="">
              <Loading />
            </div>
          ) : null}
          {data ? (
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
