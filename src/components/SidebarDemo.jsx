"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMicrophone,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Welcome! How can I assist you today?", language: "en" },
  ]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = React.useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input;
    setMessages((prev) => [...prev, { from: "user", text: userInput }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle the API response structure
      const botReply = data.answer || "No response received";
      const language = data.language || "en";

      setMessages((prev) => [...prev, { 
        from: "bot", 
        text: botReply,
        language: language 
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { 
          from: "bot", 
          text: "Sorry, something went wrong. Please try again.",
          language: "en"
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-100 dark:bg-neutral-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? (
              <a
                href="#"
                className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
              >
                <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium whitespace-pre text-black dark:text-white"
                >
                  pragyaSETU
                </motion.span>
              </a>
            ) : (
              <a
                href="#"
                className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
              >
                <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
              </a>
            )}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "BUT_BUSTERS",
                href: "#",
                icon: (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZNiigBCZuvVI36BpCZowvSDvrfwTje3Lu7A&s"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Chat Interface */}
      <div className="flex flex-1 flex-col bg-white dark:bg-neutral-900 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 p-4 md:p-10 h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.from === "bot"
                    ? "bg-gray-200 dark:bg-neutral-800 text-black dark:text-white"
                    : "bg-purple-500 text-white"
                }`}
              >
                {msg.text}
                {msg.language && msg.from === "bot" && (
                  <div className="text-xs opacity-70 mt-1">
                    Language: {msg.language}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 dark:bg-neutral-800 text-black dark:text-white">
                <div className="flex items-center space-x-1">
                  <div className="animate-pulse">Thinking...</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-col items-center gap-3 mt-4">
          <button
            className="flex items-center justify-center rounded-full bg-purple-500 p-3 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => alert("Voice input activated (placeholder)")}
            disabled={isLoading}
          >
            <IconMicrophone size={24} />
          </button>

          <div className="flex items-center gap-2 justify-center w-full max-w-md">
            <input
              type="text"
              className={`flex-1 rounded-md border border-neutral-300 bg-gray-50 px-4 py-2 text-black dark:border-neutral-600 dark:bg-neutral-700 dark:text-white transition-all duration-300 ${
                isFocused ? "h-14" : "h-10"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              placeholder={isLoading ? "Sending..." : "Type your message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}