import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import galleryAPI from "../utils/axios";
import { artPiece, formProps } from "../interfaces/interfaces";
import CloudinaryBtn from "./CloudinaryBtn";
import categoryIdToName from "../utils/categoryIdToName";
import Loading from "./Loading";
import categoryNameToId from "../utils/categoryNameToId";
import { useNavigate } from "react-router-dom";
import { MultiSelect, Option } from "react-multi-select-component";
import toSentenceCase from "../utils/toSentenceCase";

const Form = (props: formProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [forSale, setForSale] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [category, setCategory] = useState<string>("Wall Art");
  const [notes, setNotes] = useState<string>("");
  const [tags, setTags] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (props.artId !== 0) {
      refetch();
    }
  }, []);

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [props.artId.toString()],
    queryFn: () => galleryAPI.get(`/api/art/${props.artId}`),
    onSuccess: (data): void => {
      setTitle(data.data.title);
      setDescription(data.data.description);
      setHeight(data.data.height);
      setWidth(data.data.width);
      setThickness(data.data.thickness);
      setPrice(data.data.price);
      setForSale(data.data.forSale);
      setImage(data.data.image);
      setNotes(data.data.notes);
      setTags(
        data.data.Tags.map((tagObj: any) => {
          return { label: tagObj.name, value: tagObj.id };
        })
      );
      setCategory(categoryIdToName(data.data.CategoryId));
      setCategoryId(data.data.CategoryId);
    },
    // staleTime: 10000,
    enabled: false,
  });

  const { data: tagsData, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => galleryAPI.get("/api/tags"),
    // onSuccess: (res: any): void => {

    // },
  });

  const handleImageUpload = (url: string) => {
    setImage(url);
  };

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForSale(!forSale);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setCategoryId(categoryNameToId(e.target.value));
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you would like to cancel? Changes will not be saved."
      )
    ) {
      window.location.assign("/admin");
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    setIsError(false);
    const body = {
      title,
      description,
      height,
      width,
      thickness,
      price,
      forSale,
      image,
      notes,
      CategoryId: categoryId,
      tags: tags.map((tag) => tag.value),
    };
    if (props.artId !== 0) {
      setLoading(true);
      try {
        await galleryAPI.put(`/api/art/${props.artId}`, body);
        window.location.assign("/admin");
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        setIsError(true);
        setErrorMsg(error.message);
      }
    } else {
      setLoading(true);
      try {
        await galleryAPI.post(`/api/art`, body);
        window.location.assign("/admin");
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        setIsError(true);
        setErrorMsg(error.response.data.errors[0].message);
      }
    }
  };

  return (
    <div>
      {isError ? (
        <div>
          <h3 className="text-red-700 text-lg">Failed to create. Error:</h3>
          <p className="text-red-700">{errorMsg}</p>
        </div>
      ) : null}
      {isLoading || loading ? (
        <Loading />
      ) : (
        <form>
          <div className="">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-6">
                <div className="md:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        value={title}
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      title="category"
                      id="category"
                      name="category"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 mr-0"
                      value={category}
                      onChange={handleSelectChange}
                    >
                      <option>Wall Art</option>
                      <option>Sculptures</option>
                      <option>Toys</option>
                      <option>Whistles</option>
                      <option>Planes</option>
                      <option>Wholesale</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Description{" "}
                    <span className="text-sm text-gray-500">
                        (optional)
                      </span>
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="notes"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Notes{" "}
                    <span className="text-sm text-gray-500">
                        (optional)
                      </span>
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="height"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Height
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="height"
                        id="height"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="width"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Width
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="width"
                        id="width"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="thickness"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Thickness{" "}
                      <span className="text-sm text-gray-500">
                        (leave as 0 for 2D art)
                      </span>
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="thickness"
                        id="thickness"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={thickness}
                        onChange={(e) => setThickness(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-6">
                    <label
                      htmlFor="image"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Image
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {image ? (
                        <img src={image} alt={"preview"} className="h-24" />
                      ) : (
                        <p className="text-neutral-500 italic">No image yet</p>
                      )}
                      <CloudinaryBtn
                        image={image ? true : false}
                        handleImageUpload={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative flex gap-x-3 md:col-span-1">
                  <div className="leading-6">
                    <label
                      htmlFor="forSale"
                      className="font-medium text-lg text-gray-900"
                    >
                      For Sale
                    </label>
                  </div>
                  <div className="h-6 items-center">
                    <input
                      id="forSale"
                      name="forSale"
                      title="forSale"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleCheckBoxChange}
                      checked={forSale}
                    />
                  </div>
                </div>
                <div
                  className={
                    forSale
                      ? "py-4 md:p-0 md:col-span-2"
                      : "hidden  md:col-span-1"
                  }
                >
                  <label
                    htmlFor="price"
                    className={
                      forSale
                        ? "block text-lg font-medium leading-6 text-gray-900"
                        : "block text-lg font-medium leading-6 text-gray-500"
                    }
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                      <span className="flex select-none items-center pl-2 pr-1 text-gray-500 sm:text-sm">
                        $
                      </span>
                      <input
                        disabled={!forSale}
                        type="number"
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={forSale ? price : ""}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Tags{" "}
                    <span className="text-sm text-gray-500">
                        (optional)
                      </span>
                  </label>
                  {tagsData ? (
                    <div className="mt-2">
                      <MultiSelect
                        options={tagsData.data.map(
                          (tag: { id: number; name: string }) => {
                            return {
                              label: `${toSentenceCase(tag.name)}`,
                              value: tag.id,
                            };
                          }
                        )}
                        value={tags}
                        onChange={setTags}
                        labelledBy="Select"
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="my-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 bg-neutral-200 py-2 px-3 rounded-md hover:drop-shadow-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:drop-shadow-lg"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
