import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Container1 from './components/Container1';
import Container2 from './components/Container2';
import Container3 from './components/Container3';
import Container4 from './components/Container4';

function App() {
  return (
    <div className="App bg-black pb-[200px]">
      <Header />
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <div
        className="fixed bottom-0 left-0 w-[100vw] py-[150px] z-50"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)"
        }}
      ></div>

    </div>
  );
}

export default App;
