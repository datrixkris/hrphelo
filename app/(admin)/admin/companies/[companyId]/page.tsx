"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCompanyStore } from '@/app/stores/company-store'
import { Company } from '../types'
// import Button from '@/app/components/Button';

const Page = () => {
    const params = useParams()
    const fetchCompanyById = useCompanyStore((state) => state.fetchCompanyById)
    const loading = useCompanyStore((state) => state.loading)
    const [companyDetails, setCompanyDetails] = useState<Company | null>(null)
    
    useEffect(() => {
        if(params.companyId) {
            const fetchData = async () => {
                try {
                    console.log(params.companyId)
                    const results = await fetchCompanyById(Number(params.companyId))
                    console.log(results)
                    setCompanyDetails(results)
                } catch (err) {
                    console.log(err)
                }
            }

            fetchData()
        }
    }, [])

    if(loading) {
        return <div>Fetching company details...</div>
    }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">{ companyDetails?.name }</h2>
      </div>
    </div>
  )
}

export default Page
