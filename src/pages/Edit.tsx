import React, { useState, useEffect, useContext } from "react";
import userContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Loading from "../components/Loading";

const Edit = () => {
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
    <div className="pt-5 lg:max-w-4xl mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
        <h1 className="text-3xl font-light tracking-wider mb-4 pt-6">Edit</h1>
        <Form artId={parseInt(artId)}/>
        </>
      )}
    </div>
  );
};

export default Edit;
