import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link, NavLink } from 'react-router-dom';
import ProfileDropDown from './ProfileDropDown';
import useAuth from '../../hooks/useAuth';
import useGetUser from '../../hooks/useGetUser';
import LOGO from '../../../public/logo.png'

const Navbar = () => {
    const { user, loading } = useAuth();

    const { user: userInfo } = useGetUser();

    const role = userInfo?.data[0]?.role;

    const pages = <>
        {/* HR */}
        {
            role === "HR" &&
            <NavLink className="nav-link mr-16 " to="/dashboard">Dashboard</NavLink>
        }

        {/* Employee */}
        {
            // role === "Employee" &&
            role !== "HR" && role !== "Admin" && user &&
                <>
                    <NavLink className="nav-link mr-16 " to={`/paymentHistory/${user?.email}`}>Payment History</NavLink>
                    <NavLink className="nav-link mr-16 " to={`/workSheet/${user?.email}`}>Task Sheet</NavLink>
                    <NavLink className="nav-link mr-16 " to={`/addTask`}>Add Task</NavLink>
                </> 
        }

        {/* Admin */}
        {
            role === "Admin" &&
            <NavLink className="nav-link mr-16 " to="/employeeList">Employee List</NavLink>
        }
        <NavLink className="nav-link mr-16 " to="/contact">Contact us</NavLink>
    </>

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <AppBar
            sx={{ bgcolor: '#4037a0' }}
            className='h-[100px] flex items-center justify-center' position="static">
            <Container maxWidth="xl">
                <Toolbar className='' disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'montserrat',
                            fontWeight: 200,
                            color: '#292525',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to={'/'}><img className='shrink-0 min-w-[200px]' src={LOGO} alt="" /></Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {/* //!toggle */}
                        <div>
                            {['left'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button variant="text" onClick={toggleDrawer(anchor, true)}>
                                        <HiOutlineMenuAlt1 className='text-3xl text-[#8aca8a]' />
                                    </Button>
                                    <Drawer
                                        sx={{}}
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {/* {list(anchor)} */}
                                        <div className='flex flex-col bg-[#4037a0] h-full space-y-2 p-[15px]'>
                                            {pages}
                                        </div>
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </div>
                        {/* //!toggle */}
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'montserrat',
                            fontWeight: 200,
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/"><img src="logo.png" alt="" /></Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {
                            !user && !loading ?
                                <button className='btn whitespace-nowrap bg-[#e9bafb] font-semibold text-xl p-2 rounded-xl'><Link to="/login">Log in</Link></button>
                                :
                                <ProfileDropDown
                                    user={user}
                                ></ProfileDropDown>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;