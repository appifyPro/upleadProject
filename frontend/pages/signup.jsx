import React, { useState } from "react";
import api from "@/redux/api";
import { useRouter } from "next/navigation";

const signup = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState("a");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    subscription: "Free trial",
  });

  const [signUp, { isLoading, isSuccess, error, data }] =
    api.adminApis.useSignUpMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      if (isSuccess) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          subscription: "Free trial",
        });
        router.push("/login");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };
  const handleClick = (type) => {
    setClicked(type);
    let subscriptionName = "";
    switch (type) {
      case "a":
        subscriptionName = "Free trial";
        break;
      case "b":
        subscriptionName = "Standard";
        break;
      case "c":
        subscriptionName = "Premium";
        break;
      case "d":
        subscriptionName = "Enterprise";
        break;
      default:
        subscriptionName = "Free trial";
    }
    setFormData({
      ...formData,
      subscription: subscriptionName,
    });
  };
  return (
    <div className=" bg-[#CAE5F1]">
      <div className="py-8 flex justify-center items-center ">
        <div className="bg-white p-[40px] lg:w-[830px]  shadow-lg">
          <h1 className="mb-1 text-3xl text-center text-[#002C9B]  max-md:text-2xl max-sm:text-xl font-bold  font-cerapro">
            Get Started
          </h1>
          <p className="text-md text-center  text-[#303236] font-[500]  font-cerapro">
            Start your 7-Day Free Trial{" "}
            <span className="text-[#002C9B]"> $0 / 7 days</span>
          </p>

          <div className="grid grid-cols-12 gap-4 mt-10">
            <div className="col-span-12 lg:col-span-6">
              <div className="">
                <div
                  onClick={() => handleClick("a")}
                  className={`lg:w-[360px] w-full h-[100px] mb-3  cursor-pointer relative hover:border-[#002c9b] border-2 rounded-md ${
                    clicked === "a" ? "border-[#002c9b]" : "border-gray-300"
                  }`}
                >
                  {clicked === "a" && (
                    <div className="absolute right-2 top-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#002c9b"
                          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex h-full">
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Free trial</h3>
                      <p className="text-sm">
                        0 /07 days 5 Credits <br />
                        10 Leads per month
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleClick("b")}
                  className={`lg:w-[360px] w-full h-[100px] mb-3 cursor-pointer relative hover:border-[#002c9b] border-2 rounded-md ${
                    clicked === "b" ? "border-[#002c9b]" : "border-gray-300"
                  }`}
                >
                  {clicked === "b" && (
                    <div className="absolute right-2 top-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#002c9b"
                          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex h-full">
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Standard</h3>
                      <p className="text-sm">
                        49.99 /30 days 10 Credits
                        <br />
                        300 Leads per month
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleClick("c")}
                  className={`lg:w-[360px] w-full h-[100px] mb-3  cursor-pointer relative hover:border-[#002c9b] border-2 rounded-md ${
                    clicked === "c" ? "border-[#002c9b]" : "border-gray-300"
                  }`}
                >
                  {clicked === "c" && (
                    <div className="absolute right-2 top-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#002c9b"
                          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex h-full">
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Premium</h3>
                      <p className="text-sm">
                        79.99 /30 days 15 Credits
                        <br />
                        500 Leads per month
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleClick("d")}
                  className={`lg:w-[360px] w-full h-[100px] mb-3  cursor-pointer relative hover:border-[#002c9b] border-2 rounded-md ${
                    clicked === "d" ? "border-[#002c9b]" : "border-gray-300"
                  }`}
                >
                  {clicked === "d" && (
                    <div className="absolute right-2 top-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#002c9b"
                          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex h-full">
                    <div className="text-left text-gray-500 h-full p-2">
                      <h3 className="font-bold">Enterprise</h3>
                      <p className="text-sm">
                        79.99 /30 days 15 Credits
                        <br />
                        Contact Us
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className=" text-[15px] text-[#303236]">
                Already have an account?
                <a href="/login" className="ml-[5px] font-[700] text-[#002c9b]">
                  Sign in
                </a>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="my-3">
                  <label
                    for="email"
                    className="block text-sm mb-1 font-medium text-[#303236] uppercase font-cerapro tracking-[1px]"
                  >
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-[15px] text-[#6A6D75] border border-[#D3D4D5] p-[10px]  rounded w-full focus:outline-none focus:ring-1 focus:ring-[#245091] focus:border-transparent"
                    required
                  />
                </div>
                <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-[12px]">
                  <p className="cursor-default">
                    By continuing, you agree to our &nbsp;
                    <a
                      className="group text-[#002c9b] transition-all duration-100 ease-in-out"
                      href="#"
                    >
                      <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-[#002c9b] to-[#002c9b] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        Terms of Use &nbsp;
                      </span>
                    </a>
                    and consent to our &nbsp;
                    <a
                      className="group text-[#002c9b] transition-all duration-100 ease-in-out"
                      href="#"
                    >
                      <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-[#002c9b] to-[#002c9b] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        Privacy Policy
                      </span>
                    </a>
                  </p>
                </div>
                <button
                  className="mt-5 rounded-full w-full uppercase text-sm bg-[#245091] hover:bg-[#0F346C] text-white font-cerapro py-3  tracking-[1px] "
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign Up"}
                </button>
              </form>
              {isLoading && (
                <p className="text-center text-md text-[#303236] font-[500] font-cerapro mt-4">
                  Loading...
                </p>
              )}

              {error && (
                <p className="text-center text-md text-red-500 font-[500] font-cerapro mt-4">
                  Error: {error?.data?.message}
                </p>
              )}

              {isSuccess && (
                <p className="text-center text-md text-green-500 font-[500] font-cerapro mt-4">
                  Signup successful!
                </p>
              )}
              {/* <p className="text-[16px] my-4 text-center font-[500] text-[#6A6D75]">
                OR
              </p>
              <button className="mb-4 h-[42px] flex items-center justify-center bg-[#000000] text-white rounded-full w-full  px-6 py-2 text-md font-medium  focus:outline-none focus:ring-none focus:ring-offset-2 ">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  // xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="-1.5 0 20 20"
                  version="1.1"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-102.000000, -7439.000000)"
                      fill="#ffffff"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                          id="apple-[#173]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>

                <span>Sign in with Apple</span>
              </button>
              <button className="flex  mb-4 items-center justify-center bg-white border border-gray-300 rounded-full w-full px-6 py-2 text-md font-medium text-[#202124] hover:bg-[#F8FAFF] focus:outline-none focus:ring-2 focus:ring-offset-none focus:ring-gray-500">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  <g
                    id="Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>Sign in with Google</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
