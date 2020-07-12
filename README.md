# PicMe – Draw with Friends, Anywhere!

## Play Here: https://picme.seilcho7.dev/


<img src="./src/img/picme-logo.png" width="500">

## Updates / Reflections from over a year later

I believe that I have grown much as developer in the past year or so. Part of the reason why is because I believe that a developer has to be driven by growth in one way or the other. Having now gained experience as a developer working in a corporation with an Agile environment, one thing that I've learned (that doesn't have much to do with coding itself ironically) is that I have never submitted/ closed a Jira ticket without this feeling that "I could have done better". This does NOT mean that I have done/ turned in subpar work, our coding review process definitely protects against that. What this DOES mean however is that at any given time, a developer can look back at a couple lines of code and say "Huh, maybe I should have done this" or "Gee, why did I do that!". Some developers anguish at the thought of having to look at code they've shelved away, but for some others, its part of the learning process or at the very least a *reflective* process. So its time for some reflection! 
```
 constructor(props) {
    super(props);
    this.state = {
      drawingData: '',
      drawing: '',
      drawEnd: false,
      name: '',
      gamePin: '',
      roomId: '',
      saveRoomId: '',
      socketRoomId: '',
      users: '',
      redirect: false,
      joined: styles.joinButton,
      isHost: false,
      answerChoices: ['bird', 'birdDog', 'Flying Panda!'],
      start: false,
      pointsArray: '',
      showHost: true,
      kickUsers: false,
      endGame: false,
      resetGame: false
    };  
  }
```
Wow look at all those states! It would be a shame if a state management library came along and..... I don't know....make your life 1000 times easier? And no, this doesn't mean install Redux and begin converting *every* single possible interaction to a Redux action. The great thing(and terrible thing tbh) about React is that updates will happen and new techniques will come along to make your life a living.....joy! The introduction of React Hooks quite honestly changed the game for me.
I was terrified at having to learn a "new way to write React components", but honestly it was a breath of fresh air. Class based components are just NOT it for me and React hooks come with a bunch of sweet tools, with the most relevant one here being *React.useReducer*. useReducer provides a more 'in house' solution to state management at the component level. Does this completely replace Redux with its global store of states? Nope. In fact the more complicated an app is the more I would advocate for Redux over a simple useReducer hook. Here however, it works because of the relatively "small" amount of state management going on. So....why didn't our team of up and coming Developers use any state management?

 Time. We essentially were given two weeks to start and finish a full-stack application that we would be forever proud of and to show off to employers that we were capable and...well the list goes on. Two weeks is enough to get something up and going, not a finished product but a demo to be honest. We needed a FINISHED product, one that worked well and we could let people use without having to worry about things going wrong. The development process had to be expedited, so initially we laid the groundwork for what we would *absolutely* need at the bare minimum, and what tools we would end up using or not using. I'll be honest, I was one of the people that advocated AGAINST a redux store the most. This was a mistake and everyone knew it a week later. Our team should have recognized that something as "Event-driven" as a multiplayer GAME would require many many many states to drive the App and make it interactive and functional and FUN. 
 
 Do I regret not using state management at the time? Nope. In our bootcamp, we had literally just been introduced to the concept of Redux, and everyone in my group was still scratching their heads at that concept still. We had a lot on our plate at the time and I personally didn't want to further complicate the lives of everyone at the time. We were stressed 24/7 during the final project and the day we finished was a day that I still remember quite vividly. 



## What is it? 
PicMe is an interactive, multiplayer game which involves challenging players to draw weird, funny and sometimes ridiculous prompts on their personal devices. The drawings are shown live on a host screen, as the player is drawing. Other users are able to view the drawing from the host screen and submit a guess as to what the user is drawing. After 25 seconds, the user that was drawing is shown all the submitted answers. He/she is required to select one that they like best (similar to Cards Against Humanity), which then gives that user a point. This is considered the end of one round of gameplay; the next round then starts with another person drawing a new image.

## How did we make it?
* Frontend:
    * React.js
    * Websockets
    * CSS3
    * HTML5 
    * React-Sketch
    * React-Confetti
    * React-Countdown-Clock
    * React-Router-Dom
    * Styled-Component
* Backend:
    * PostgreSQL
    * Express.js
    * Node.js

## What were our headaches?
A major challenge was having the ability for the drawing to be accurate on personal devices (especially on iOS devices). For example, the lines were off by a millimeter based on the user’s touch as well as the Sketchfield component would move around while the user drew. This issue was detrimental in having a flawless user experience, thus we converted our drawing field from react-canvas-draw to react-sketch. However, this created another problem that we needed to solve – the drawings that appeared “live” on the host page were now delayed. With a few tweaks, we were able to have the user drawing appear live on the host page so everyone can view and guess in real time.
## Login screen
![](https://media.giphy.com/media/L2qL4iryo1IwCZWPn9/giphy.gif)
## PicMe demo 
![](https://media.giphy.com/media/STkUz4JLF50xQ1qet3/giphy.gif)
