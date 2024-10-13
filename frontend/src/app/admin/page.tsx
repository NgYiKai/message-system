'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'
import { MultiSelect } from '@/components/multiselect'
import { apiCall } from '@/api/api'

interface User {
  id: string,
  email: string,
  role: string,
}

export default function AdminMessageSender() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [userList, setUserList] = useState([])
  const [sendToAll, setSendToAll] = useState(false)
  const [userToken, setUserToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('user_token');
    setUserToken(storedToken)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await apiCall('users', 'GET');
        result = result.map(
          (user: User) => ({ value: user.id, label: user.email })
        )
        setUserList(result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (userToken) {
      fetchData()
    }
  }, [userToken]);

  const handleSendToAllChange = (checked: boolean) => {
    setSendToAll(checked)
    if (checked) {
      setSelectedUsers([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content.",
        variant: "destructive",
      })
      return
    }

    if (!sendToAll && selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one user or choose to send to all.",
        variant: "destructive",
      })
      return
    }

    const target = sendToAll ? ["all"] : selectedUsers

    try {
      await apiCall('message', 'POST', {
        target: target,
        title: title,
        content: content
      })

      toast({
        title: "Success",
        description: "Message sent successfully!",
      })

      setTitle('')
      setContent('')
      setSelectedUsers([])
      setSendToAll(true)
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Send Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Message Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter message title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Message Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter message content"
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Checkbox
                  id="sendToAll"
                  checked={sendToAll}
                  onCheckedChange={handleSendToAllChange}
                />
                <span>Send to all users</span>
              </Label>
            </div>

            {
              !sendToAll && (
                <MultiSelect
                  options={userList}
                  onValueChange={setSelectedUsers}
                  defaultValue={selectedUsers}
                  placeholder="Select users"
                  variant="inverted"
                  maxCount={3}
                />
              )
            }

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}