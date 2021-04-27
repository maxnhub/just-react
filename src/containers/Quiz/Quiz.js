import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Какого цвета твои мысли?',
                rightAnswerId: 4,
                id: 1,
                answers: [
                    {text: 'Непроглядной густой тьмы', id: 1},
                    {text: 'Бирюзовых бриллиантовых лилий', id: 2},
                    {text: 'Светлого скорого будущего', id: 3},
                    {text: 'Желтой пламенной эйфории', id: 4}
                ]
            },
            {
                question: 'Как подчинить энергию?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: 'Погладить высоковольтного щенка', id: 1},
                    {text: 'Познать дзен в монастырях Тибета', id: 2},
                    {text: 'Съесть мистическую четырехмерную шаверму', id: 3},
                    {text: 'Лечь и лежать по направлению к развитию человечества', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {

        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') {
                return
            }
        }
        // данная проверка необходима для того, чтобы при многократном клике на правильный ответ тест не заканчивался

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId ) {

            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h2>Ответьте на все вопросы</h2>
                    {
                        this.state.isFinished ?
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                            /> :
                            <ActiveQuiz>
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            </ActiveQuiz>
                    }

                </div>
            </div>
        )
    }
}

export default Quiz