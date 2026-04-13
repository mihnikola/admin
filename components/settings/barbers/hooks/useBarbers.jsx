import { get, delete as deleteRequest, put } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { getLanguageValue } from "@/helpers/language";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useBarbers = () => {
  const [barbersData, setBarbersData] = useState([]);
  const [seniorityData, setSeniorityData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [barberData, setBarberData] = useState(null);

  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const removeBarber = async (data) => {
    const { id, firedDate } = data;
    setIsLoading("remove");
    console.log("removeBarber", data);
    setError(null);
    try {
      const response = await put(`admin/users/${id}/softDelete`, { firedDate });
      console.log("response", response);
      setIsMessage(true);
      setMessage(localization.BARBERS.delete);
    } catch (err) {
      console.log("errorrr", err);

      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const fetchAllBarbers = async () => {
    setIsLoading("get");
    setError(null);
    try {
      const response = await get("/admin/users/employers");
      if (response.status === 200) {
        setBarbersData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const fetchAllSeniority = async () => {
    setIsLoading("get");
    setError(null);
    try {
      const response = await get("/seniority");
      if (response.status === 200) {
        setSeniorityData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const fetchAllStatusChecking = async () => {
    setIsLoading("getStatuses");
    setError(null);
    try {
      const response = await get("/statusNotification");
      if (response.status === 200) {
        setStatuses(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const addEditBarber = async (userData) => {
    console.log("languageValue",localization.code)
    setIsLoading("addEdit");
    setError(null);
    const formData = new FormData();
    if (userData?.name) {
      formData.append("name", userData?.name);
    }

    formData.append("phoneNumber", userData?.phoneNumber);
    formData.append("seniority", userData?.seniority?._id);
    formData.append("email", userData?.email);
    formData.append("password", userData?.password);
    formData.append("statusCheck", userData?.statusCheck);

    if (userData?.image) {
      const filename = userData?.image.split("/").pop();
      const fileType =
        filename.split(".").pop() === "png"
          ? "image/png"
          : filename.split(".").pop() === "jpg"
            ? "image/jpg"
            : "image/jpeg";
      formData.append("image", {
        uri: userData?.image,
        name: filename,
        type: fileType,
      });
    }
    Object.fromEntries(formData._parts);

    if (userData?.id) {
      try {
        const response = await axios.put(
          `${process.env.EXPO_PUBLIC_API_URL}/admin/users/${userData?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Accept-Language": localization.code, // or "en", "en-US", etc.
            },
          },
        );
        if (response.status === 200) {
          setIsMessage(true);
          setMessage(localization.BARBERS.edit);
        }
      } catch (err) {
        setError(localization.BARBERS.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/admin/users`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Axios might need this explicitly for FormData
              "Accept-Language": localization.code, // or "en", "en-US", etc.
            },
          },
        );
        if (response.status === 201) {
          setIsMessage(true);
          setMessage(localization.BARBERS.add);
        }
      } catch (err) {
        console.log("errrr", err);
        setError(localization.BARBERS.errorFetch);
        setIsMessage(true);
      } finally {
        setIsLoading(null);
      }
    }
  };
  //   const addEditBarber = async (userData) => {
  //   setIsLoading("addEdit");
  //   setError(null);

  //   try {
  //     let formData = new FormData();

  //     // Dodavanje tekstualnih polja
  //     if (userData?.name) formData.append("name", userData.name);
  //     if (userData?.phoneNumber) formData.append("phoneNumber", userData.phoneNumber);
  //     if (userData?.seniority) formData.append("seniority", userData.seniority._id);
  //     if (userData?.email) formData.append("email", userData.email);
  //     if (userData?.password) formData.append("password", userData.password);

  //     // Dodavanje slike preko helper-a
  //     if (userData?.image) {
  //       const imageFormData = await createImageFormData(userData.image, "image");
  //       // FormData iz helper-a može imati samo jedno polje, dodajemo ga u glavni formData
  //       if (imageFormData) {
  //         imageFormData.forEach((value, key) => formData.append(key, value));
  //       }
  //     }

  //     // PUT ili POST zavisno od toga da li editujemo
  //     const url = userData?.id
  //       ? `${process.env.EXPO_PUBLIC_API_URL}/admin/users/${userData.id}`
  //       : `${process.env.EXPO_PUBLIC_API_URL}/admin/users`;
  //     const method = userData?.id ? "put" : "post";

  //     const response = await axios({
  //       url,
  //       method,
  //       data: formData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     console.log("response",response)
  //     if ((method === "post" && response.status === 201) || (method === "put" && response.status === 200)) {
  //       setIsMessage(true);
  //       setMessage(userData?.id ? localization.BARBERS.edit : localization.BARBERS.add);
  //     }
  //   } catch (err) {
  //     console.log("Upload error", err);
  //     setError(localization.BARBERS.errorFetch);
  //     setIsMessage(true);
  //   } finally {
  //     setIsLoading(null);
  //   }
  // };

  const getBarberHandler = async (id) => {
    setIsLoading("getBarber");
    setError(null);
    try {
      const response = await get(`/admin/users/employer/${id}`);
      if (response.status === 200) {
        setBarberData(response.data);
      }
    } catch (err) {
      setError(localization.BARBERS.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const startEditing = async (barber) => {
    router.push({
      pathname: "/(tabs)/(03_settings)/addBarbers",
      params: { id: barber._id },
    });
  };

  const confirmHandler = async () => {
    setIsMessage(false);
    await fetchAllBarbers();
  };

  useEffect(() => {
    fetchAllBarbers();
  }, []);

  return {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    addEditBarber,
    fetchAllBarbers,
    barberData,
    barbersData,
    removeBarber,
    confirmHandler,
    startEditing,
    getBarberHandler,
    fetchAllSeniority,
    seniorityData,
    fetchAllStatusChecking,
    statuses,
  };
};

export default useBarbers;
