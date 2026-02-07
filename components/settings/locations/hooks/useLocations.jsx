import { get, post, delete as deleteRequest, put } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { router } from "expo-router";
import { useState } from "react";
function useLocation() {
  const { localization } = useLocalization();

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationById, setLocationById] = useState(null);

  const confirmHandler = async () => {
    setIsMessage(false);
    await getLocations();
  };

  const undoHandler = () => {};

  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addLocation");
  };
  const addLocationRouter = () => {
    router.push("/(tabs)/(03_settings)/addLocation");
  };
  const startEditing = (item) => {
    router.push({
      pathname: "/(tabs)/(03_settings)/addLocation",
      params: { id: item.id },
    });
  };

  const getLocationById = async (id) => {
    setIsLoading("getPlaceById");
    setError(null);
    try {
      const response = await get(`admin/places/${id}`);
      if (response.status === 200) {
        setLocationById(response.data);
      }
    } catch (errorData) {
      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }
  };
  const deactivateLocation = async (data) => {
    const { id } = data;
    setIsLoading("remove");
    setError(null);
    try {
      const response = await deleteRequest(`admin/places/${id}`);
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.PLACES.removeSuccess);
      }
    } catch (errorData) {
      console.log("errorData+++", errorData);

      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }
  };

  const submitChanges = async (address) => {
    setIsLoading("post");
    setError(null);
    try {
      const response = await post(`places`, { address });
      console.log("response", response);
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.SETTINGS.EMPLOYERSPLACES.success);
      }
    } catch (errorData) {
      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }
  };
  const addEditLocation = async (data) => {
    const { id } = data;
    const { streetName, city } = data;
    setIsLoading("addEdit");
    if (id) {
      try {
        const response = await put(`admin/places/${id}`, {
          address: streetName,
          city,
        });
        if (response.status === 200) {
          setIsMessage(true);
          setMessage(localization.PLACES.edit);
        }
      } catch (err) {
        setError(localization.PLACES.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    } else {
      const address = [streetName, city].join(", ");
      try {
        const response = await post(`admin/places`, { address });
        if (response.status === 201) {
          setIsMessage(true);
          setMessage(localization.PLACES.add);
        }
      } catch (err) {
        console.log("errrr", err);
        setError(localization.PLACES.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    }
  };

  const getLocations = async () => {
    setIsLoading("getPlaces");
    setError(null);
    try {
      const response = await get(`admin/places`);
      if (response.status === 200) {
        setLocations(response.data);
      }
    } catch (errorData) {
      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }
  };

  const confirmSubmit = async () => {
    setMessage(null);
    setIsMessage(false);
  };



  return {
    isLoading,
    error,
    isMessage,
    message,
    confirmHandler,
    setIsMessage,
    getLocations,
    locations,
    submitChanges,
    confirmSubmit,
    addServiceRouter,
    addLocationRouter,
    startEditing,
    deactivateLocation,
    undoHandler,
    getLocationById,
    locationById,
    addEditLocation,
  };
}

export default useLocation;
