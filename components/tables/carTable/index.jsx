"use client";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDateToDDMMYYYY } from "@/helpers";
import Input from "@/components/common/Input";
import Spinner from "@/components/common/spinner";
import { handleApiResponse } from "@/utils/serverResponseHandler";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/utils/sessionManager";

const CarTable = ({ cars, loading, fetchCars }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleDelete = async (carId) => {
    try {
      const token = getUserSession();

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        handleApiResponse(response);
        // After successful deletion, refetch cars
        fetchCars();
      }
    } catch (error) {
      handleApiResponse(error.response, router);
    }
  };

  return (
    <div>
      <div className="flex py-3">
        <Input
          icon={IoIosSearch}
          type="text"
          placeholder="Search by car model"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr className="mb-3 border border-gray-200" />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>CarModel</th>
              <th>Price</th>
              <th>Phone #</th>
              <th>CreatedAt</th>
              <th>CreatedBy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-secondary text-center py-6">
                  <Spinner />
                </td>
              </tr>
            ) : cars?.length > 0 ? (
              (() => {
                const filteredCars = cars?.filter((cars) => {
                  if (search === "") {
                    return true;
                  } else {
                    return cars?.CarModel?.toLowerCase().includes(
                      search.toLowerCase()
                    );
                  }
                });

                if (filteredCars.length === 0) {
                  return (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-gray-600 text-center py-6"
                      >
                        No search result found.
                      </td>
                    </tr>
                  );
                }

                //List cars
                return filteredCars?.map((car) => (
                  <tr className="text-[11px]" key={car._id}>
                    <td>{car.CarModel}</td>
                    <td>${car.Price}</td>
                    <td>{car.PhoneNumber}</td>
                    <td>{formatDateToDDMMYYYY(car.CreatedAt) || "N/A"}</td>
                    <td>{car?.User?.name || "N/A"}</td>

                    <td className="text-[12px] space-x-2 text-gray-500 flex">
                      {/* <label
                        htmlFor="edit_car_modal"
                        className="border border-gray-500 p-2 rounded-md hover:bg-[#288EC7] hover:text-white transition-all duration-500 ease-in-out cursor-pointer"
                        onClick={() => handleEditClick(car._id)}
                      >
                        <FaRegEdit />
                      </label> */}
                      <label
                        className="border border-gray-500 p-2 cursor-pointer rounded-md hover:bg-[#FF0000] hover:text-white transition-all duration-500 ease-in-out"
                        onClick={() => handleDelete(car._id)}
                      >
                        <RiDeleteBin6Line />
                      </label>
                    </td>
                  </tr>
                ));
              })()
            ) : (
              <tr>
                <td colSpan="6" className="text-gray-500 text-center py-6">
                  No cars data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarTable;
