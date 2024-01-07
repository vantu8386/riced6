import Header from '../../Commons/header/Header';
import Footer from '../../Commons/footer/Footer';
import React, { useEffect, useState } from 'react';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { message, Upload } from 'antd';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { formatPrice } from '../../helper/formatMoney';
// import Toastify from 'toastify-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Host() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  // Thêm menu
  const [idHost, setIdHost] = useState(65);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [idMenu, setIdMenu] = useState('');
  const showModal1 = () => {
    axios
      .post('http://localhost:3000/api/menu', { idHost })
      .then((res) => {
        setIdMenu(res.data.idMenu);
        localStorage.setItem('idMenu', JSON.stringify(res.data.idMenu));
      })
      .catch((err) => console.log(err));
    setIsModalOpen1(true);
  };
  // load Img
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState();
  const onchangeImage = async (e) => {
    setIsUploading(true);
    const checkImg = e.target.files;
    const newData = new FormData();

    for (const key of Object.keys(checkImg)) {
      newData.append('image', checkImg[key]);
    }
    try {
      const response = await axios
        .post('http://localhost:3000/api/media', newData, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .catch((err) => console.log(err));

      setUploadedImages(response.data.imageList);
    } catch (error) {
      console.error('Error uploading image', error);
    } finally {
      setIsUploading(false);
    }
  };
  // Thêm món ăn
  const [food, setFood] = useState('');
  const [price, setPrice] = useState('');
  const [foodArray, setFoodArray] = useState([]);
  const [listFoodCurrent, setListFoodCurrent] = useState([]);
  const handleSubmitCreatFood = async (e) => {
    e.preventDefault();
    const foodList = food
      .split('\n')
      .map((food) => food.trim())
      .filter((food) => food !== '');
    const formattedFoodList = foodList.map((food, index) => ({
      idMenu: idMenu,
      foodName: food,
      price: price,
      img: uploadedImages && uploadedImages[index],
    }));
    setFoodArray(formattedFoodList);
    await loadFood();
    setIsModalOpen1(false);
    toast.success('Thêm thành công');
  };
  const idMenuCurrent = JSON.parse(localStorage.getItem('idMenu'));
  const loadFood = async () => {
    try {
      for (const food of foodArray) {
        await axios.post('http://localhost:3000/api/food', food);
      }
      const res = await axios.get(
        `http://localhost:3000/api/food/${idMenuCurrent}`,
      );
      setListFoodCurrent(res.data.data);
      setFoodArray([]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadFood();
  }, [idMenuCurrent, foodArray]);
  //Xóa món ăn
  const handleDeleteFood = (idFood) => {
    axios
      .delete(`http://localhost:3000/api/food/${idFood}`)
      .then(
        (res) => console.log(res),
        loadFood(),
        toast.success('Xóa thành công'),
      )
      .catch((err) => console.log(err));
  };
  // Sửa món ăn
  const [editNameFood, setEditNameFood] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editId, setEditId] = useState('');
  const showModal = () => {
    setEditId(food.idFood);
    setEditNameFood(food.foodName);
    setEditPrice(food.price);
    setIsModalOpen(true);
  };
  const handleSubmitEditFood = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3000/api/food/${editId}`, {
        foodName: editNameFood,
        price: editPrice,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <Header />
      <div
        className="mt-10 "
        style={{
          padding: '0px 60px',
        }}
      >
        <div className="">
          <div className="flex gap-5">
            <h1 className="text-2xl font-bold uppercase">Danh sách món ăn</h1>
            <Button onClick={showModal1}>
              <h1 className="text-xl font-bold uppercase mb-5">
                Thêm mới món ăn
              </h1>
            </Button>
            <Link to="/host1">
              <button
                className=" text-xl font-bold uppercase rounded-md p-1 w-[450px] "
                style={{ border: '1px solid black' }}
              >
                Danh sách người dùng đặt món ăn
              </button>
            </Link>
          </div>
          <div className="flex gap-6 flex-wrap mb-10">
            {listFoodCurrent && listFoodCurrent.length > 0 ? (
              listFoodCurrent.map((food, index) => (
                <div
                  key={index}
                  className="w-[330px] bg-white border border-gray-200 rounded-lg shadow dark:bg-[#FFFFFF] mt-10"
                >
                  <div className="w-full h-[246px]">
                    <img
                      className="rounded-t-lg w-full h-full"
                      src={food.img}
                      alt=""
                    />
                  </div>
                  <div className="p-3 flex gap-5 items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-semibold">
                        {food.foodName}
                      </h4>
                      <p>{formatPrice(food.price)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="border-none w-[40px] h-[40px] rounded-full leading-[30px] p-0.5"
                        style={{
                          border: '1px solid black',
                        }}
                        onClick={() => {
                          showModal(),
                            setEditNameFood(food.foodName),
                            setEditPrice(food.price);
                          setEditId(food.idFood);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square text-base"></i>
                      </Button>
                      <div
                        className="w-[40px] h-[40px] rounded-full text-center leading-[40px]"
                        style={{ border: '1px solid black' }}
                      >
                        <i
                          className="fa-solid fa-trash text-base hover:text-red-500"
                          onClick={() => handleDeleteFood(food.idFood)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3
                className="text-3xl font-bold flex text-[red] p-[100px]"
                style={{ margin: '0 auto' }}
              >
                Chưa có món ăn trong danh sách
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        okButtonProps={{ className: 'bg-blue-500' }}
        visible={true}
        footer={null}
      >
        <form onSubmit={handleSubmitCreatFood}>
          <div className="">
            <h1 className="text-2xl font-bold uppercase mb-5">
              Thêm mới món ăn
            </h1>
            <div>
              <textarea
                id="message"
                rows={5}
                className="w-full block p-2.5 text-sm  bg-gray-50 rounded-lg border  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                placeholder="Write your thoughts here..."
                value={food}
                onChange={(e) => setFood(e.target.value)}
              />
            </div>
            <div className=" mt-5">
              <input
                className="w-full rounded-md h-12 p-2.5"
                placeholder="Giá tiền"
                type="text"
                style={{ border: '1px solid black' }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="">
              <div>
                <h1>Upload file</h1>
                <label htmlFor="file" className="cursor-pointer mr-3">
                  <UploadOutlined />
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  hidden
                  onChange={onchangeImage}
                />
                <Button disabled={isUploading}> Upload </Button>
                {isUploading && (
                  <p>
                    <LoadingOutlined
                      style={{
                        fontSize: '50px',
                        marginBottom: '20px',
                        marginTop: '20px',
                      }}
                    />
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-5 w-full  mt-3 mb-3 flex-wrap">
              {uploadedImages &&
                uploadedImages.length > 0 &&
                uploadedImages.map((img, index) => (
                  <img key={index} className="w-[45%]" src={img} />
                ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-red-500 h-10 w-20 text-white rounded-md"
          >
            Xác nhận
          </button>
        </form>
      </Modal>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: 'bg-blue-500' }}
        visible={true}
        footer={null}
      >
        <form onSubmit={handleSubmitEditFood}>
          <h1 className="text-2xl mb-4 font-semibold">Chỉnh sửa món ăn</h1>
          <p className="mb-1 text-lg">Tên món ăn:</p>
          <input
            type="text"
            className="w-full rounded-md h-8 p-2.5 mb-4"
            style={{ border: '1px solid black' }}
            value={editNameFood}
            onChange={(e) => setEditNameFood(e.target.value)}
          />

          <p className="mb-1 text-lg">Giá tiền:</p>
          <input
            type="text"
            className="w-full rounded-md h-8 p-2.5 mb-4"
            style={{ border: '1px solid black' }}
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
          <button
            type="submit"
            className="mt-3 w-[100px] h-[40px] bg-red-400 text-white rounded-lg"
          >
            Xác nhận
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Host;
