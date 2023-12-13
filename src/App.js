import "./App.css";
import SelectionPanel from "./Components/SelectionPanel";
import MainScene from "./Components/MainScene";

function App() {
    return (
        <>
            <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                <MainScene />
                <SelectionPanel />
            </div>
        </>
    );
}

export default App;
