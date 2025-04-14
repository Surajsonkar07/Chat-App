import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen">
      <div className="flex items-center h-[68%] max-sm:h-[30%]  max-sm:px-0 justify-center pt-[19%] max-sm:pt-90 px-4">
        <div className="bg-base-100  rounded-lg shadow-cl  w-[80%] max-sm:w-[100%]  max-sm:h[50%] max-w-6xl  ">
          <div className="flex   rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
