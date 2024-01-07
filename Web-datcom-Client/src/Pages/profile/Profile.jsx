import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import instance from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../../firebase/upload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function Profile() {
  const idUser = localStorage.getItem("idUser");
  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [profileUser, setProfileUser] = useState("");
  const [updateUserName, setUpdateUserName] = useState({
    userName: "",
  });

  const [imageUrls, setImageUrls] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);

  const [errors, setErrors] = useState({});
  const [changePasswords, setChangePasswords] = useState({
    email: "",
    passwords: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { email, passwords, newPassword, confirmNewPassword } = changePasswords;

  const loadUser = () => {
    const headers = { Authorization: `Bearer ${token}` };
    instance
      .get(`users/${idUser}`, { headers })
      .then((res) => {
        // console.log(res.data);
        setProfileUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const changePassword = (e) => {
    setChangePasswords({ ...changePasswords, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const handleChangeUserName = (e) => {
    setUpdateUserName({ ...updateUserName, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  useEffect(() => {
    setChangePasswords((prevPasswords) => ({
      ...prevPasswords,
      email: profileUser.email,
    }));
  }, [profileUser]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // update user name
  const handleOk = () => {
    if (!updateUserName.userName) {
      setErrors({ message: "Không được để trống" });
      return;
    }
    if (
      updateUserName.userName.length < 5 ||
      updateUserName.userName[0] !== updateUserName.userName[0].toUpperCase()
    ) {
      setErrors({
        message:
          "Username phải có ít nhất 5 kí tự và bắt đầu bằng chữ cái viết hoa",
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const nameUpdate = {
      userName: updateUserName.userName,
    };
    instance
      .patch(`users/updateUserName/${idUser}`, nameUpdate, {headers})
      .then((res) => {
        // console.log("res:", res)
        setProfileUser((prevUser) => ({
          ...prevUser,
          userName: updateUserName.userName,
        }));
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update avatar
  const handleChangeInput = (e) => {
    const files = Array.from(e.target.files);
    setImageUrls(files);

    const tempUrls = files.map((file) => URL.createObjectURL(file));
    // setTempImageUrls(tempUrls);
    setDownloadUrls(tempUrls);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  // đổi mk
  const handleOk1 = () => {

    const headers = { Authorization: `Bearer ${token}` };
    const formChangePassword = {
      email: profileUser.email,
      passwords,
      newPassword,
    };
    instance
      .post("users/changePassword", formChangePassword, { headers })
      .then((res) => {
        setChangePasswords({
          email: "",
          passwords: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        toast.success(res.data.message);
        setIsModalOpen1(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
        // toast.warning(err.response.data.message);
      });
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  // update avatar
  const handleOk2 = () => {
    if (downloadUrls == 0) {
      toast.warning("ảnh không được để trống");
      return;
    }
    Promise.all(
      imageUrls.map((file) => {
        const imageRef = ref(store, `imagesUsers/${file.name + uuidv4()}`);
        return uploadBytes(imageRef, file).then((value) => {
          return getDownloadURL(value.ref);
        });
      })
    ).then((response) => {
      setDownloadUrls(response);

      const formUpload = {
        avatarUser: response,
      };

      const headers = { Authorization: `Bearer ${token}` };

      if (imageUrls.length > 0) {
        instance
          .patch(`users/updateAvatarUser/${idUser}`, formUpload, { headers })
          .then((res) => {
            console.log(res.data);
            setProfileUser((prevUser) => ({
              ...prevUser,
              avatarUser: response, // Cập nhật avatarUser với mảng đường link của ảnh
            }));
            setIsModalOpen2(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={500}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <Header profileUser={profileUser} />
      <div
        className=" flex justify-center gap-5"
        style={{ padding: "60px 60px" }}
      >
        <>
          <div className="bg-[#eee] w-[30%] p-6 rounded-lg shadow-md">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
                <img
                  src={profileUser?.avatarUser}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {/* update image */}
              <div className="absolute bottom-2 left-[54%] flex items-center">
                <div className="flex items-center justify-center w-6 h-6 p-3 border-2 border-gray-300  rounded-full cursor-pointer bg-gray-300 hover:bg-white ">
                  <div className="flex items-center justify-center">
                    <i onClick={showModal2} className="fa-solid fa-camera"></i>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="text-xl mt-4 text-center">
              {profileUser?.userName}
            </h5>

            <div className="mt-4 flex justify-center flex-wrap ">
              <button
                onClick={showModal}
                className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Chỉnh sửa thông tin
              </button>
              <button
                onClick={showModal1}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
          {/* render thông tin của user */}
          <div className="flex flex-col justify-between bg-[#eee] w-[40%] p-6 rounded-lg shadow-md">
            <div>
              <div className="flex gap-4 mb-4">
                <p className="font-semibold w-[100px]">Full Name:</p>
                <p>{profileUser?.userName}</p>
              </div>
              <div className="flex gap-4 mb-4">
                <p className="font-semibold w-[100px]">Email:</p>
                <p>{profileUser?.email}</p>
              </div>
              <div className="flex gap-4 mb-4">
                <p className="font-semibold w-[100px]">Phone:</p>
                <p>{profileUser?.phoneNumber}</p>
              </div>
            </div>

            <div>
              <Link to="/host">
                <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Quản lý sản phẩm
                </button>
              </Link>
              <Link to="/debt">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Quản lý dư nợ
                </button>
              </Link>
            </div>
          </div>
        </>
      </div>
      {/* update user name */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div>
          <h1 className="text-2xl font-bold uppercase mb-5">
            Chỉnh sửa thông tin
          </h1>
          <div className="mb-3">
            <h2 className="text-lg mb-1">User Name:</h2>
            <Input
              placeholder="Họ và tên"
              value={updateUserName.userName}
              name="userName"
              onChange={handleChangeUserName}
              className={`rounded-md outline-blue-500 w-full h-9 px-2 border border-slate-500 ${
                errors.message
                  ? "border border-red-500 shadow-sm shadow-red-800"
                  : ""
              }`}
            />

            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </div>
        </div>
      </Modal>

      {/* đổi mk */}
      <Modal
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div>
          <h1 className="text-2xl font-bold uppercase mb-5">Đổi mật khẩu</h1>
          <div className="mb-3">
            <h2 className="text-lg mb-1">Nhập lại mật khẩu cũ:</h2>
            <Input
              onChange={changePassword}
              name="passwords"
              value={passwords}
              className={errors.passwords ? "border border-red-500 " : ""}
            />
            {errors.passwords && (
              <p className="text-red-500 absolute">{errors.passwords}</p>
            )}
          </div>
          <div className="mb-3">
            <h2 className="text-lg mb-1">Mật khẩu mới:</h2>
            <Input
              onChange={changePassword}
              name="newPassword"
              value={newPassword}
              className={errors.newPassword ? "border border-red-500 " : ""}
            />
            {errors.newPassword && (
              <p className="text-red-500 absolute">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-7">
            <h2 className="text-lg mb-1">Xác nhận mật khẩu:</h2>
            <Input
              onChange={changePassword}
              name="confirmNewPassword"
              value={confirmNewPassword}
              className={
                errors.confirmNewPassword ? "border border-red-500 " : ""
              }
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 absolute">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </div>
      </Modal>

      {/* update image */}
      <Modal
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div>Tải ảnh lên</div>
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
          {/* {downloadUrls.map((url, index) => ( */}
          {downloadUrls == 0 ? (
            <img
              src={profileUser?.avatarUser}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <img className="w-full h-full" src={downloadUrls} alt="" />
          )}

          {/* ))} */}
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              onChange={handleChangeInput}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}

export default Profile;
