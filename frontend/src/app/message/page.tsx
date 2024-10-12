'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface Message {
  id: number
  title: string
  content: string
  read: boolean
}

// Sample data - replace this with your actual data fetching logic
const initialMessages: Message[] = [
  { id: 1, title: "Welcome Message", content: "Welcome to our platform!", read: true },
  { id: 2, title: "New Feature Announcement", content: "We've added a new feature...", read: false },
  { id: 3, title: "Important Update", content: "Please update your account details...", read: false },
  { id: 4, title: "Maintenance Notice", content: "Our servers will be down for maintenance...", read: true },
]

export default function MessageDisplay() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      // Mark the message as read
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ))
    }
  }

  const handleBackClick = () => {
    setSelectedMessage(null)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Message List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[70vh]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-2 mb-2 rounded cursor-pointer transition-colors ${
                    message.read ? 'bg-gray-100 hover:bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'
                  }`}
                  onClick={() => handleMessageClick(message)}
                >
                  <h3 className="font-semibold">{message.title}</h3>
                  <p className="text-sm text-gray-500">
                    {message.read ? 'Read' : 'Unread'}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div>
                <h2 className="text-xl font-bold mb-2">{selectedMessage.title}</h2>
                <p className="mb-4">{selectedMessage.content}</p>
                <Button onClick={handleBackClick}>Back to List</Button>
              </div>
            ) : (
              <p>Select a message to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}