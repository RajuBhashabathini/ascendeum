import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [timerCopy, setTimerCopy] = useState(0);

  const [timeDifference, setTimeDifference] = useState(new Date().getTime());
  const numberOfClicked = useRef(0);

  const [mouseEventsArray, setMouseEventsArray] = useState([]);

  const [topPosition, setTopPosition] = useState("");
  const [leftPosition, setLeftPosition] = useState("");

  const [pauseTimer, setPauseTimer] = useState(false);

  useEffect(() => {
    let myTimeInterval;

    if (pauseTimer) {
      myTimeInterval = setInterval(() => {
        if (timer > 1) {
          setTimer((prev) => prev - 1);
        } else {
          setTimer(timerCopy);
          setTopPosition(Math.floor(Math.random() * 300) + "px");
          setLeftPosition(Math.floor(Math.random() * 300) + "px");
        }
      }, 1000);
    }
    return () => {
      clearInterval(myTimeInterval);
    };
  }, [timer, pauseTimer]);
  // console.log("mouseEventsArray", mouseEventsArray);

  return (
    <div className="App min-h-screen min-w-screen flex justify-center items-center border border-blue-200 ">
      <div className="w-[60%] min-h-[80%] border border-black flex flex-col p-10">
        <div className="flex flex-row justify-around items-center my-3">
          <button
            onClick={() => {
              setPauseTimer(true);
              setTimeDifference(new Date().getTime());
            }}
            className="border border-black p-1"
          >
            Start
          </button>
          <button
            onClick={() => {
              setPauseTimer(false);
            }}
            className="border border-black p-1"
          >
            Pause
          </button>
          <button
            onClick={() => {
              setMouseEventsArray([]);
              setTimer(timerCopy);
              setPauseTimer(false);
              setTimeDifference(new Date().getTime());

              numberOfClicked.current = 0;
            }}
            className="border border-black p-1"
          >
            Reset
          </button>
          <input
            type="text"
            onChange={(e) => {
              setTimer(e.target.value);
              setTimerCopy(e.target.value);
              setTopPosition(Math.floor(Math.random() * 300) + "px");
              setLeftPosition(Math.floor(Math.random() * 300) + "px");
              setTimeDifference(new Date().getTime());
            }}
            className="border border-black p-3"
          ></input>
        </div>
        <h1>Time Remaining :{timer}</h1>
        <div className="relative size-[500px] border border-black">
          {pauseTimer && timer ? (
            <div
              onClick={() => {
                console.log("you have clicked the correct");
                numberOfClicked.current += 1;

                console.log("clicked times", numberOfClicked);
                setTimer(timerCopy);
                setTopPosition(Math.floor(Math.random() * 300) + "px");
                setLeftPosition(Math.floor(Math.random() * 300) + "px");
                let newClicked = new Date().getTime();

                let obj = {
                  events: numberOfClicked.current,
                  time: (newClicked - timeDifference) / 1000,
                };

                mouseEventsArray.push(obj);

                console.log(
                  "timer",
                  timeDifference,
                  newClicked,
                  newClicked - timeDifference
                );
                // setTimeDifference(newClicked);
              }}
              style={{
                position: "absolute",
                top: topPosition,
                left: leftPosition,
              }}
              className={`absolute size[10px] bg-yellow-400    p-3`}
            >
              10
            </div>
          ) : null}
        </div>
        <div>
          {mouseEventsArray && mouseEventsArray.length > 0 ? (
            <div>
              {mouseEventsArray.map((ele) => {
                return (
                  <div key={ele.time}>
                    <label>Mouse Click Number : {ele.events}</label>
                    <label>Reaction Time : {ele.time} sec</label>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
