'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { apiCall } from '@/api/api'

interface Message {
  id: number
  title: string
  content: string
  isRead: boolean
}

export default function MessageDisplay() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [userToken, setUserToken] = useState<string | null>(null)
  
  useEffect(() => {
    const storedToken = localStorage.getItem('user_token');
    setUserToken(storedToken)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiCall('message', 'GET'); 
        setMessages(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    if (userToken) {
      fetchData()
    }
  }, [userToken]);  

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      setMessages(messages.map(m =>
        m.id === message.id ? { ...m, isRead: true } : m
      ))

      try {
        await apiCall(`message/${message.id}`, 'PATCH');
      } catch (error) {
        console.error('Error updating message status:', error);
      }
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
                  className={`p-2 mb-2 rounded cursor-pointer transition-colors ${message.isRead ? 'bg-gray-100 hover:bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'
                    }`}
                  onClick={() => handleMessageClick(message)}
                >
                  <h3 className="font-semibold">{message.title}</h3>
                  <p className="text-sm text-gray-500">
                    {message.isRead ? 'Read' : 'Unread'}
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