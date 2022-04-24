import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import {useFooterStyles} from "./HomeStyles";

const footers = [
    {
        title: 'For students',
        description: [
            {text: 'Accommodation for students', url: 'https://bntu.by/en/applicanthostels'},
            {text: 'For students', url: 'https://bntu.by/en/students'},
            {text: 'Education', url: 'https://bntu.by/en/university'},
            {text: 'Services', url: 'https://bntu.by/all-services'}
        ],
    },
    {
        // https://i.bntu.by/#specialities
        title: 'For matriculant',
        description: [
            {text: 'Specialities', url: 'https://i.bntu.by/#specialities'},
            {text: 'Magistracy', url: 'http://priem.bntu.by/ru/pk/magistracy/'},
            {text: 'Admission commission', url: 'http://priem.bntu.by/ru/pk/'},
        ],
    },
    {
        title: 'Resources',
        description: [{text: 'Resource', url: "#"}, {text:'Resource name', url: "#"},  {text:'Another resource', url: "#"}, {text: 'Final resource', url: "#"}],
    }
];


export default function HomeFooter() {
    const classes = useFooterStyles();

    return <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer, index) => (
                <Grid key={index} item xs={6} sm={3}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        {footer.title}
                    </Typography>
                    <ul>
                        {footer.description.map((item, index) => (
                            <li key={index}>
                                <Link key={index} href={item.url} variant="subtitle1" color="textSecondary">
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Grid>
            ))}
        </Grid>
    </Container>

}



