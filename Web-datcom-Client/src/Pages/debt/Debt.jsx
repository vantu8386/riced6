import React from "react";
import Header from "../../Commons/header/Header";
import Footer from "../../Commons/footer/Footer";

function Debt() {
    return (
        <div>
            <Header />
            <div
                className="mt-10 mb-10"
                style={{
                    padding: "0px 60px 60px",
                }}
            >
                <h1 className="text-2xl font-bold uppercase px-6 py-3 mb-5">
                    Quản lý dư nợ
                </h1>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right  ">
                        <thead className="text-xs  uppercase border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=" border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4">Silver</td>
                                <td className="px-6 py-4">Laptop</td>
                                <td className="px-6 py-4">$2999</td>
                            </tr>
                            <tr className=" border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    Microsoft Surface Pro
                                </th>
                                <td className="px-6 py-4">White</td>
                                <td className="px-6 py-4">Laptop PC</td>
                                <td className="px-6 py-4">$1999</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Debt;
