import React, { useEffect, useState } from "react";
import Header from "../../Commons/header/Header";
import Homepage1 from "./Homepage1";
import Homepage2 from "./Homepage2";
import Homepage3 from "./Homepage3";
import Footer from "../../Commons/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../api/axios";
function Homepage() {
  const idUser = localStorage.getItem("idUser");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [listHost, setListHost] = useState([]);
  const [profileUser, setProfileUser] = useState("");

  //Load All host

  const loadHost = () => {
    axios
      .get("http://localhost:3000/api/allHost")
      .then((res) => setListHost(res.data.data))
      .catch((err) => console.log(err));
  };
  
// thanhan8888
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
    loadHost();
  }, []);
  console.log(listHost);
  // Navigate order
  const onClickNavigateOrder = (idMenu) => {
    console.log(idMenu);
    navigate(`/order/${idMenu}`);
    window.scroll(0, 0);
  };
  return (
    <div>
      <Header profileUser={profileUser} />
      <Homepage1 />
      <div className="relative">
        <Homepage2 />
        <div
          className="absolute top-0 left-0 w-full"
          style={{ padding: "0 150px" }}
        >
          <h1 className="text-4xl font-semibold mb-4 mt-5">Thương hiệu</h1>
          <h2 className="text-xl font-medium">
            Thương hiệu đa dạng, thỏa sức lựa chọn!
          </h2>

          <div className="flex justify-between gap-5">
            {listHost.length > 0 &&
              listHost.map((e, i) => (
                <div
                  key={i}
                  className="max-w-[330px] bg-white border border-gray-200 rounded-lg shadow dark:bg-[#FFFFFF] mt-10"
                  onClick={() => onClickNavigateOrder(e.idMenu)}
                >
                  <div>
                    <img
                      className="rounded-t-lg"
                      src="https://colombo.vn/upload/20922/20180814/Table-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10">
                        <img
                          className="rounded-full"
                          src="https://images.deliany.co/KZZ0BvWhiZ8ax59O1fzK4a2mDAhzxZvv43Zv7TiMXMM/rs:fill:300:300:false/g:ce:0:0/czM6Ly9tYWZmaWFjby1jYXJhdmFuLWltYWdlcy1wcm9kdWN0aW9uL2F0dGFjaG1lbnRzLzcxOThmOGI0LWRlNDgtNGQ1ZS1hZTEwLTA1ODY3NjU0ZjdmYS16dW13aGVyZS1sb2dvLTIuanBn.jpg"
                          alt=""
                        />
                      </div>
                      <h5 className="mb-2 text-xl font-bold tracking-tight ">
                        {e.idHost}
                      </h5>
                    </p>
                    <p className="mb-3 font-normal text-sm text-[#596a4d]">
                      Món ăn:
                      <div>
                        {e.foods.map((food, i) => (
                          <span key={i}>
                            <span>{food.foodName},</span>
                          </span>
                        ))}
                      </div>
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="">
            <h1 className="text-3xl font-bold text-center mt-14  ">
              Vì sao chọn cơm RA?
            </h1>
            <div className="flex justify-center mt-5 mb-5">
              <img
                className="w-[150px]"
                src="https://anzi.com.vn/images/icon/graphic-nomal.png"
                alt=""
              />
            </div>
            <div className="flex justify-center mb-10">
              <p className="text-center w-[800px]">
                Đến với Anzi, bạn không cần bận tâm các vấn đề vệ sinh an toàn
                thực phẩm. Với nguyên tắc "Cái đức đặt lên hàng đầu", thức ăn từ
                khâu chọn lọc đến khâu chế biến đều được đội ngũ bếp chăm chút
                kỹ lưỡng !
              </p>
            </div>
            <div className="flex justify-between">
              <div
                className="flex flex-col items-center text-center w-[400px]"
                style={{
                  borderRight: "1px dashed #ccc",
                  // borderBottom: "1px dashed #ccc",
                  padding: "20px 20px 0",
                }}
              >
                <div>
                  <img
                    className="w-[100px]"
                    src="https://anzi.com.vn/upload/post/why/02102018231203.png"
                    alt=""
                  />
                </div>
                <p className="text-xl text-[#303030] font-bold mb-4 mt-4">
                  Nguồn thực phẩm tươi, sạch
                </p>
                <p>
                  Thực phẩm chọn lọc kỹ càng, cam kết không sử dụng các hoá chất
                  nhầm mục đích lợi nhuận{" "}
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center w-[400px]"
                style={{
                  borderRight: "1px dashed #ccc",
                  // borderBottom: "1px dashed #ccc",
                  padding: "20px 20px 0",
                }}
              >
                <div>
                  <img
                    className="w-[100px]"
                    src="https://anzi.com.vn/upload/post/why/02102018231222.png"
                    alt=""
                  />
                </div>
                <p className="text-xl text-[#303030] font-bold mb-4 mt-4">
                  Đặt trưng hương vị miền tây
                </p>
                <p>
                  Món ăn chế biến khẩu vị đậm đà, đặc trưng hương vị Miền Tây
                  vừa miệng nhiều thực khách
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center w-[400px]"
                style={{
                  // borderRight: "1px dashed #ccc",
                  // borderBottom: "1px dashed #ccc",
                  padding: "20px 20px 0",
                }}
              >
                <div>
                  <img
                    className="w-[100px]"
                    src="https://anzi.com.vn/upload/post/why/02102018231244.png"
                    alt=""
                  />
                </div>
                <p className="text-xl text-[#303030] font-bold mb-4 mt-4">
                  Thực đơn đổi mới mỗi ngày
                </p>
                <p>
                  Thực đơn mới mỗi ngày, thường xuyên có các món mới lạ, không
                  gây cảm giác gây ngán ăn
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-7">
              <div
                className="flex flex-col items-center text-center w-[400px]"
                style={{
                  borderRight: "1px dashed #ccc",
                  padding: "20px 20px 0",
                }}
              >
                <div>
                  <img
                    className="w-[100px]"
                    src="https://anzi.com.vn/upload/post/why/02102018231316.png"
                    alt=""
                  />
                </div>
                <p className="text-xl text-[#303030] font-bold mb-4 mt-4">
                  Giao nhanh chóng, đúng giờ
                </p>
                <p>
                  Cố gắng giao thức ăn đến tay khách hàng nhanh nhất, món ăn vẫn
                  còn nóng. Shipper dễ thương
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center w-[400px]"
                style={{
                  borderRight: "1px dashed #ccc",
                  // borderBottom: "1px dashed #ccc",
                  padding: "20px 20px 0",
                }}
              >
                <div>
                  <img
                    className="w-[100px]"
                    src="https://anzi.com.vn/upload/post/why/02102018231341.png"
                    alt=""
                  />
                </div>
                <p className="text-xl text-[#303030] font-bold mb-4 mt-4">
                  Phần cơm đầy đủ chất dinh dưỡng
                </p>
                <p>
                  Mỗi phần cơm RK gồm có: cơm, món mặn, canh, rau xào, trái cây
                  tráng miệng, tăm và khăn ước
                </p>
              </div>

              <div
                className="flex flex-col items-center text-center w-[400px]"
                style={{
                  // borderRight: "1px dashed #ccc",
                  // borderBottom: "1px dashed #ccc",
                  padding: "20px 20px 0",
                }}
              >
                <div>
                  <img
                    className="w-[100px]"
                    src="	https://anzi.com.vn/upload/post/why/02102018231401.png"
                    alt=""
                  />
                </div>
                <p className="text-xl text-[#303030] font-bold mb-4 mt-4">
                  Luôn lắng nghe khách hàng
                </p>
                <p>
                  Đội ngũ RK luôn lắng nghe mọi ý kiến khách hàng để cải thiện
                  chất lượng dịch vụ
                </p>
              </div>
            </div>
          </div>

          <div>
            <Homepage3 />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
