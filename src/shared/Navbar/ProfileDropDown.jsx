import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import { AuthContext } from "../../providers/AuthProvider";
import { BounceLoader } from 'react-spinners';

const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
]

const ProfileDropDown = ({ user, }) => {
    const { logOut, loading } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="top-16 w-56 text-right">
            <Menu as="div" className="relative inline-block text-left z-50">
                <div>
                    <Menu.Button>
                        {
                            !loading ?
                                <Avatar src={user.photoURL} size="lg" variant="soft" />
                                :
                                <BounceLoader
                                    color={'#fff'}
                                    loading={loading}
                                    size={50}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                        }
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>

                                <div
                                    className={` text-gray-900
                                            group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="#5bb286" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    {
                                        !loading &&
                                        <p>{user.displayName}</p>
                                    }
                                </div>

                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    className={` text-gray-900
                                           group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5bb286" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                    </svg>
                                    {
                                        !loading &&
                                        <p>{user.email}</p>
                                    }
                                </div>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogOut}
                                        className={`${active ? 'bg-[#5bb286] text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5                                         className={`${active ? 'bg-[#5bb286] text-white' : 'text-gray-900'
                                            " aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>

                                        ) : (

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5                                         className={`${active ? 'bg-[#5bb286] text-white' : 'text-gray-900'
                                            " aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>

                                        )}
                                        Log Out
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default ProfileDropDown;