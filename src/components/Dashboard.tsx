import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-solid-svg-icons";
import { artPiece } from "../interfaces/interfaces";
import userContext from "../contexts/userContext";
import galleryAPI from "../utils/axios";
import Loading from "./Loading";
import ArtModal from "./ArtModal";
import categoryIdToName from "../utils/categoryIdToName";
import Table from "./Table";

const Dashboard = () => {
  const [art, setArt] = useState<artPiece[]>([]);
  const [selectedCategroy, setSelectedCategroy] = useState("All Categories");
  const [newTag, setNewTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalArt, setModalArt] = useState<artPiece>();

  const { data, refetch } = useQuery({
    queryKey: ["all-art"],
    queryFn: () => galleryAPI.get(`/api/art`),
    onSuccess: (data): void => {
      setArt(data.data);
      setLoading(false);
    },
    staleTime: 10000,
  });

  const {
    data: tagsData,
    isLoading: tagsLoading,
    refetch: tagFetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: () => galleryAPI.get(`/api/tags`),
    staleTime: 10000,
  });

  const { setLoggedIn } = useContext(userContext);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategroy(category);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    setNewTag(newTag);
  };

  const deleteArt = async (id: number, title: string) => {
    if (
      window.confirm(`Are you sure you'd like to delete art piece '${title}'?`)
    ) {
      setLoading(true);
      await galleryAPI.delete(`/api/art/${id}`);
      refetch();
    }
  };

  const createTag = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTag && tagsData) {
      if (
        !tagsData.data
          .map((tagObj: { id: number; name: string }) => tagObj.name)
          .includes(newTag)
      ) {
        const res = await galleryAPI.post("/api/tags", {
          name: newTag,
        });
        console.log("res: " + res);
        setNewTag("");
        tagFetch();
      } else {
        alert("That tag already exists");
      }
    }
  };

  const deleteTag = async (tagId: number, tagName: string) => {
    try {
      if (window.confirm(`Are you sure you'd like to delete tag ${tagName}`)) {
        const res = await galleryAPI.delete(`/api/tags/${tagId}`);
        console.log(res);
        if (res.status == 200) {
          tagFetch();
        }
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const editTag = async (tagId: number, tagName: string) => {
    try {
      const newName = window.prompt(
        `What would you like to change '${tagName}' to?`
      );
      if (newName) {
        const res = await galleryAPI.put(`/api/tags/${tagId}`, {
          name: newName,
        });
        console.log(res);
        if (res.status == 200) {
          tagFetch();
        }
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const changepassword = () => {
    const newpassword = window.prompt("What would you like your n");
  };

  return (
    <section className="mx-auto py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-3xl tracking-wide">All Art Pieces</h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
              {art?.length || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between">
        <div className="mb-2">
          <Link
            to={"/admin/create-new"}
            className="flex items-center justify-center px-2 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600 -500 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Add</span>
          </Link>
        </div>

        <div className="">
          <h5 className="text-sm">Sort by Category</h5>
          <select
            title="sort by"
            className="border-neutral-300 text-gray-600"
            onChange={handleSelectChange}
            value={selectedCategroy}
          >
            <option className="text-neutral-500">All Categories</option>
            <option className="text-neutral-500">Wall Art</option>
            <option className="text-neutral-500">Sculptures</option>
            <option className="text-neutral-500">Toys</option>
            <option className="text-neutral-500">Whistles</option>
            <option className="text-neutral-500">Planes</option>
            <option className="text-neutral-500">Wholesale</option>
            <option className="text-neutral-500">Past Works</option>
          </select>
        </div>
      </div>

      <div className="my-3">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full pt-2 align-middle">
            <div className="overflow-hidden border border-gray-200  rounded-lg drop-shadow-md">
              {loading ? (
                <Loading />
              ) : (
                <Table
                  art={art}
                  selectedCategory={selectedCategroy}
                  deleteArt={deleteArt}
                  setModalArt={setModalArt}
                  setShowModal={setShowModal}
                />
              )}
            </div>
          </div>
        </div>
        <p className="text-neutral-500">Click any row for preview</p>
      </div>
      <div className="max-w-lg">
        <h3 className="text-2xl tracking-wide mb-3">Tags</h3>
        <ul>
          {tagsLoading ? (
            <Loading />
          ) : (
            tagsData?.data.map((tag: { id: number; name: string }) => (
              <li
                className="flex p-2 bg-neutral-200 mb-2 rounded justify-between"
                key={tag.id}
              >
                <p>{tag.name}</p>
                <div>
                  <button
                    onClick={() => editTag(tag.id, tag.name)}
                    className="bg-blue-200 rounded-full px-3 mx-2 hover:bg-blue-400"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => deleteTag(tag.id, tag.name)}
                    className="bg-red-200 rounded-full px-3 mx-2 hover:bg-red-400"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        <form onSubmit={createTag}>
          <div className="my-2">
            <label htmlFor="new-tag" className="text-lg">
              Add a new tag
            </label>
            <div className="flex">
              <input
                name="new-tag"
                id="new-tag"
                type="text"
                placeholder="e.g. 'Nature'"
                value={newTag}
                onChange={handleInputChange}
                className="block"
              />
              <button className="btn text-white bg-blue-500 p-2 rounded hover:bg-blue-600 ml-3">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl mb-3">Settings</h2>
        <ul className="">
          <li>
            <Link to="/admin/settings" className="text-blue-500 underline">
              Change Password
            </Link>
          </li>
          <li>
            <button
              className="text-blue-500 underline"
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem("jwt");
                window.location.assign("/admin");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      {showModal && modalArt ? (
        <ArtModal artpiece={modalArt} setShowModal={setShowModal} />
      ) : null}
    </section>
  );
};

export default Dashboard;
