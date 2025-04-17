import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const Home = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen ">
      <div className="flex items-center  max-sm:h-[30%]  max-sm:px-0 justify-center pt-[5%] max-sm:pt-[105%]  px-4">
        <div className="bg-base-100 max-lg:mt-10 mt-9 rounded-lg shadow-cl max-md:mt-20 w-[90%] max-sm:w-[100%]  max-sm:h[50%] max-w-6xl  ">
          <div className="flex  max-md:h-217 max-lg:h-230 h-150 max-xl:h-310 rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
