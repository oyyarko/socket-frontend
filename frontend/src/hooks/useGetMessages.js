import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://192.168.29.63:8080/getMessages/${selectedConversation.user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("user-token"),
            },
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?.user_id) getMessages();
  }, [selectedConversation?.user_id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
