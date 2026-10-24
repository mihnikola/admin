import { createContext, useContext, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { get, delete as deleteRequest, getData, put, post } from "@/api/apiService";
import { router } from "expo-router";

const ServiceCategoryContext = createContext();

export const ServiceCategoryProvider = ({ children }) => {
    const [serviceData, setServicesData] = useState([]);
    const [serviceCategory, setServiceCategory] = useState(null);
    const [getServiceData, setGetServiceData] = useState([]);
    const [selectedValueDate, setSelectedValueData] = useState(null);
    const [timesData, setTimesData] = useState([]);
    const [chooseOne, setChooseOne] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const { localization } = useLocalization();
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [responseAdd, setResponseAdd] = useState(null);
    const [requestData, setRequestData] = useState(null);

    const [categories, setCategories] = useState([]);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [categoryNameEn, setCategoryNameEn] = useState("");
    const [categoryNameLocal, setCategoryNameLocal] = useState("");
    const [serviceId, setServiceId] = useState("");

    const [categoryName, setCategoryName] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    const fetchAllServices = async () => {
        setIsLoading("get");
        setError(null);
        try {
            const response = await get("/services/client");
            setServicesData(response.data);
        } catch (err) {
            setError(localization.SERVICES.errorFetch);
        } finally {
            setIsLoading(null);
        }
    };
    const getServices = async (date) => {
        setSelectedValueData(date);
        setIsLoading("get");
        setError(null);
        try {
            const response = await get("admin/services");
            setGetServiceData(response);
        } catch (err) {
            console.log("ee", err);
            setError(localization.SERVICES.errorFetch);
        } finally {
            setIsLoading(null);
        }
    };

    const navigateToCategory = (data) => {
        router.push({
            pathname: "/(tabs)/(03_settings)/getCategories",
            params: { categoryId: data?.category?._id || null, name: localization.code === 'en' ? data?.name?.nameEn : data?.name?.nameLocal, serviceId: data?._id || data?.id },
        });

    }

    const removeService = async (id) => {
        setIsLoading("remove");
        setError(null);
        try {
            const response = await deleteRequest(`admin/services/${id}`);
            if (response.status === 206) {
                setError(localization.SERVICES.notDelete);
            }
            if (response.status === 200) {
                setIsMessage(true);
                setMessage(localization.SERVICES.delete);
                await fetchAllServices();
            }
        } catch (err) {
            setError(localization.SERVICES.errorFetch);
        } finally {
            setIsLoading(null);
        }
    };
    const chooseService = async (item) => {
        const getServices = [...getServiceData];
        const result = getServices.map((service) => {
            if (service.id === item.id) {
                setChooseOne({
                    ...service,
                    assigned: true,
                });

                return {
                    ...service,
                    assigned: true,
                };
            }

            const { assigned, ...rest } = service;
            return rest;
        });
        setGetServiceData(result);
    };
    const fetchTimes = async (selectedDate, id, duration) => {
        setIsLoading("times");
        setError(null);

        if (!selectedDate) {
            setIsLoading(null);
            return;
        }

        const serviceData = { id, duration };

        try {
            const response = await getData("/times", {
                date: selectedDate,
                service: serviceData,
            });
            setTimesData(response);
        } catch (err) {
            setError(localization.TIMES.errorFetch);
        } finally {
            setIsLoading(null);
        }
    };
    const addEditService = async (data) => {
        setIsLoading("addEdit");
        setError(null);

        try {
            const formData = new FormData();
            const serviceId = data?._id || data?.id;
            const nameLocal = data?.nameLocal ?? "";
            const nameEn = data?.nameEn || nameLocal;

            formData.append("nameLocal", nameLocal);
            formData.append("nameEn", nameEn);

            if (data?.duration !== undefined && data?.duration !== null) {
                formData.append("duration", String(data.duration));
            }
            if (data?.price !== undefined && data?.price !== null) {
                formData.append("price", String(data.price));
            }
            const categoryId = typeof data?.category === 'object'
                ? data?.category?._id
                : (data?.category || data?.categoryId);

            if (categoryId !== undefined && categoryId !== null && categoryId !== "") {
                formData.append("category", String(categoryId));
            }

            // 3. Robusno rukovanje slikom (za React Native / Expo)
            const imageUri = data?.image;
            if (imageUri && typeof imageUri === "string" && !imageUri.startsWith("http")) {
                const filename = imageUri.split("/").pop() || "upload.jpg";
                const ext = filename.split(".").pop()?.toLowerCase() || "jpg";

                let fileType = "image/jpeg";
                if (ext === "png") fileType = "image/png";
                else if (ext === "webp") fileType = "image/webp";

                formData.append("image", {
                    uri: imageUri,
                    name: filename,
                    type: fileType,
                });
            }

            const isEdit = Boolean(serviceId);
            const endpoint = isEdit
                ? `/admin/services/${serviceId}`
                : `/admin/services`;

            let responseData;
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            if (isEdit) {
                responseData = await put(endpoint, formData, config);
            } else {
                responseData = await post(endpoint, formData, config);
            }
            if (responseData.status === 200 || responseData.status === 201) {
                setIsMessage(true);
                setMessage(
                    isEdit
                        ? localization.SERVICES.editService
                        : localization.SERVICES.addService
                );
                setResponseAdd(responseData.data);
                await fetchAllServices();
            }
        } catch (err) {
            console.error("Error in addEditService:", err?.response?.data || err?.message || err);
            setError(localization.SERVICES.errorFetch);
            setIsMessage(true);
        } finally {
            setIsLoading(null);
        }
    };

    const getServiceHandler = async (id) => {
        setIsLoading("getServiceData");
        setError(null);
        try {
            const response = await get(`/admin/services/${id}`);
            const serviceObj = response?.data || response;
            if (response.status === 200) {
                if (serviceObj) {
                    setGetServiceData(serviceObj);
                    if (!serviceObj?.category) {
                        setCategoryName(null);
                        setCategoryId(null);
                    }

                    return serviceObj;
                }
            }
        } catch (err) {
            setError(localization.SERVICES.errorFetch);
        } finally {
            setIsLoading(null);
        }
    };

    const startEditing = async (service) => {
        router.push({
            pathname: "/(tabs)/(03_settings)/addServices",
            params: { id: service.id },
        });
    };

    const confirmHandler = async (id) => {
        setIsMessage(false);
        if (!id) {
            router.dismiss(1);
            router.back();
            return;
        }
        router.back();
    };
    const questionHandler = async (id) => {
        setIsLoading("getCategory");
        setError(null);
        try {
            const response = await get(`admin/services/${id}/checkCategory`);
            if (response.check) {
                setIsConfirmation(true);
                setMessage({ question: localization.CATEGORY.question });
            } else {
                setIsConfirmation(true);
                setMessage({ question: localization.CATEGORY.questionRegular });
            }
        } catch (err) {
            setError(localization.SERVICES.errorFetch);
        } finally {
            setIsLoading(null);
        }
    };

    const getAllCategories = async () => {
        setIsLoading("get");
        setError(null);

        try {
            const response = await get(`categories`);
            setCategories(response.data);
        } catch (err) {
            console.error("Greška pri povlačenju kategorija:", err);
            setError("Greška pri učitavanju kategorija.");
        } finally {
            setIsLoading(null);
        }
    };

    const getCategoryById = async (id) => {
        setError(null);

        try {
            const response = await get(`categories/${id}/category`);
            const { nameEn, nameLocal } = response.data.name;
            setCategoryNameEn(nameEn)
            setCategoryNameLocal(nameLocal)
        } catch (err) {
            console.error("Greška pri povlačenju kategorija:", err);
            setError("Greška pri učitavanju kategorija.");
        } finally {
            setIsLoading(null);
        }

    }
    const confirmDeleteHandler = async (id) => {

        setIsConfirmation(false);
        setIsLoading("delete");
        setError(null);
        try {
            const response = await deleteRequest(`categories/${id}`);
            if (response.status === 201) {
                setIsMessage(true);
                setMessage(localization.CATEGORY.deleteMsg);
                await getAllCategories();
                await getServiceHandler(serviceId);
                return true;
            }
        } catch (err) {
            setError(localization.SERVICES.errorFetch);
        } finally {
            setIsLoading(null);
        }

    }


    // 2. Dodavanje nove kategorije
    const submitHandler = async (id) => {
        const isEdit = Boolean(id);

        // Postavljamo indikator učitavanja zavisno od akcije
        setIsLoading(isEdit ? "patch" : "post");
        setError(null);

        try {
            // Određujemo endpoint i API metodu
            const endpoint = isEdit ? `categories/${id}` : "categories";
            const apiCall = isEdit
                ? put(endpoint, { name: { nameEn: categoryNameEn, nameLocal: categoryNameLocal } })
                : post(endpoint, { name: { nameEn: categoryNameEn, nameLocal: categoryNameLocal } })

            const response = await apiCall;

            // Proveravamo uspeh (prihvata 200, 201 i 204)
            const isSuccess = response?.status >= 200 && response?.status < 300;

            if (isSuccess) {
                setIsMessage(true);
                setMessage(
                    isEdit
                        ? localization?.CATEGORY?.editSuccess || "Uspešno izmenjeno."
                        : localization?.CATEGORY?.addSuccess || "Uspešno dodato.",
                );

                // Osvežavamo globalnu listu
                await getAllCategories();
                return true;
            }

            throw new Error("Neočekivan status sa servera.");
        } catch (err) {
            console.error("Greška prilikom čuvanja kategorije:", err);
            setIsMessage(true);
            setError(localization?.SERVICES?.errorFetch || "Došlo je do greške.");
            return false;
        } finally {
            setIsLoading(null);
            setCategoryNameEn("")
            setCategoryNameLocal("")
        }
    };
    return (
        <ServiceCategoryContext.Provider
            value={{
                isLoading,
                setIsLoading,
                error,
                setError,
                isMessage,
                setIsMessage,
                message,
                setMessage,
                addEditService,
                fetchAllServices,
                serviceData,
                removeService,
                confirmHandler,
                startEditing,
                getServiceHandler,
                getServiceData,
                chooseService,
                getServices,
                fetchTimes,
                timesData,
                serviceCategory,
                chooseOne,
                navigateToCategory,
                getAllCategories,
                categories,
                setRequestData,
                requestData,
                submitHandler,
                isConfirmation,
                setServiceId,
                setIsConfirmation,
                questionHandler,
                getCategoryById,
                categoryNameEn,
                setCategoryNameEn,
                categoryNameLocal,
                setCategoryNameLocal,
                confirmDeleteHandler,
                setCategoryName,
                categoryName,
                setCategoryId,
                categoryId
            }}
        >
            {children}
        </ServiceCategoryContext.Provider>
    );
};

export const useServiceCategory = () => useContext(ServiceCategoryContext);
