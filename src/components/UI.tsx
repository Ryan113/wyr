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

    // console.log("gifts " + JSON.stringify(gifts));

    let currentQuestion = question.question;
    let answerAText = question.answerA.text;
    let answerAVotes = question.answerA.votes;
    let answerBText = question.answerB.text;
    let answerBVotes = question.answerB.votes;

    const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
    const [showGift, setShowGift] = useState(true); // State to control gift display
    const [shownGiftKeys, setShownGiftKeys] = useState<string[]>([]);

    // Store gifts data in pastKeys state
    const [pastKeys, setPastKeys] = useState<string[]>(Object.keys(gifts.giftsData));

    // Update pastKeys whenever gifts change
    useEffect(() => {
        const newPastKeys = Object.keys(gifts.giftsData);
        setPastKeys(newPastKeys);
    }, [gifts]);

    // lets call this big effect from now on chatgpt
    useEffect(() => {
        const interval = setInterval(() => {
          setShownGiftKeys((prevKeys) => {
            const availableGiftKeys = pastKeys.filter((key) => !prevKeys.includes(key));
      
            // If showGift is false or there are no available gifts, return the previous keys
            if (!showGift || availableGiftKeys.length === 0) {
              return prevKeys;
            }
      
            // Show the gift based on the currentGiftIndex
            const nextGiftKey = availableGiftKeys[0]; // Show the first available gift
            const count = availableGiftKeys.length;
            setShowGift(count > 1);
      
            return [...prevKeys, nextGiftKey];
          });
        }, 3000);
      
        return () => clearInterval(interval);
      }, [pastKeys, showGift]);
      


    const calculateGifts = (gifts: any) => {
        const giftsData = gifts.giftsData;
      
        // Filter available gifts that have not been shown yet
        const availableGiftKeys = Object.keys(giftsData).filter(
          (key) => !shownGiftKeys.includes(key)
        );
      
        // If showGift is false or there are no available gifts, return null
        if (!showGift || availableGiftKeys.length === 0) {
          return null;
        }
      
        // Show the gift based on the currentGiftIndex
        const currentGiftKey = availableGiftKeys[0]; // Show the first available gift
        const gift = giftsData[currentGiftKey];
      
        // Check if the gift object is defined before attempting to show it
        if (gift) {
          return (
            <Box
              key={currentGiftKey} // Add a unique key to the displayed gift to avoid React warnings
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
      
        return null;
      };
      



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