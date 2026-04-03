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
    router.back();
    await getLocations();
  };

  const deleteLocation = async (id) => {
    setIsLoading("remove");
    setError(null);
    try {
      const response = await deleteRequest(`/admin/places/${id}`);

      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.PLACES.deletedSuccess);
      }
    } catch (errorData) {

      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }


  };

  const addServiceRouter = () => {
    router.push("/(tabs)/(03_settings)/addLocation");
  };
  const addLocationRouter = () => {
    router.push("/(tabs)/(03_settings)/addLocation");
  };
  const startEditing = (id) => {
    router.push({
      pathname: "/(tabs)/(03_settings)/addLocation",
      params: { id },
    });
  };

  const getLocationById = async (id) => {
    setIsLoading("getPlaceById");
    setError(null);
    try {
      const response = await get(`/admin/places/${id}`);
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
  const deactivateLocation = async (id) => {
    setIsLoading("deactivate");
    setError(null);
    try {
      const response = await put(`/admin/places/${id}/deactivate`);

      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.PLACES.deactivatedSuccess);
      }
    } catch (errorData) {

      setIsMessage(true);
      setError(errorData);
    } finally {
      setIsLoading(null);
    }
  };
  const activateLocation = async (id) => {
    setIsLoading("activate");
    setError(null);
    try {
      const response = await put(`/admin/places/${id}/activate`);
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.PLACES.undoSuccess);
      }
    } catch (errorData) {

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


  const verificationData = (data) => {
    if (data.close === locationById.workingHours.end &&
      data.open === locationById.workingHours.start &&
      data.streetName === locationById.address &&
      data.minutes === locationById.slotDuration) {
      return false;
    }
    return true;
  }
  const addEditLocation = async (data) => {
    const { id } = data;

    if (!verificationData(data)) { return; }
   

    setIsLoading("addEdit");
    const url = id
      ? `admin/places/${id}`
      : `admin/places`;
    const method = id ? put : post;

    try {
      const response = await method(url, { data });

      if (response.status === 200 || response.status === 201) {
        setIsMessage(true);
        setMessage(id ? localization.PLACES.edit : localization.PLACES.add);
      }
    } catch (err) {
      setError(localization.PLACES.errorFetch);
      setIsMessage(true);
    } finally {
      setIsLoading(null);
    }
  };

  const getLocations = async () => {
    setIsLoading("getPlaces");
    setError(null);
    try {
      const response = await get(`/admin/places`);
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
    activateLocation,
    getLocationById,
    locationById,
    addEditLocation,
    deleteLocation
  };
}

export default useLocation;
