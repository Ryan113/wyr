import React from "react";
import { connect } from "react-redux";
import { Question, getQuestion, getQuestions, getGiftsData, updateVotes, Votes } from "../actions";
import { StoreState } from "../reducers";
import { Box } from '@mui/material';
import Typography from "@mui/material/Typography";
import cat from '../assets/cat.png';
import op from '../assets/op.png';
import AspectRatio from '@mui/joy/AspectRatio';
import UIScreen from "./UI";


interface AppProps {
    questions: Question[],
    question: Question
    getQuestion: (id: number) => void,
    getQuestions: () => void,
    getGiftsData: () => void,
    updateVotes: (votes: Votes) => void;
}

interface AppState {
    questionID: number;
}

class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            questionID: 1
        };
    }

    componentDidMount() {
        this.props.getQuestions();
        this.props.getQuestion(1);
        this.props.getGiftsData();
      }

    onButtonClick = (): void => {
        const nextQuestionID = this.state.questionID + 1;
        this.props.getQuestion(nextQuestionID); // Call the action with the updated ID
        this.setState({ questionID: nextQuestionID });
        console.log('hahahahaha ' + JSON.stringify(this.props.question['question']));
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

// Add the WebSocket connection here
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('WebSocket connected');
};

ws.onmessage = (event) => {
//   const data = JSON.parse(event.data);
  console.log("does this work: " + event.data);
  // Here, dispatch your Redux action to update the state with the new data
  // For example:
  // this.props.updateGiftsData(data);
};