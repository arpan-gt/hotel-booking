import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
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
