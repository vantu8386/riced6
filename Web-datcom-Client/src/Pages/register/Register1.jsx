import React, { useState } from "react";
import image from "../register/image.jpg";
import instance from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register1() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswords, setConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  console.log("error", errors);
  const [register, setRegister] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    passwords: "",
    confirmPassword: "",
  });
  const { userName, phoneNumber, email, passwords, confirmPassword } = register;
  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPasswords);
  };

  const homePage = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegister({ ...register, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("register", register);
    instance
      .post("auth/signup", register)
      .then((res) => {
        console.log(res);
        setRegister({
          userName: "",
          phoneNumber: "",
          email: "",
          passwords: "",
          confirmPassword: "",
        });
        navigate("/register2", { state: { email: register.email } });
        setTimeout(() => {
          toast.success(res.data.message);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
        // toast.warning(err.response.data.message);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div
        className="flex h-screen"
        style={{
          background: `url(${image}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className="w-1/2"></div>
        <div className="w-1/2 p-[30px] flex items-center">
          <div
            className="bg-[#111] h-[ ] rounded-3xl flex flex-col items-center gap-4"
            style={{ padding: "30px 40px" }}
          >
            <h1 className="text-white text-4xl font-medium ">
              Getting started!
            </h1>
            <p className="text-[#EAEAEF] text-center text-base font-medium flex flex-col justify-center w-[480px]">
              Look like you are new to us! Create an account for a complete
              experience.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4"
            >
              <div>
                <input
                  type="text"
                  value={userName}
                  onChange={handleChange}
                  name="userName"
                  // className="h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] "
                  className={`h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] px-4 ${
                    errors.userName
                      ? "border border-red-500 shadow-sm shadow-red-800"
                      : ""
                  }`}
                  placeholder="Username"
                />
                {errors.userName && (
                  <p className="text-red-500 absolute">{errors.userName}</p>
                )}
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  // className="h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] "
                  className={`h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] px-4 ${
                    errors.email
                      ? "border border-red-500 shadow-sm shadow-red-800"
                      : ""
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 absolute">{errors.email}</p>
                )}
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  value={phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  // className="otp_input h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] "
                  className={`otp_input h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] px-4 ${
                    errors.phoneNumber
                      ? "border border-red-500 shadow-sm shadow-red-800"
                      : ""
                  }`}
                  placeholder="Phone Number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 absolute">{errors.phoneNumber}</p>
                )}
              </div>
              {/* ---------------------------------------------------------------------------- */}
              <div className="mt-4">
                <div className="relative">
                  <input
                    value={passwords}
                    name="passwords"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    // className="input-style px-4 h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px]"
                    className={`input-style h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] px-4 ${
                      errors.passwords
                        ? "border border-red-500 shadow-sm shadow-red-800"
                        : ""
                    }`}
                    placeholder="Password"
                  />

                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <i className="fa-regular fa-eye text-gray-200"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash text-gray-200"></i>
                    )}
                  </div>
                </div>
                {errors.passwords && (
                  <p className="text-red-500 absolute">{errors.passwords}</p>
                )}
              </div>

              <div className="mt-4">
                <div className="relative">
                  <input
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    type={confirmPasswords ? "text" : "password"}
                    // className="input-style px-4 h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px]"
                    className={`input-style h-[54px] rounded-2xl bg-[#3A3A3A] text-white w-[600px] px-4 ${
                      errors.confirmPassword
                        ? "border border-red-500 shadow-sm shadow-red-800"
                        : ""
                    }`}
                    placeholder="Confirm password"
                  />

                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                    onClick={toggleConfirmPassword}
                  >
                    {confirmPasswords ? (
                      <i className="fa-regular fa-eye text-gray-200"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash text-gray-200"></i>
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 absolute">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button className="text-white bg-[#E25319] w-[600px] rounded-2xl h-[54px] mt-5">
                Next
              </button>
            </form>

            {/* <h3 className="text-white text-[30px] font-medium mt-10">
                            Full contactless experience
                        </h3>
                        <p className="text-white text-base font-medium">
                            From ordering to paying, that’s all contactless
                        </p> */}
            <div
              onClick={homePage}
              className="flex items-center gap-2 justify-center mt-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="366"
                height="67"
                viewBox="0 0 366 67"
                fill="none"
              >
                <path
                  d="M88.388 51.5645V3.62445H108.72C114.523 3.62445 119.396 4.59912 123.34 6.54845C127.329 8.49779 130.344 11.2631 132.384 14.8445C134.424 18.3805 135.444 22.6191 135.444 27.5605C135.444 32.4565 134.424 36.6951 132.384 40.2765C130.344 43.8578 127.329 46.6458 123.34 48.6405C119.396 50.5898 114.523 51.5645 108.72 51.5645H88.388ZM103.076 39.7325H107.836C112.279 39.7325 115.565 38.7351 117.696 36.7405C119.827 34.7458 120.892 31.6858 120.892 27.5605C120.892 23.3898 119.827 20.3298 117.696 18.3805C115.565 16.4311 112.279 15.4565 107.836 15.4565H103.076V39.7325Z"
                  fill="white"
                />
                <path
                  d="M160.605 52.3805C154.077 52.3805 149.022 50.7485 145.441 47.4845C141.86 44.2205 140.069 39.7778 140.069 34.1565C140.069 30.6658 140.794 27.5605 142.245 24.8405C143.741 22.1205 145.826 19.9898 148.501 18.4485C151.221 16.8618 154.394 16.0685 158.021 16.0685C161.648 16.0685 164.662 16.8618 167.065 18.4485C169.468 20.0351 171.258 22.2111 172.437 24.9765C173.616 27.6965 174.205 30.8245 174.205 34.3605V37.0805H153.635L153.505 30.8192L163.665 30.6885L162.509 31.6405C162.509 29.4191 162.124 27.8098 161.353 26.8125C160.582 25.7698 159.517 25.2485 158.157 25.2485C156.57 25.2485 155.369 25.8831 154.553 27.1525C153.782 28.3765 153.397 30.3711 153.397 33.1365V34.5645C153.397 37.1938 154.032 39.0978 155.301 40.2765C156.616 41.4098 158.542 41.9765 161.081 41.9765C162.804 41.9765 164.436 41.8178 165.977 41.5005C167.518 41.1378 168.992 40.5711 170.397 39.8005L173.933 48.9805C172.12 50.0685 170.08 50.9071 167.813 51.4965C165.592 52.0858 163.189 52.3805 160.605 52.3805Z"
                  fill="white"
                />
                <path
                  d="M179.216 51.5645V1.51645H193.36V51.5645H179.216Z"
                  fill="white"
                />
                <path
                  d="M199.802 51.5645V16.8845H213.946V51.5645H199.802ZM199.598 12.9405V0.564453H214.15V12.9405H199.598Z"
                  fill="white"
                />
                <path
                  d="M230.45 51.5645L215.354 16.8845H230.11L237.998 37.6925H235.414L243.778 16.8845H257.582L242.214 51.5645H230.45Z"
                  fill="white"
                />
                <path
                  d="M277.148 52.3805C270.62 52.3805 265.565 50.7485 261.984 47.4845C258.403 44.2205 256.612 39.7778 256.612 34.1565C256.612 30.6658 257.337 27.5605 258.788 24.8405C260.284 22.1205 262.369 19.9898 265.044 18.4485C267.764 16.8618 270.937 16.0685 274.564 16.0685C278.191 16.0685 281.205 16.8618 283.608 18.4485C286.011 20.0351 287.801 22.2111 288.98 24.9765C290.159 27.6965 290.748 30.8245 290.748 34.3605V37.0805H268.58V30.6885H280.208L279.052 31.6405C279.052 29.4191 278.667 27.8098 277.896 26.8125C277.125 25.7698 276.06 25.2485 274.7 25.2485C273.113 25.2485 271.912 25.8831 271.096 27.1525C270.325 28.3765 269.94 30.3711 269.94 33.1365V34.5645C269.94 37.1938 270.575 39.0978 271.844 40.2765C273.159 41.4098 275.085 41.9765 277.624 41.9765C279.347 41.9765 280.979 41.8178 282.52 41.5005C284.061 41.1378 285.535 40.5711 286.94 39.8005L290.476 48.9805C288.663 50.0685 286.623 50.9071 284.356 51.4965C282.135 52.0858 279.732 52.3805 277.148 52.3805Z"
                  fill="white"
                />
                <path
                  d="M295.759 51.5645V26.7445C295.759 25.1125 295.713 23.4805 295.623 21.8485C295.532 20.1711 295.396 18.5165 295.215 16.8845H308.815L310.379 28.2405H308.271C308.724 25.4751 309.404 23.2085 310.311 21.4405C311.263 19.6271 312.487 18.2898 313.983 17.4285C315.479 16.5218 317.292 16.0685 319.423 16.0685C320.465 16.0685 321.213 16.1138 321.667 16.2045C322.165 16.2951 322.687 16.4538 323.231 16.6805V29.0565C322.007 28.5125 321.032 28.1725 320.307 28.0365C319.581 27.8551 318.629 27.7645 317.451 27.7645C315.592 27.7645 314.119 28.0591 313.031 28.6485C311.943 29.1925 311.172 30.1218 310.719 31.4365C310.265 32.7511 310.039 34.5418 310.039 36.8085V51.5645H295.759Z"
                  fill="white"
                />
                <path
                  d="M328.908 67.0005L325.576 56.1205C327.752 55.7578 329.588 55.3725 331.084 54.9645C332.58 54.5565 333.804 53.9671 334.756 53.1965C335.708 52.4711 336.434 51.4965 336.932 50.2725L338.632 46.3965L338.292 51.5645L323.196 16.8845H338.02L345.84 37.6245H343.392L351.62 16.8845H365.492L350.056 51.7005C348.742 54.6471 347.336 57.0498 345.84 58.9085C344.39 60.7671 342.803 62.2178 341.08 63.2605C339.358 64.3485 337.499 65.1418 335.504 65.6405C333.51 66.1845 331.311 66.6378 328.908 67.0005Z"
                  fill="white"
                />
                <path
                  d="M48.2786 51.5645V3.62445H83.0946V14.7765H62.9666V22.2565H81.4626V33.4085H62.9666V51.5645H48.2786Z"
                  fill="#E25319"
                />
                <path
                  d="M20.4958 52.3805C16.5971 52.3805 12.8345 51.9271 9.20781 51.0205C5.62647 50.1138 2.65714 48.8898 0.299805 47.3485L4.3118 36.0605C5.76247 36.9218 7.39447 37.6925 9.20781 38.3725C11.0211 39.0071 12.9025 39.5285 14.8518 39.9365C16.8011 40.2991 18.7278 40.4805 20.6318 40.4805C23.3065 40.4805 25.0971 40.2085 26.0038 39.6645C26.9105 39.0751 27.3638 38.3725 27.3638 37.5565C27.3638 36.7858 27.0691 36.1738 26.4798 35.7205C25.9358 35.2671 24.7798 34.8591 23.0118 34.4965L14.3758 32.7285C9.97847 31.8218 6.66914 30.2125 4.4478 27.9005C2.2718 25.5885 1.1838 22.5965 1.1838 18.9245C1.1838 15.6605 2.0678 12.8271 3.8358 10.4245C5.60381 8.02179 8.09714 6.16312 11.3158 4.84845C14.5345 3.48846 18.2971 2.80846 22.6038 2.80846C26.0038 2.80846 29.2225 3.26179 32.2598 4.16846C35.2971 5.07512 37.7678 6.29912 39.6718 7.84046L35.6598 18.4485C33.9371 17.2698 31.9425 16.3631 29.6758 15.7285C27.4545 15.0485 24.9838 14.7085 22.2638 14.7085C19.9971 14.7085 18.2971 14.9805 17.1638 15.5245C16.0758 16.0685 15.5318 16.8618 15.5318 17.9045C15.5318 18.5391 15.8491 19.1285 16.4838 19.6725C17.1185 20.2165 18.3425 20.6698 20.1558 21.0325L28.6558 22.7325C32.9625 23.5938 36.2038 25.1805 38.3798 27.4925C40.6011 29.8045 41.7118 32.7738 41.7118 36.4005C41.7118 39.6191 40.8278 42.4298 39.0598 44.8325C37.2918 47.2351 34.8211 49.0938 31.6478 50.4085C28.4745 51.7231 24.7571 52.3805 20.4958 52.3805Z"
                  fill="#E25319"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="66"
                height="58"
                viewBox="0 0 66 58"
                fill="none"
              >
                <path
                  d="M2.69971 2.56445H56.033C57.8011 2.56445 59.4968 3.24927 60.7471 4.46826C61.9973 5.68725 62.6997 7.34055 62.6997 9.06445V48.0645C62.6997 49.7884 61.9973 51.4417 60.7471 52.6606C59.4968 53.8796 57.8011 54.5645 56.033 54.5645H16.033C14.2649 54.5645 12.5692 53.8796 11.319 52.6606C10.0688 51.4417 9.36637 49.7884 9.36637 48.0645V28.5645M36.033 18.8145V2.56445M22.6997 15.5645H6.03304"
                  stroke="#E25319"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register1;
