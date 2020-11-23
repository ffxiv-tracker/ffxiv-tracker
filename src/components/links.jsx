import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      display: 'flex',
      height: '100%',
      alignItems: "center",
      justifyContent: "center",
      flexFlow: "row wrap",
    },
    card: {
    minWidth: '20%',
    minHeight: '100px',
    margin: '2%',
    backgroundColor: 'rgba(25, 25, 112, 0.5)',
    },
    cardContent: {
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
    //   padding: '10%',
      height: '100%',
    },
    cardText: {
        textAlign:'center',
        marginTop: '4%',
    }
  });

export default function SimpleCard() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.cardText} variant="h5" component="h2">
                        <a href="https://docs.google.com/spreadsheets/d/1mJqzs3HsbVCC7O51CSnfjc-Kb72qaRkhNJQIfjIUFPk/edit#gid=0" target="_blank" rel="noreferrer" >Wondrous Tales List</a>
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.cardText} variant="h5" component="h2">
                        <a href="https://docs.google.com/spreadsheets/d/1SHwqauem0KAw7pW0_qvajU9DF_HKsSUh9Mbt-dYTgJY/edit#gid=1147333649" target="_blank" rel="noreferrer" >Mount/Minion List</a>
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.cardText} variant="h5" component="h2">
                        <a href="https://www.digitaltrends.com/gaming/ffxiv-ocean-fishing-guide-mount-minion-spectral-current-tips/" target="_blank" rel="noreferrer" >Ocean Fishing</a>
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.cardText} variant="h5" component="h2">
                        <a href="https://www.ffxivhuntpaths.com/hw/" target="_blank" rel="noreferrer">Hunt Paths</a>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
