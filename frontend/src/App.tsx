import ChatEmpty from "./components/ChatEmpty";
import Header from "./components/ChatHeader";
function App() {
  return (
    <div className="flex flex-col">
      <Header></Header>
      <ChatEmpty></ChatEmpty>
    </div>
  );
}

export default App;
