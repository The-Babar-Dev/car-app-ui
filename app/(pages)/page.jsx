"use client";

import CarModal from "@/components/modals/carModal";
import CarTable from "@/components/tables/carTable";
import { handleApiResponse } from "@/utils/serverResponseHandler";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbCirclePlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/utils/sessionManager";
import ProtectedRoute from "@/components/HOC/protectedRoute";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch cars
  const fetchCars = async () => {
    setLoading(true);
    try {
      const token = getUserSession();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cars`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        setCars(response?.data?.data?.cars);
      }
    } catch (error) {
      handleApiResponse(error.response, router);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchCars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <ProtectedRoute requireAuth={true}>
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-md font-semibold">Cars List</h2>
            <p className="text-xs text-gray-500">Manage your cars</p>
          </div>
          <label
            htmlFor="add_car_modal"
            className="flex items-center gap-2 text-xs font-semibold p-2 px-3 rounded-md text-primary bg-primary cursor-pointer"
          >
            <TbCirclePlus className="text-lg" />
            Add Car
          </label>
        </div>
        {/* Table-Container */}
        <div className="bg-white min-h-32 mt-4 p-3 rounded-md border border-gray-300">
          <CarTable cars={cars} loading={loading} fetchCars={fetchCars} />
        </div>

        <CarModal fetchCars={fetchCars} />
      </div>
    </ProtectedRoute>
  );
}
