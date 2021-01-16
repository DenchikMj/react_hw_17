import TimerLine from './components/TimerLine';

function App() {
  return (
    <div className="App">
      <TimerLine
        id="1"
        time="15"
        run="1"
        onTick={(time) => console.log("There is time left: " + time)}
        onTimeEnd={() => console.log("Час вийшов!")}
        onTimeStart={() => console.log("Таймер запущено!")}
        onTimePause={() => console.log("Таймер на паузі!")}>
      </TimerLine>
      <TimerLine id="2" time="16" interval="2"></TimerLine>
      <TimerLine id="3" time="5" repit="1" run="1"></TimerLine>
    </div>
  );
}

export default App;
