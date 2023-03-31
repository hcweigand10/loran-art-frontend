import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import galleryAPI from "../utils/axios";
import userContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { artPiece } from "../interfaces/interfaces";
import Form from "../components/Form";
import Loading from "../components/Loading";
import categoryIdToName from "../utils/categoryIdToName";

const Edit = () => {
  const [art, setArt] = useState<artPiece>();
  const queryParameters = new URLSearchParams(window.location.search);
  const artId = queryParameters.get("id") || "1";

  const {loggedIn, loading} = useContext(userContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate("/admin")
    }
  }, [loading, loggedIn])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
        <h1 className="text-3xl">Edit</h1>
        <Form artId={parseInt(artId)}/>
        </>
      )}
    </div>
  );
};

export default Edit;
