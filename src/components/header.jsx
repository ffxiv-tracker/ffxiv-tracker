import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: 'white',
        '&:focus': {
            backgroundColor: '#7e57c2',
        },
        '&:hover': {
            backgroundColor: '#b39ddb',
        },
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        backgroundColor: '#fafafa',
    },
    topBar: {
        backgroundColor: '#7e57c2',
    },
    login: {
        '&:focus': {
            backgroundColor: '#7e57c2',
        },
        '&:hover': {
            backgroundColor: '#b39ddb',
        },
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, left: open });
    };

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <Link className="menuLinks" to="/">
                    <ListItem button>
                        <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                </Link>
                <Link className="menuLinks" to="/links">
                    <ListItem button>
                        <ListItemIcon>{<LinkIcon />}</ListItemIcon>
                        <ListItemText primary={"Links"} />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.topBar} position="static">
                <Toolbar>
                    <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="white-text" to="/">
                        FFXIV Tracker
                        </Link>
                    </Typography>
                    <Button className={classes.login} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                classes={{paper: classes.drawer}}
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list("left")}
            </SwipeableDrawer>
        </div>
    );
}
