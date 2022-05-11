import styled from 'styled-components';

const ContainerProgress = styled.div`

  background-color: var(--orange);

.imgRecipe {
  width: 100vw;
  height: 320px;
}

.taskScratched {
  text-decoration: line-through solid black;
}

.container-btns {
  width: 80px;
  display: flex;
  justify-content: space-around;    
}

.container-btn-title {
  display: flex;
  justify-content: space-between;  
}

.shareButton {
  background-color: var(--orange);
  border: none;
  width: 44px;
  height: 44px;
}

span, h1{
  margin: 14px 0px 0px 16px;
  font-size: 38px;
  font-family: 'Cookie', cursive;
  color: white;
}

.recipeProgressContainer { 
  padding-left: 12px;  
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 12px 18px 12px 18px;
  box-shadow: 1px 1px 8px 2px var(--lightRed);
  padding: 8px 10px 8px 10px;
}

.recipeProgressContainer label {
  font-family: 'Annie Use Your Telescope', cursive;
  font-size: 22px;
  color: white;
}

.recipeProgressContainer label input {
  margin-right: 8px;  
}

.instructionsContainer {
  width: 340px;  
    margin: 12px 0px 12px 18px;
    box-shadow: 1px 1px 8px 2px var(--lightRed);
    padding: 8px 10px 8px 10px;
    border-radius: 8px;
    text-align: justify;
    font-family: 'Annie Use Your Telescope', cursive;
    font-size: 22px;
    color: white;
}



`;

export default ContainerProgress;
