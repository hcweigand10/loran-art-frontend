import React, { ChangeEvent, useState, useContext, FormEvent } from "react";
import Loading from "./Loading";
import userContext from "../contexts/userContext";
import galleryAPI from "../utils/axios";
import { AxiosError } from "axios";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [alert, setAlert] = useState<string>("")

  const { loggedIn, setLoggedIn, loading, setLoading } =
    useContext(userContext);

  const formChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await galleryAPI.post("/api/users/login", loginInfo);
      setLoading(false);
      if (response.status === 200) {
        setLoggedIn(true);
        localStorage.setItem("jwt", response.data.token);
      } 
    } catch (error: any) {
      setLoading(false)
      setLoginInfo({email: "", password: ""})
      setAlert(error.response.data.err)
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-100 rounded mb-10">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Sign in to your admin account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={login}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  value={loginInfo.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block
    w-full px-3 py-2 border border-gray-300
    placeholder-gray-500 text-gray-900 rounded-t-md
    focus:outline-none focus:ring-indigo-500
    focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={formChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  value={loginInfo.password}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block
    w-full px-3 py-2 border border-gray-300
    placeholder-gray-500 text-gray-900 rounded-b-md
    focus:outline-none focus:ring-indigo-500
    focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={formChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center
    py-2 px-4 border border-transparent text-sm font-medium
    rounded-md text-white bg-primary opacity-80 hover:opacity-100
    focus:outline-none focus:ring-2 focus:ring-offset-2
    focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <h2 className="text-center text-red-600 py-3">{alert}</h2>
        </div>
      )}
    </div>
  );
};

export default Login;
