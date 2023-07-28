import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { getGiftsData, updateVotes, deleteGiftFromData } from "../actions";
import { StoreState } from "../reducers";
import { Box } from '@mui/material';
import cat from '../assets/cat.png';
import { Gifts, Question, Votes } from "../actions";


interface Props {
    question: Question; // Replace 'Question' with the actual type for your 'question'
    gifts: Gifts; // Replace 'Gifts' with the actual type for your 'gifts' data
    updateVotes: (votes: Votes) => void; // Correct the type for updateVotes
    deleteGiftFromData: (key: string) => void;
}

const _UIScreen: React.FC<Props> = ({ question, gifts, updateVotes, deleteGiftFromData }) => {

    console.log("gifts " + JSON.stringify(gifts));

    let currentQuestion = question.question;
    let answerAText = question.answerA.text;
    let answerAVotes = question.answerA.votes;
    let answerBText = question.answerB.text;
    let answerBVotes = question.answerB.votes;

    const pastKeys: string[] = []

    const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
    const [showGift, setShowGift] = useState(true); // State to control gift display

    // Add the useEffect hook to update the displayed gift index every 3 seconds
    useEffect(() => {
        // If there's only one gift, show it for 3 seconds and then hide it
        if (pastKeys.length === 1) {
            setTimeout(() => setShowGift(false), 3000);
        } else {
            const interval = setInterval(() => {
                setCurrentGiftIndex((prevIndex) => (prevIndex + 1) % pastKeys.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [pastKeys.length]);

    const calculateGifts = (gifts: any) => {
        const giftsData = gifts.giftsData;
        const pastKeys: string[] = Object.keys(giftsData);
      
        // If there's only one gift, directly show it without cycling through
        if (pastKeys.length === 1) {
          const gift = giftsData[pastKeys[0]];
      
          // Check if the gift object is defined before accessing its properties
          if (gift) {
            return (
              <Box
                component="div"
                sx={{
                  width: "90%",
                  height: "80%",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "40px",
                  border: "12px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-600px",
                }}
              >
                <Typography sx={{ color: "black", fontSize: 60, textAlign: "center" }}>
                  {gift.uniqueId}: votes {gift.giftId} x{gift.repeatCount}
                </Typography>
              </Box>
            );
          }
        }
      
        // If there are multiple gifts, show them one after another based on currentGiftIndex
        const currentGiftKey = pastKeys[currentGiftIndex];
        const gift = giftsData[currentGiftKey];
      
        // Check if the current gift object is defined before accessing its properties
        if (gift) {
          return (
            <Box
              component="div"
              sx={{
                width: "90%",
                height: "80%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "40px",
                border: "12px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-600px",
              }}
            >
              <Typography sx={{ color: "black", fontSize: 60, textAlign: "center" }}>
                {gift.uniqueId}: votes {gift.giftId} x{gift.repeatCount}
              </Typography>
            </Box>
          );
        }
      
        // Return null if the current gift is undefined to avoid rendering anything
        return null;
      };
      
      

    // console.log(calculateGifts(gifts));

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
                            height: '70%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >

                        <Typography sx={{ color: "black", fontSize: 74, textAlign: 'center' }}>

                            {currentQuestion}
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
                            marginTop: '-50px', // Move baby box 1 up by 20px
                        }}
                    >
                        {/* baby text 1 */}
                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            {answerAText}
                        </Typography>

                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            Votes: {answerAVotes}
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
                            marginTop: '-50px', // Move baby box 1 up by 20px
                        }}
                    >

                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            {answerBText}
                        </Typography>

                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center' }}>
                            Votes: {answerBVotes}
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'blue'
                    }}
                >
                    {/* { working on hacing gifts appear every 3 seconds} */}
                    {calculateGifts(gifts)}
                    {/* <Box
                        component="div"
                        sx={{
                            width: '90%',
                            height: '80%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '-600px', // Move baby box 1 up by 20px
                        }}
                    >
                        <Typography sx={{ color: "black", fontSize: 60, textAlign: 'center' }}>
                            Dashmcash: votes rose x 78
                        </Typography>
                    </Box> */}
                </Box>
            </Grid>

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
                        // backgroundColor: 'blue'
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            width: '90%',
                            height: '120%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '-300px', // Move baby box 1 up by 20px
                        }}
                    >
                        <Typography sx={{ color: "black", fontSize: 74, textAlign: 'center' }}>
                            Image of vote values
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state: StoreState): { gifts: any } => {
    return {
        gifts: state.gifts
    };
};

export const UIScreen = connect(
    mapStateToProps,
    { updateVotes, deleteGiftFromData }
)(_UIScreen);