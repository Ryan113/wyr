import React from "react";
import { connect } from "react-redux";
import { Question, getQuestion, getQuestions } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
    questions: Question[],
    question: Question
    getQuestion: (id: number) => void, 
    getQuestions: () => void,
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
    }

    onButtonClick = (): void => {
        const nextQuestionID = this.state.questionID + 1;
        this.props.getQuestion(nextQuestionID); // Call the action with the updated ID
        this.setState({ questionID: nextQuestionID });
        console.log('hahahahaha ' +  JSON.stringify(this.props.question['question']));
    };

    render() {
        return (
            <div>
                <button onClick={this.onButtonClick}>Fetch Next</button>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState): { questions: Question[]; question: Question } => {
    return {
        questions: state.questions,
        question: state.question
    };
};

export const App = connect(
    mapStateToProps,
    { getQuestion, getQuestions }
)(_App);