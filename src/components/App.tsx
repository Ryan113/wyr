import React from "react";
import { connect } from "react-redux";
import { Question, getQuestion, getQuestions } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
    questions: Question[],
    getQuestion: (id: number) => void, // Modify the type to accept the ID as an argument
    getQuestions: () => void,
    targetQuestion: Question | null; // Add targetQuestion property for the specific question
}

interface AppState {
    qustionID: number;
  }

class _App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            qustionID: 0
          };
    }

    componentDidMount() {
        this.props.getQuestions();
        // Fetch the specific question with ID 1 when the component mounts
        // this.props.getQuestion(4);
    }

    onButtonClick = (): void => {
        this.setState((prevState) => ({ qustionID: prevState.qustionID + 1 }), () => {
          // After updating the count in the state, call getQuestion with the updated count
          this.props.getQuestion(this.state.qustionID);
          console.log('count: ' + this.state.qustionID)
        });
      };

    renderQuestion(): JSX.Element[] {
        return this.props.questions.map((question: Question) => {
            return (
                <div>
                    {question.question}
                </div>
            );
        });
    }

    // renderQuestion(): JSX.Element {
    //         return (
    //             <div>
    //                 {this.props.getQuestion(1)}
    //             </div>
    //         );
    // }

    render() {
        const { targetQuestion } = this.props;

        return (
            <div>
                <button onClick={this.onButtonClick}>Fetch</button>
                {/* { this.renderQuestion() } */}
                {targetQuestion ? (
                    // Display the specific question if it exists
                    <div>{targetQuestion.question}</div>
                ) : (
                    // Show a loading or error message when the question is not available
                    <div>Loading...</div>
                )}
            </div>
        )
    }
}

// const mapStateToProps = ({ questions }: StoreState): { questions: Question[] } => {
//     return { questions };
// }

const mapStateToProps = (state: StoreState): { questions: Question[]; targetQuestion: Question | null } => {
    return {
        questions: state.questions,
        targetQuestion: state.questions.find((question) => question.id) || null,
    };
};

export const App = connect(
    mapStateToProps,
    { getQuestion, getQuestions }
)(_App);