import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel!", type: "ERROR" });
    },
  });

  const handleSave = async (hotelFormData: FormData) => {
    await mutation.mutateAsync(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={mutation.isPending} />;
};
export default AddHotel;
