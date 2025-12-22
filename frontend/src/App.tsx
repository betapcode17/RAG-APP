import ChatEmpty from "./components/ChatEmpty";
import Header from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
function App() {
  return (
    <div className="flex flex-col">
      <Header></Header>
      <ChatEmpty></ChatEmpty>
      <ChatInput></ChatInput>
    </div>
  );
}

export default App;
