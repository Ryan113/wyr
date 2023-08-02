import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { getGiftsData, updateVotes, deleteGiftFromData } from "../actions";
import { StoreState } from "../reducers";
import { Box } from '@mui/material';
import cat from '../assets/cat.png';
import board from '../assets/vote_board.png';
import four from '../assets/4.png';
import three from '../assets/3x.png';
import { Gifts, Question, Votes, Gift } from "../actions";
import "./voteBox.css";
import rose from "../assets/rose.png"
import fire from "../assets/fire.png"
import cap from "../assets/cap.png"
import chili from "../assets/chili.png"
import doughnut from "../assets/doughnut.png"
import choco_strawberries from "../assets/choco_strawberries.png"
import hat_mustache from "../assets/hat_mustache.png"
import panda from "../assets/panda.png"

interface Props {
    question: Question; // Replace 'Question' with the actual type for your 'question'
    gifts: Gifts; // Replace 'Gifts' with the actual type for your 'gifts' data
    updateVotes: (votes: any) => void; // Correct the type for updateVotes
    deleteGiftFromData: (key: string) => void;
}

// Define the type for the giftsData object
type GiftsData = {
    [key: string]: Gift;
};

const _UIScreen: React.FC<Props> = ({ question, gifts, updateVotes, deleteGiftFromData }) => {

    // console.log("gifts " + JSON.stringify(gifts));

    let currentQuestion = question.question;
    let answerAText = question.answerA.text;
    let answerAVotes = question.answerA.votes;
    let answerBText = question.answerB.text;
    let answerBVotes = question.answerB.votes;

    const [showGift, setShowGift] = useState(true); // State to control gift display
    const [shownGiftKeys, setShownGiftKeys] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [userVote, setUserVote] = useState<number>(0);
    const [voteA, setVoteA] = useState<number>(0);
    const [voteB, setVoteB] = useState<number>(0);
    const [isIncrementingA, setIsIncrementingA] = useState<boolean>(false);
    const [isIncrementingB, setIsIncrementingB] = useState<boolean>(false);
    const [voteABackgroundColor, setVoteABackgroundColor] = useState<string>('rgba(255, 255, 255, 0.8)');
    const [voteBBackgroundColor, setVoteBBackgroundColor] = useState<string>('rgba(255, 255, 255, 0.8)');



    // Store gifts data in pastKeys state
    const [pastKeys, setPastKeys] = useState<string[]>(Object.keys(gifts.giftsData));

    // rose = 1
    // fire = 5
    // Doughnut = 30
    // Cap 99

    // chili = 1
    // panda = 5
    // choco strawberries = 30
    // hat and mustache = 99

    function smoothIncrement(setVoteFunction: (value: number) => void, incrementBy: number) {
        const delay = 100; // Delay between each vote increment (in milliseconds)
        const totalIncrements = incrementBy; // Total number of increments for the smooth effect
        let currentIncrement = 0;

        // Set the corresponding incrementing state variable to true when starting the increment
        if (setVoteFunction === setVoteA) {
            setIsIncrementingA(true);
            setIsIncrementingB(false);
        } else if (setVoteFunction === setVoteB) {
            setIsIncrementingB(true);
            setIsIncrementingA(false);
        }

        function increment() {
            //@ts-ignore
            setVoteFunction((prevVote) => prevVote + incrementBy / totalIncrements);
            currentIncrement++;

            if (currentIncrement < totalIncrements) {
                setTimeout(increment, delay);
            }
        }
        increment();
    }

    // dont forget to fix how the gifts are coming through. If someone ads 12 fires then 13 fires
    // it will add not differentiate and add 12 extra

    function giftToVoteConverter(giftName: string, giftCount: number) {
        switch (giftName) {
            case "Rose":
                smoothIncrement(setVoteA, 1 * giftCount);
                break;
            case "Fire":
                smoothIncrement(setVoteA, 5 * giftCount);
                break;
            case "Doughnut":
                smoothIncrement(setVoteA, 30 * giftCount);
                break;
            case "Cap":
                smoothIncrement(setVoteA, 99 * giftCount);
                break;
            case "Chili":
                smoothIncrement(setVoteB, 1 * giftCount);
                break;
            case "Panda":
                smoothIncrement(setVoteB, 5 * giftCount);
                break;
            case "Choco Strawberries":
                smoothIncrement(setVoteB, 30 * giftCount);
                break;
            case "Hat and Mustache":
                smoothIncrement(setVoteB, 99 * giftCount);
                break;
            default:
                break;
        }
    }

    function giftToImageConverter(giftName: string) {
        const height: string = "120px";
        const width: string = "120px";
        const marginBottom: string = "-30px";
        switch (giftName) {
            case "Rose":
                return <img src={rose} alt="Fire" height={height} width={width} style={{ marginBottom }} />
            case "Fire":
                return <img src={fire} alt="Fire" height={height} width={width} style={{ marginBottom }} />
            case "Doughnut":
                return <img src={doughnut} alt="doughnut" height={height} width={width} style={{ marginBottom }} />
            case "Cap":
                return <img src={cap} alt="cap" height={height} width={width} style={{ marginBottom }} />

            case "Chili":
                console.log(giftName)
                return <img src={chili} alt="chili" height={height} width={width} style={{ marginBottom }} />

            case "Panda":
                return <img src={panda} alt="panda" height={height} width={width} style={{ marginBottom }} />

            case "Choco Strawberries":
                return <img src={choco_strawberries} alt="choco_straberries" height={height} width={width} style={{ marginBottom }} />

            case "Hat and Mustache":
                return <img src={hat_mustache} alt="hat_mustache" height={height} width={width} style={{ marginBottom }} />

            default:

        }
    }

    // Reset vote counts to 0 whenever the question prop changes
    useEffect(() => {
        setVoteA(0);
        setVoteB(0);
    }, [question]);


    // Update pastKeys whenever gifts change
    useEffect(() => {
        const newPastKeys = Object.keys(gifts.giftsData);
        setPastKeys(newPastKeys);
    }, [gifts]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShownGiftKeys((prevKeys) => {

                // availableGiftKeys are keys that are new an are not in prevKeys
                const availableGiftKeys = pastKeys.filter((key) => !prevKeys.includes(key));
                // console.log('available keys' + availableGiftKeys.length);

                // if a gift is not showing this is most likely the issue
                // this shit is broken
                availableGiftKeys.length > 0 ? setShowGift(true) : setShowGift(false);

                // If showGift is false or there are no available gifts, return the previous keys
                if (!showGift || availableGiftKeys.length === 0) {
                    console.log("is this being hit?")
                    return prevKeys;
                }

                // Show the gift based on the currentGiftIndex
                const nextGiftKey = availableGiftKeys[0]; // Show the first available gift
                const count = availableGiftKeys.length;
                setShowGift(count > 1);
                
                // If you want to change when the votes are updated itll have something to do with here
                const foundKey = Object.keys(gifts.giftsData).find(key => key === nextGiftKey);
                if (foundKey) {
                    // Typescript is getting annoying
                    // @ts-ignore
                    const giftName = gifts.giftsData[foundKey].giftName;
                    // @ts-ignore
                    const giftCount = gifts.giftsData[foundKey].repeatCount;
                    giftToVoteConverter(giftName, giftCount)
                    console.log('giftName' + giftName);
                }

                setAnswer('answerA')
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
                    <Typography sx={{ color: "black", fontWeight: 'bold', fontSize: 65, textAlign: "center" }}>
                        {gift.uniqueId} votes {giftToImageConverter(gift.giftName)} x {gift.repeatCount}
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
                            height: '400px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '-100px', // Move the box up by 100 pixels
                        }}
                    >

                        <Typography sx={{ color: "black", fontWeight: 'bold', fontSize: 74, textAlign: 'center' }}>

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
                            height: '55%',
                            backgroundColor: isIncrementingA ? 'rgba(144, 238, 144, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column', // Set flexDirection to 'column'
                            alignItems: 'center',
                            margin: '40px', // Add padding to baby box 1
                            marginTop: '-130px', // Move baby box 1 up by 20px
                        }}
                    >
                        {/* baby text 1 */}
                        <Typography sx={{ color: "black", fontSize: 64, fontWeight: 'bold', textAlign: 'center' }}>
                            {answerAText}
                        </Typography>

                        <Typography
                            sx={{
                                color: "black",
                                fontSize: 64,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                            Votes: {voteA}
                        </Typography>
                    </Box>


                    <Box
                        component="div"
                        sx={{
                            width: '90%',
                            height: '55%',
                            backgroundColor: isIncrementingB ? 'rgba(144, 238, 144, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column', // Set flexDirection to 'column'
                            alignItems: 'center',
                            margin: '40px', // Add padding to baby box 1
                            marginTop: '-130px', // Move baby box 1 up by 20px
                        }}
                    >

                        <Typography sx={{ color: "black", fontSize: 64, fontWeight: 'bold', textAlign: 'center' }}>
                            {answerBText}
                        </Typography>

                        <Typography sx={{ color: "black", fontSize: 64, textAlign: 'center', fontWeight: 'bold', }}>
                            Votes: {voteB}
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
                    {calculateGifts(gifts)}
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
                            height: '160%',
                            backgroundImage: `url(${four})`,
                            backgroundSize: '750px 600px', // Set the background image size to cover the container
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Replace this with your desired background color or image
                            borderRadius: '40px', // Adjust the value to control the roundness of the edges
                            border: '12px solid black', // Add a black solid border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '-300px', // Move the main box up by 300px
                            backgroundPosition: 'center 40px',
                        }}
                    >
                        {/* First child box with light blue background */}
                        <Box
                            sx={{
                                flex: '1 1 50%', // Take up 50% of the available space
                                height: '100%', // Take up 100% of the height of the parent box
                                borderRadius: '20px', // Adjust the value to control the roundness of the edges
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 55,
                                    textAlign: 'center',
                                }}
                            >
                                {answerAText}
                            </Typography>
                        </Box>

                        {/* Second child box with light red background */}
                        <Box
                            sx={{
                                flex: '1 1 50%', // Take up 50% of the available space
                                height: '100%', // Take up 100% of the height of the parent box
                                borderRadius: '20px', // Adjust the value to control the roundness of the edges
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'black',
                                    fontSize: 55,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                {answerBText}
                            </Typography>
                        </Box>
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