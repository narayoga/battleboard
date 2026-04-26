import { PageTitle } from '../../_metronic/layout/core'
import React, { useEffect, useState } from 'react'
import { ProfileMain } from '../modules/player/profileMain'
import axios from 'axios'

export const AppsContext = React.createContext({})

const ProfileWrapper = () => {
    const token = localStorage.getItem('token')
    const input = JSON.parse(localStorage.getItem('input'))
    return (
        <AppsContext.Provider value={{input, token }}>
            <ProfileMain />
        </AppsContext.Provider>
    )
}

export default ProfileWrapper