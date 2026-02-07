import { get } from "@/api/apiService";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalization } from "./LocalizationContext";

const CompanyContext = createContext(null);
export const useCompany = () => {
    return useContext(CompanyContext);
};
export const CompanyProvider = ({ children }) => {

    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { localization } = useLocalization();

    const getCompany = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await get("/company");
            setCompany(response);
            setIsLoading(false);
        } catch (err) {
            setError(localization.COMPANY.error);
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        getCompany();
    }, []);


    return (
        <CompanyContext.Provider value={{ company, getCompany, isLoading, error }}>
            {children}
        </CompanyContext.Provider>
    );
};

export default CompanyContext;
