import React, { useEffect, useState } from 'react';
import Header from '../../Commons/header/Header';
import Footer from '../../Commons/footer/Footer';
import image from '../payment/image.jpg';
import axios from 'axios';
import { formatPrice } from '../../helper/formatMoney';
function Payment() {
  const [listOrder, setListOrder] = useState([]);
  const loadList = () => {
    axios
      .get('http://localhost:3000/api/order')
      .then((res) => setListOrder(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadList();
  }, []);
  console.log(listOrder);
  //Thanh toán
  const handlePayment = () => {
    axios.patch('');
  };
  return (
    <div>
      <Header />
      <div
        style={{ padding: '40px 60px' }}
        className="relative overflow-x-auto"
      >
        <div className="flex gap-10">
          <div className="w-[70%] relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className="text-xs  uppercase border-b">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Món ăn
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {listOrder.length > 0 &&
                  listOrder.map((e, i) => (
                    <tr key={i} className=" border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {e.idUser}
                      </th>
                      <td className="px-6 py-4">{e.idFood}</td>
                      <td className="px-6 py-4">{e.quantity}</td>
                      <td className="px-6 py-4">{formatPrice(e.totalPrice)}</td>
                    </tr>
                  ))}
                <button onClick={handlePayment}>Xác nhận thanh toán</button>
              </tbody>
            </table>
          </div>
          <div className="w-[30%]">
            <img className="" src={image} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;
