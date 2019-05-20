import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import styled from 'styled-components';


export default function Canvas({handleSend, drawing, saveableCanvas, setDrawingData}) {
    return (
        <Wrapper>
        {/*           Save button  */}
            <Button onClick={() => {
                  // localStorage.setItem( "savedDrawing",this.saveableCanvas.getSaveData());
                  // Retrieves from local storage and  pushes into empty array 
                  // const save = localStorage.getItem("savedDrawing")

                  // stores canvas data in variable and pushes to array 

                const saveData = saveableCanvas.getSaveData(); 
                const object = [];
                object.push(saveData);
                setDrawingData(object);
                // this.setState({
                //     drawingData: object
                // })
                // console.log(drawingData)
            }}>
            Save
            </Button>

            {/*               Load button will retrieve the last drawing from state  */}
            <Button
                onClick={() => {
                    console.log('loading data')
                    console.log(drawing)
                    saveableCanvas.loadSaveData(
                        drawing
                    )
            }}
            >Load</Button>
        <Button
            onClick={handleSend}
            >
            Send Drawing
            </Button>
        <CanvasDraw
            ref={canvasDraw => (saveableCanvas = canvasDraw)} />
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    background-color: #E5E5E5;
`;
    
    const Button = styled.button`
    background-color: #1A2230;
    color: white;
    width: 125px;
    height: 25px;
    border-radius: 4px;
    font-family: 'Avenir';
    font-size: 16px;
    &:hover {
        cursor: pointer;
        background-color: red;
    }
`;

