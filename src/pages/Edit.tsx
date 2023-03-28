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
  const [loading, setLoading] = useState<boolean>(false);
  const queryParameters = new URLSearchParams(window.location.search);
  const artId = queryParameters.get("id") || "1";

  const {loggedIn} = useContext(userContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(!loggedIn) {
      navigate("/admin")
    }
  }, [])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Form artId={parseInt(artId)}/>
      )}
    </div>
  );
};

export default Edit;
