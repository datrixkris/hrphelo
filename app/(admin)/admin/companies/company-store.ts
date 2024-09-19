import { create } from "zustand"
import { api } from "../../../axiosApi/api"
import { Company } from "./types"

interface CompanyStore {
    companies: Company[];
    loading?: boolean;
    error?: string | null;
    fetchCompanies: () => Promise<void>;
    OnboardCompany: (data: Company) => Promise<void>;
    fetchCompanyById: (id: number) => Promise<Company>;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
    // State
    companies: [],
    loading: false,
    error: null,

    // Actions
    // fetching all companies
    fetchCompanies: async() => {
        set({loading: true, error: null});

        try {
            const response = (await api.get('/v1/companies')).data
            set(() => ({companies: response, loading: false}))
        } catch (err) {
            console.error(err)
            set({error: 'Failed to fetch data', loading: false})
        }
    },

    // fetch a single company
    fetchCompanyById: async(id: number) => {
        set({loading: true, error: null});
        
        try {
            const response = (await api.get(`/v1/companies/${id}`)).data
            set(() => ({loading: false}))
            return response
        } catch (err) {
            console.error(err)
            set({error: 'Failed to fetch data', loading: false})
        }
    },

    // add or onboard a company
    OnboardCompany: async(data) => {
        set({loading: true, error: null});

        try {
            const response = await api.post('/v1/companies', data)
            set(() => ({loading: false}))
            console.log(response.data)
        } catch (err) {
            console.log(err)
            set({error: 'Failed to post data', loading: false})
        }
    }
}))