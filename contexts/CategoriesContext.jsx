import { createContext, useContext, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { get, post, put, delete as deleteRequest } from "@/api/apiService";
import { router } from "expo-router";

const CategoriesContext = createContext(null);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [categoryNameEn, setCategoryNameEn] = useState("");
  const [categoryNameLocal, setCategoryNameLocal] = useState("");

  const questionHandler = () => {
    setIsConfirmation(true);
    setMessage(localization.CATEGORY.question);
  };

  const { localization } = useLocalization();

  // 1. Preuzimanje svih kategorija
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
  const deleteHandler = async (id) => {
    setIsConfirmation(false);
    setIsLoading("delete");
    setError(null);
    try {
      const response = await deleteRequest(`categories/${id}`);
      if (response.status === 201) {
        setIsMessage(true);
        setMessage(localization.CATEGORY.deleteMsg);
        await getAllCategories();
        return true;
      }
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(null);
    }
  };

  const addCategoryToServiceHandler = async (id, category) => {
    setIsLoading("put");
    setError(null);

    console.log("id", id)
    console.log("category", category)
    try {
      const response = await put(`admin/services/${id}/category`, { category: category?._id });
      console.log("addCategoryToServiceHandler", response);
      if (response.status === 201) {
        setIsMessage(true);
        setMessage(localization.CATEGORY.addCategoryToService)
      }
      // setCategories(response.data);
    } catch (err) {
      console.error("Greška pri povlačenju kategorija:", err);
      setError("Greška pri učitavanju kategorija.");
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
  // 3. Confirm handler za zatvaranje poruka
  const confirmHandler = () => {
    setIsMessage(false);
    setMessage("");
    setError(null);
    router.dismiss(1);
    router.back();
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        isLoading,
        isMessage,
        setIsMessage,
        message,
        setMessage,
        error,
        setError,
        getAllCategories,
        submitHandler,
        confirmHandler,
        deleteHandler,
        isConfirmation,
        setIsConfirmation,
        questionHandler,
        addCategoryToServiceHandler,
        categoryNameEn,
        setCategoryNameEn,
        categoryNameLocal,
        setCategoryNameLocal,
        getCategoryById,
        setIsLoading
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

// Custom Hook za lakše korišćenje konteksta u komponentama
export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategories mora biti upotrebljen unutar CategoriesProvider-a",
    );
  }
  return context;
};
