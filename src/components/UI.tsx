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
                            width: '90%',
                            height: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >

                    <Box
                        component="div"
                        sx={{
                            width: '90%',
                            height: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column', // Set flexDirection to 'column'
                            alignItems: 'center',
                            margin: '40px', // Add padding to baby box 1
                            marginTop: '-100px', // Move baby box 1 up by 20px
                        }}
                    >
                        {/* baby text 1 */}
                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            Oppenheimer
                        </Typography>
                        {/* baby text 2 */}
                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            Votes: 120
                        </Typography>
                    </Box>


                    <Box
                        component="div"
                        sx={{
                            width: '90%',
                            height: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column', // Set flexDirection to 'column'
                            alignItems: 'center',
                            margin: '40px', // Add padding to baby box 1
                            marginTop: '-100px', // Move baby box 1 up by 20px
                        }}
                    >

                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            Barbie
                        </Typography>

                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            Votes: 765
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
                        backgroundColor: 'green', // Replace this with your desired background color or image
                    }}
                >
                    {/* Content for the third box */}
                    {/* <UIScreen /> */}
                </Box>
            </Grid>
        </Grid>
    )
}