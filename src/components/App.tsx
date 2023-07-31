import React from "react";
import { connect } from "react-redux";
import { Question, getQuestion, getQuestions, getGiftsData, updateVotes, Votes, Gifts } from "../actions";
import { StoreState } from "../reducers";
import { Box } from '@mui/material';
import Typography from "@mui/material/Typography";
import cat from '../assets/cat.png';
import barbie from '../assets/barbie.png';
import op from '../assets/op.png';
import AspectRatio from '@mui/joy/AspectRatio';
import { UIScreen } from "./UI";
import ws from "../websocket"; // Import the WebSocket from the separate module



interface AppProps {
    questions: Question[],
    question: Question
    gifts: Gifts,
    getQuestion: (id: number) => void,
    getQuestions: () => void,
    getGiftsData: (data: any) => void;
    updateVotes: (votes: Votes) => void;
    // intervalId: NodeJS.Timeout | null; // Add the intervalId property to the AppState interface
}

interface AppState {
    questionID: number;
    intervalId: NodeJS.Timeout | null;
}

class _App extends React.Component<AppProps, AppState> {
    private intervalId: NodeJS.Timeout | null = null;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            questionID: 1,
            intervalId: null,
        };
    }

    componentDidMount() {
        this.props.getQuestions();
        this.props.getQuestion(this.state.questionID);

        // Set an interval to update the question every minute (60000 milliseconds)
        this.intervalId = setInterval(this.updateQuestion, 600000);

        ws.onmessage = (event) => {
            console.log("WebSocket message received: " + event.data);

            try {
                const data = JSON.parse(event.data); // Parse the JSON string into an object
                this.props.getGiftsData(data); // Dispatch the action with the parsed data
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };
    }

    componentWillUnmount() {
        // Clean up the interval when the component unmounts
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    updateQuestion = (): void => {
        // Increment the questionID and reset it if it exceeds the number of questions
        //@ts-ignore
        const nextQuestionID = (this.state.questionID % this.props.questions.questions.length) + 1;
        console.log("question index: " + nextQuestionID)
        console.log("state question ID: " + this.state.questionID)
        console.log("next question ID : " + nextQuestionID)
        this.props.getQuestion(nextQuestionID);
        this.setState({ questionID: nextQuestionID });
    };

    render() {
        return (
            <AspectRatio
                ratio="9/16"
            >
                <Box
                    component="div"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${cat})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <UIScreen question={this.props.question} />
                </Box>
            </AspectRatio>
        )
    }
}

const mapStateToProps = (state: StoreState): { questions: Question[]; question: any; gifts: any } => {
    return {
        questions: state.questions,
        question: state.question['question'],
        gifts: state.gifts
    };
};

export const App = connect(
    mapStateToProps,
    { getQuestion, getQuestions, getGiftsData, updateVotes }
)(_App);