import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();
  const { selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`http://192.168.29.63:8080/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("user-token"),
        },
        body: JSON.stringify({
          message,
          receiverId: selectedConversation.user_id,
          senderId: authUser.data.user_id,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
