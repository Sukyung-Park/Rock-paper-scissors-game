import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

// 1. 박스 2개 그리기 (타이틀, 사진, 결과값)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3,4 번의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패결과에 따라 테두리 색이 바귄다. (이기면 - 초록, 지면 - 빨강, 비기면 - 검은색)

const choice = {
  rock: {
    name: "Rock",
    img: "img/바위1.jpg",
  },
  scissors: {
    name: "Scissors",
    img: "img/가위1.jpg",
  },
  paper: {
    name: "Paper",
    img: "img/보1.jpg",
  },
};
function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };
  const randomChoice = () => {
    let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log("random value", randomItem);
    let final = itemArray[randomItem];
    return choice[final];
  };
  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);
    // user == computer 비김
    // user == rock, computer == scissors > user가 이김
    // user == rock, computer == paper > user가 졌음
    // user == scissors, computer == paper > user가 이김
    // user == scissors, computer == rock > user가 졌음
    // user == paper, computer == rock > user가 이김
    // user == paper, computer == scissors > user가 졌음

    if (user.name == computer.name) {
      return "비겼어요😐";
    } else if (user.name == "Rock")
      return computer.name == "Scissors" ? "이겼어요🤩" : "졌어요😭";
    else if (user.name == "Scissors")
      return computer.name == "Paper" ? "이겼어요🤩" : "졌어요😭";
    else if (user.name == "Paper")
      return computer.name == "Rock" ? "이겼어요🤩" : "졌어요😭";
  };
  return (
    <div>
      <div className="floryGame">플로리의 가위바위보게임</div>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} result={result} />
      </div>
      <div className="buttonclick">아래 버튼을 눌러주세요.</div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;
