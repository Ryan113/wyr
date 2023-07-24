import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from '@mui/material';
import cat from '../assets/cat.png';


export default function UIScreen() {
    return (
        <Grid container spacing={2} sx={{ height: '100vh' }}>
            <Grid item xs={12}>
                <Box
                    component="div"
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            width: '70%',
                            height: '50%',
                            backgroundColor: 'white', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ color: "black", fontSize: 74, textAlign: 'center' }}>
                            Oppenheimer or Barbie?
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box
                    component="div"
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'blue', // Replace this with your desired background color or image
                    }}
                >
                    {/* Content for the second box */}
                    {/* <UIScreen /> */}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box
                    component="div"
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        // backgroundColor: 'green', // Replace this with your desired background color or image
                    }}
                >
                    {/* Content for the third box */}
                    {/* <UIScreen /> */}
                </Box>
            </Grid>
        </Grid>
    )
}