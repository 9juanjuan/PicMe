import React from 'react';
import styled from 'styled-components';
import logo from '../img/picme-logo.png';
import AnswerSubmit from './AnswerSubmit'
import ReactCountdownClock from 'react-countdown-clock';
import '../css/Canvas.css';
import Confetti from 'react-confetti';
import { Redirect } from 'react-router-dom';
import { SketchField, Tools } from 'react-sketch';

export default class Canvas extends React.Component {
    targetElement = null;
    constructor(props) {
        super(props);
        this.state = {
            saveableCanvas: '',
            userAnswer: '',
            drawingData: '',
            userAnswers: '',
            submittedAnswer: false,
            playerNumber: '',
            activePlayer: 0,
            currentPoints: 0,
            pointsArray: '',
            prompts: ['talking bird', 'bird dog', 'flying panda', 'chicken taco', 'wizard on a pole', 'Seil on a seal', 'airplane pencil', 'aliens telling secrets', 'intelligent soil', 'fighting noodles', 'fake moon landing', 'dog on a boat', 'pitcher of nachos', 'missed high five', 'shakey knees', 'dinosaur baby', 'radishmouse', 'harambae', 'owl in pants', 'a lunch tray on fire', 'banana big toe', 'cat fart', 'lazy zebra', 'crying hyena', 'jake from state farm', 'tony the tiger eating the fruit loops bird', 'running turtle', 'm&m rapping', 'a packet of eminems', 'couch on fire', 'embarassing photo of spongebob', 'christmas tree during halloween', 'crying dinosaur', 'pug on a treadmill', 'pirate in a hammock', 'person with donuts for eyes', 'cowboy on a polar bear', 'flamingo doing ballet', 'coal under pressure', 'shakesbeer', 'souperhero', 'a person under a tack'],
            randomNum: 0,
            receivedPoint: false,
            selectedUser: '',
            timerOn: true,
            picked: false, 
            completed: false,
            disabled: false,
            hideGrid: false ,
            timesUp: false,
            answerStyle: 'answerChoicesShow',
            endGame: false,
            resetUserAnswer: false,
            hideCanvas: 'showMe',
            hideAnswers: 'hideMe',
            selectedAnswer: ''
        }
    }
    
    componentDidMount(){
        if(this.props.connection) {
            this.setState({
                playerNumber:this.props.users.indexOf(this.props.name)
            })

        const originalOnMessage = this.props.connection.onmessage;
        this.props.connection.onmessage = (e) => {
            originalOnMessage(e);
            const data = JSON.parse(e.data);
            const {drawData, userAnswers, nextPlayer, pointsArray, timerOn, selectedUser, changeClass, toggleAnswers, selectedAnswer} = JSON.parse(e.data);
            Object.keys(data).forEach((key) => {
                switch(key){
                    case 'selectedAnswer':
                        this.setState({
                            selectedAnswer
                        })
                    break;
                    case 'drawData':
                        this.setState({
                            drawingData: drawData
                        })
                    break;
                    case 'userAnswers':
                        if(userAnswers.length >= this.props.users.length -1 && this.state.picked === true) {
                            this.setState({
                                userAnswers: '' 
                            })
                        } else {
                            this.setState({
                                userAnswers
                            })
                        }
                        break;
                    case 'nextPlayer':
                        this.setState({
                            receivedPoint: true,
                            selectedUser,
                            completed: true
                        })
                        
                        setTimeout(() => {
                            let max = this.state.prompts.length;
                            let min = 0;
                            this.state.randomNum = Math.floor(Math.random() * (+max - +min)) + +min;
                            this.setState({
                                hideGrid: false,
                                disabled: false,
                                picked:false,
                                activePlayer: nextPlayer,
                                submittedAnswer: false,
                                userAnswers: '',
                                timerOn: timerOn,
                                selectedUser: -2,
                                changeClass: 'answerChoicesHidden',
                                toggleAnswers: 'answerListHidden',
                                selectedAnswer: ''
                            })

                            this.setState({
                                timerOn: true,
                                receivedPoint: false,
                                completed: false,
                                hideCanvas: 'showMe',
                                hideAnswers: 'hideMe'
                            })

                            if (this.props.hostStatus) {
                                this.setState({
                                    drawingData: ''
                                })
                            }
                        }, 3000);
                        break;
                        // CASE POINTSARRAY
                        case 'pointsArray':
                            this.setState({
                                pointsArray
                            })
                            break;

                        case 'changeClass':
                            this.setState({
                                changeClass
                            });
                            break;
                        case 'toggleAnswers':
                            this.setState({
                                toggleAnswers
                            })
                            break;
                        default:
                            break;
                    }
                })
            }
        } else {
            console.log('no props! Start again from the beginning :)')
        }
    }
    
    render() {
        let { drawingData } = this.state;
        // If statement that checks if the person is a host or not
        if (this.props.hostStatus){
            if(this.state.drawingData){
            }
        }

        const { width, height } = 400

        return (
            <div>
                {this.props.endGame ? <Redirect to="/" /> : null}
                <div className='logoAndTimer'>
                    <AppLogo src={logo} />
                    {/*   Host disabled canvas ternary render  */}
                    {this.state.timerOn && !this.props.endGame ? <ReactCountdownClock seconds={25}
                            color="#E50066"
                            alpha={1}
                            size={100}
                            paused={false}
                            onComplete={this._hideTimer}
                        /> : null }
                    </div>
            <Wrapper> 
                {/* Prompts */}
                <div>
                {(this.state.selectedUser === this.state.playerNumber) ? 
                <div>   <Confetti
                width={width}
                height={height}
                run={this.state.completed}
                /> <h1>You win this round!</h1> </div>  : null}
                    <p className='promptText'>
                        {(this.state.activePlayer === this.state.playerNumber) ? `Draw Below: ` + this.state.prompts[this.state.randomNum] : null}
                    </p>
                </div>
                { this.props.hostStatus ?  
                <div>
                    <div className='canvasAndAnswers'>
                            
                        <SketchField width='400px' 
                            height='400px' 
                            tool={Tools.Pencil} 
                            lineColor='white'
                            backgroundColor='black'
                            value={drawingData}
                            forceValue={true}
                            lineWidth={3} ref={canvasDraw => {
                                        (this._sketch = canvasDraw)
                                        }} />
                    {/*   User list and user points data render  */}
                        <div className={this.state.toggleAnswers}>
                            {this.state.userAnswers ? this.state.userAnswers.map((answer, i )=>(<li key={i}>{answer}</li>)): null}
                            {this.state.selectedAnswer ?  <li>Picked: {this.state.selectedAnswer}</li> : null}
                        </div>
                    </div>
                    <div>
                        {/* users and respective points to render on the screen */}
                        <ul className='users'>
                            {this.props.users ? this.props.users.map((user, i) => (<li key={i}>{user}: {' '}{this.state.pointsArray[i]}</li>)) : null}
                        </ul> 
                    </div>
                    {/* End Game Button */}
                    <EndButton onClick={() => {
                        this.props.setEndGame();
                        this.props.resetData();
                        this.props.connection.send(JSON.stringify({
                            userAnswers: '',
                            selectedAnswer: ''
                        }));
                        }}>END GAME</EndButton>
                </div> : (this.state.activePlayer === this.state.playerNumber && this.state.picked ===false) ?
                // {/* //  User enabled canvas ternary render */}
                    <div>
                            {/* HIDE CANVAS AND HIDE ANSWERS HERE */}
                             {/* Canvas for ACTIVE PLAYER */}
                            <div>
                                {/* <CanvasDraw brushColor={'#000'} lazyRadius={0} brushRadius={3} immediateLoading={true} disabled={this.state.disabled} hideGrid={this.state.hideGrid} ref={canvasDraw => {
                                    (this.saveableCanvas = canvasDraw)
                                    }} /> */}

                        {/* Answers for ACTIVE PLAYER */}
                            <div className={this.state.hideAnswers}>
                                { (this.state.userAnswers !== '') ? this.state.userAnswers.map((answer, i )=>(<button className={this.state.changeClass} key={i} onClick={this._chooseAnswer} value={answer}>{answer}</button>)) : null}
                            </div>

                                <div className='canvasBorder'>
                                <SketchField width='400px' 
                                    height='400px' 
                                    tool={Tools.Pencil} 
                                    lineColor='white'
                                    backgroundColor='black'
                                    onChange={() => {this._sendDrawing(this._sketch.toJSON())}}
                                    lineWidth={3} ref={canvasDraw => {
                                                (this._sketch = canvasDraw)
                                    }} />
                                </div>
                            </div>
                        </div> : 
                    // =================== THIS IS THE SECOND CONDITION AFTER ACTIVEPLAYER === PLAYERNUMBER ===================
                                    // Answer Submit form 
                                    // ================= THIS IS THE CONDITION IF TIME IS NOT UP
                                    (this.state.activePlayer !== this.state.playerNumber && this.state.submittedAnswer === false && this.state.timesUp === false) ? 
                                        <div> You have 30 seconds to answer! Hurry Up. 
                                            <AnswerSubmit answerValue={this.state.userAnswer} handleChangeAnswer={this._handleChangeAnswer} submitAnswer={this._handleSubmit}/> 
                                        </div>: 
                                            // =============== THIS IS THE CONDITION IF TIME IS UP ===================
                                            (this.state.activePlayer !== this.state.playerNumber && this.state.submittedAnswer=== false && this.state.timesUp === true) ? 
                                                <div> 
                                                    <AnswerSubmit answerValue={this.state.userAnswer} handleChangeAnswer={this._handleChangeAnswer} submitAnswer={this._handleSubmit}/> 
                                                </div> : 
                                                    // Submitted answer 
                                                    // ============================ THIS IS THE CONDITION IF PLAYER SUBMIT ANSWER ============================
                                                    (this.state.activePlayer !== this.state.playerNumber && this.state.submittedAnswer === true) ? 
                                                        <div> Submitted answer! Good luck</div> 
                                                        : null
                                                        // ============== THIS IS vvvvvvvvv THE ENDING BRACE FOR HOST STATUS ==============
                                                    } 
                </Wrapper>
            </div>
        )
    }

    _sendDrawing = (poop) => {  
        this.props.connection.send(JSON.stringify({drawData: poop}));
    }

    _setDrawingData = (object) => {
        this.setState({
            drawingData: object,
        })
    }

    _handleChangeAnswer =(event)=> {
        this.setState({
            userAnswer: event.target.value
        })
    }

    _handleSubmit = () => {
        this.setState({
            submittedAnswer: true,
            userAnswer: ''
        })
        this.props.connection.send(JSON.stringify({
            answer: this.state.userAnswer,
            name: this.props.name,
            changeClass: 'answerChoicesShow',
            toggleAnswers: 'answerListShow'}))
    }

    _chooseAnswer = (event) => {
        this.setState({
            userAnswers: '',
            picked: true,
        })
        this.props.connection.send(JSON.stringify({
            nextPlayer: this.state.activePlayer+1,
            selectedAnswer: event.target.value,
            timerOn: false,
            resetUserAnswer: true,
            timesUp: false
        }))
    }

    _displayRandomPrompts = () => {
        let promptArray = this.state.prompts;
        let max = promptArray.length;
        let min = 0;
        let randomNum = Math.floor(Math.random() * (+max - +min)) + +min;
        return promptArray[randomNum];
    }

    _hideTimer = () => {
        if(this.state.activePlayer !== this.state.playerNumber && this.state.submittedAnswer === false) {
            if(this.state.userAnswer === ''){
                this.props.connection.send(JSON.stringify({
                    answer: 'lame',
                    name: this.props.name,
                    toggleAnswers: 'answerListShow',
                    changeClass: 'answerChoicesShow',
                    selectedAnswer: ''
                }))
            } else {
                this.props.connection.send(JSON.stringify({
                    answer: this.state.userAnswer,
                    name: this.props.name,
                    toggleAnswers: 'answerListShow',
                    changeClass: 'answerChoicesShow',
                    selectedAnswer: ''
                }))
            }
        }

        this.setState({
            disabled: true,
            hideGrid: true,
            timesUp: true,
            hideCanvas: 'hideMe',
            hideAnswers: 'showMe',
            submittedAnswer: true,
            userAnswer: '',
            selectedAnswer: ''
        })
    }
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    background-color: black;
`;
    
const EndButton = styled.button`
    background-color: #E50066;
    color: white;
    width: 150px;
    height: 35px;
    border-color: black;
    border-radius: 25px;
    font-family: 'Avenir';
    font-size: 16px;
    margin-left: 29%;
    &:hover {
        cursor: pointer;
        background-color: darkred;
    }
`;

const AppLogo = styled.img`
    height: 100px;
`
