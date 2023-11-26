import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link, NavLink } from 'react-router-dom';
import ProfileDropDown from './ProfileDropDown';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';


// const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const { user, loading } = useContext(AuthContext)
    //TODO
    // let user = false;
    //TODO

    const pages = <>
        <NavLink className="nav-link mr-16" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link mr-16" to={`/paymentHistory/${user?.email}`}>Payment History</NavLink>
        <NavLink className="nav-link mr-16" to={`/workSheet/${user?.email}`}>Work Sheet</NavLink>
        <NavLink className="nav-link mr-16" to="/contactUs">Contact us</NavLink>
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
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar
            color="success" className='h-[100px] bg-black flex items-center justify-center' position="static">
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
                            fontFamily: 'monospace',
                            fontWeight: 700,

                            color: '#292525',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to={'/'}>Employee Management</Link>
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
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
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
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Employee Management
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        {
                            !user && !loading ?
                                <Link to="/login">Log in</Link>
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