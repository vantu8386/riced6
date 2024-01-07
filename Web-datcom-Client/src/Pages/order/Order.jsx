import React, { useEffect, useState } from 'react';
import Header from '../../Commons/header/Header';
import Footer from '../../Commons/footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { formatPrice } from '../../helper/formatMoney';

function Order() {
  const navigate = useNavigate();
  // Read Món ăn theo Idmenu
  const [listFood, setListFood] = useState([]);
  const { idMenu } = useParams();
  const loadFood = () => {
    axios
      .get(`http://localhost:3000/api//food/${idMenu}`)
      .then((res) => setListFood(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadFood();
  }, []);
  // Chọn món ăn
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodQuantities, setFoodQuantities] = useState({});
  const [prices, setPrices] = useState({});
  const [idUser, setidUser] = useState(888888);

  useEffect(() => {
    const initialQuantities = {};
    listFood.forEach((food) => {
      initialQuantities[food.idFood] = 0;
    });
    setFoodQuantities(initialQuantities);
  }, [listFood]);
  const handleSubmitChooseFood = (e) => {
    e.preventDefault();
    const selectedFoodsArr = Object.entries(foodQuantities)
      .filter(([idFood, quantity]) => quantity > 0)
      .map(([idFood, quantity]) => ({
        idFood,
        quantity,
        price: prices[idFood],
        idMenu: idMenu,
        idUser: idUser,
      }));

    setSelectedFoods((prev) => ({
      ...prev,
      [idUser]: selectedFoodsArr,
    }));
    console.log(selectedFoodsArr);
  };
  // Chọn hộ
  const resetQuantities = () => {
    const newQuantities = {};
    Object.keys(foodQuantities).forEach((foodId) => {
      newQuantities[foodId] = 0;
    });
    setFoodQuantities(newQuantities);
  };
  const handleUserChange = (e) => {
    setidUser(e.target.value);
    resetQuantities();
  };
  // Tổng tiền
  const totalPricePerUser = {};
  Object.entries(selectedFoods).forEach(([userId, foodsArr]) => {
    const total = foodsArr.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    totalPricePerUser[userId] = total;
  });
  // Xóa lựa chọn món ăn
  const handleDeleteFood = (userId, foodIndex) => {
    setSelectedFoods((prev) => {
      const updatedSelectedFoods = { ...prev };
      updatedSelectedFoods[userId] = updatedSelectedFoods[userId].filter(
        (_, index) => index !== foodIndex,
      );
      return updatedSelectedFoods;
    });
  };
  // Thanh toán
  const handlePayment = async () => {
    //Đưa obj thành arr list order
    const selectedFoodsArray = Object.values(selectedFoods).flatMap(
      (foodArray) => foodArray,
    );
    // gộp chung với obj tổng giá tiền
    const listSubmitPayment = selectedFoodsArray.map((food) => {
      const userId = food.idUser;
      const totalPrice = totalPricePerUser[userId];
      return {
        ...food,
        totalPrice: totalPrice,
      };
    });
    if (listSubmitPayment.length > 0) {
      try {
        const responses = await Promise.all(
          listSubmitPayment.map((e) =>
            axios.post('http://localhost:3000/api/order', e),
          ),
        );
        await navigate('/payment');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="flex gap-5 mb-10 mt-5" style={{ padding: '12px 60px' }}>
        <div className="w-1/2">
          <div className=" mb-10">
            <h1 className="text-2xl font-bold uppercase mb-5">
              Danh sách món ăn
            </h1>
            <>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleUserChange}
              >
                <option selected="">Chọn hộ thành viên</option>
                <option value="888888">Bản thân</option>
                <option value="777777">Lâm</option>
                <option value="666666">Nam</option>
                <option value="555555">Hải Anh</option>
              </select>
            </>
          </div>
          {/* Danh sách món ăn */}
          <div className="flex gap-5 flex-wrap">
            {listFood.length > 0 &&
              listFood.map((food, i) => (
                <div className="w-[47%]" key={i}>
                  <div
                    className="p-2 rounded-lg"
                    style={{ border: '1px solid black' }}
                  >
                    <div className="flex gap-5 justify-between items-center">
                      <div className="flex gap-5 items-center">
                        <div className="w-[160px] h-[150px]">
                          <img
                            className="w-full h-full rounded-lg"
                            src={food.img}
                            alt=""
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold">
                            {food.foodName}
                          </h4>
                          <p className="mt-1 mb-1">{formatPrice(food.price)}</p>
                          <form onSubmit={handleSubmitChooseFood}>
                            <input
                              type="number"
                              className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={foodQuantities[food.idFood]}
                              onChange={(e) => {
                                const newQuantity = e.target.value;
                                if (newQuantity >= 0) {
                                  const newQuantities = { ...foodQuantities };
                                  newQuantities[food.idFood] = newQuantity;
                                  setFoodQuantities(newQuantities);
                                  setPrices({
                                    ...prices,
                                    [food.idFood]: food.price,
                                  });
                                }
                              }}
                            />
                            <button
                              type="submit"
                              className="mt-3 w-[100px] h-[40px] bg-red-400 text-white rounded-lg"
                            >
                              Xác nhận
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Danh sách order */}
        <div className="w-1/2 mt-12">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tên user
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Món ăn
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá tiền
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedFoods).map(([userId, foodsArr]) =>
                  foodsArr.map((e, colIndex) => (
                    <tr
                      key={`${userId}-${colIndex}`}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      {colIndex === 0 && (
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          rowSpan={foodsArr.length}
                        >
                          {userId}
                        </th>
                      )}
                      <td className="px-6 py-4">{e.idFood}</td>
                      <td className="px-6 py-4">{e.quantity}</td>
                      <td className="px-6 py-4">{formatPrice(e.price)}</td>
                      <td className="px-6 py-4">
                        {formatPrice(e.quantity * +e.price)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteFood(userId, colIndex)}
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  )),
                )}
                {Object.entries(totalPricePerUser).map(
                  ([userId, totalPrice]) => (
                    <tr
                      key={userId}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {userId}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Tổng: {formatPrice(totalPrice)}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-end">
            {/* <Link to="/payment"> */}{' '}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-5 flex justify-end"
              onClick={handlePayment}
            >
              Thanh toán
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Order;
