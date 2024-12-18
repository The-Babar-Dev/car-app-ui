"use client";

import Input from "@/components/common/Input";
import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import Loader from "@/components/common/loader";
import { handleApiResponse } from "@/utils/serverResponseHandler";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/utils/sessionManager";

const CarModal = ({ fetchCars }) => {
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    setValue,
  } = useForm();

  // Resets the form and closes the modal
  const resetAndCloseModal = () => {
    resetForm();
    //close modal
    modalRef?.current?.click();
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);

    try {
      const token = getUserSession();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cars`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        handleApiResponse(response);
        //refetch updated data
        fetchCars();
      }

      // Handle successful login (e.g., save token, redirect)
    } catch (error) {
      handleApiResponse(error.response, router);
    } finally {
      setLoading(false);
      resetAndCloseModal();
    }
  };

  return (
    <>
      <input
        ref={modalRef}
        type="checkbox"
        id="add_car_modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box rounded-md shadow-lg p-0 max-w-3xl">
          {/* Top Header */}
          <div
            htmlFor="add_car_modal"
            className="flex justify-between items-center p-4 bg-gray-50"
          >
            <p className="text-gray-600 font-semibold">Add Car</p>
            <p
              className="cursor-pointer bg-primary hover:bg-red-500 p-1 text-primary rounded-full transition-all duration-500 ease-in-out"
              onClick={() => resetAndCloseModal()}
            >
              <RxCross2 className="text-md" />
            </p>
          </div>
          {/* Content container */}
          <div className="p-4 px-6 bg-white">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  id="CarModel"
                  label="Car Model"
                  placeholder="Enter car model"
                  type="text"
                  error={errors?.CarModel}
                  errorMessage={errors?.CarModel?.message}
                  {...register("CarModel", {
                    required: "CarModel is required",
                    minLength: {
                      value: 3,
                      message: "ModelName must be at least 3 characters",
                    },
                  })}
                />
                <Input
                  id="Price"
                  label="Price"
                  type="number"
                  placeholder="Enter car price"
                  error={errors?.Price}
                  errorMessage={errors?.Price?.message}
                  {...register("Price", {
                    required: "Price is required",
                    min: {
                      value: 1,
                      message: "Price cannot be negative or zero",
                    },
                  })}
                />
                <Input
                  id="PhoneNumber"
                  label="PhoneNumber"
                  type="number"
                  placeholder="Enter phone number"
                  error={errors?.PhoneNumber}
                  errorMessage={errors?.PhoneNumber?.message}
                  {...register("PhoneNumber", {
                    required: "PhoneNumber is required",
                    minLength: {
                      value: 11,
                      message: "Phone number must be 11 digits long",
                    },
                    maxLength: {
                      value: 11,
                      message: "Phone number cannot exceed 11 digits",
                    },
                  })}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-primary text-primary text py-2 px-4 rounded-md"
              >
                {loading ? <Loader /> : "Create Car"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarModal;
