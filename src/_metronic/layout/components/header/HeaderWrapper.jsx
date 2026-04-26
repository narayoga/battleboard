/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React, { FC , useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { DefaultTitle } from './page-title/DefaultTitle'
import { HeaderUserMenu } from '../../../partials'

const user = JSON.parse(localStorage.getItem('auth') || '{}');

const UserMenu = () => {
  const userMenu = {
    borderRadius: '5px',
    margin: '10px 0'
  }
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className='d-flex align-items-stretch flex-shrink-0' style={userMenu}>
      <div className='cursor-pointer symbol symbol-30px symbol-md-40px d-flex px-5 py-2 userMenu'>
        <div className=' me-2 text-white'>
          <span className='fw-bold'>{user.nama}</span>
          <div>{user.username}</div>
        </div>
        <img className='' src={toAbsoluteUrl('/media/avatars/blank.png')} alt='metronic' />
      </div>
      <div className='logout cursor-pointer' onClick={logout}>
        <i className="icon-logout bi bi-box-arrow-right fs-2x"></i>
      </div>
    </div>
  )
}

const Search = () => {
  return (
    <div className='d-flex align-items-center position-relative mb-3 pt-3'>
      {/* <KTSVG
        path='/media/icons/duotune/general/gen021.svg'
        className='svg-icon-1 position-absolute ms-6'
      /> */}
      {/* <input
        type='text'
        className='form-control form-control-solid w-250px ps-14'
        placeholder='Search...'
      /> */}
      <div style={{width:"300px"}}></div>
    </div>
  )
}

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout()

  return (
    <div id='kt_header' style={{ backgroundColor: '#1b1b28' }}>
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'container d-flex align-items-stretch justify-content-between flex-lg-grow-1'
        )}
      >
        <>
          <div className='d-flex align-items-center'>
            <DefaultTitle />
            <h2 className='text-white'>Battle Room</h2>
          </div>
          <div className='d-flex align-items-center'>
            <Search />
          </div>
          <div className='d-flex align-items-center'>
            <UserMenu />
          </div>
        </>
      </div>
    </div>
  )
}


