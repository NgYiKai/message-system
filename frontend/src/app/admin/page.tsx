'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'

const users = [
  { id: '1', name: 'Alice Johnson' },
  { id: '2', name: 'Bob Smith' },
  { id: '3', name: 'Charlie Brown' },
  { id: '4', name: 'Diana Ross' },
]

export default function AdminMessageSender() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [sendToAll, setSendToAll] = useState(false)

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSendToAllChange = (checked: boolean) => {
    setSendToAll(checked)
    if (checked) {
      setSelectedUsers([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
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

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Sending message:', {
        title,
        content,
        recipients: sendToAll ? 'All Users' : selectedUsers,
      })

      toast({
        title: "Success",
        description: "Message sent successfully!",
      })

      // Reset form
      setTitle('')
      setContent('')
      setSelectedUsers([])
      setSendToAll(false)
    } catch (error) {
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
          <CardTitle className="text-2xl font-bold">Send Admin Message</CardTitle>
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
            {/* {!sendToAll && (
              <div className="space-y-2">
                <Label>Select Users</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select users" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <Label className="flex items-center space-x-2">
                          <Checkbox 
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => handleUserSelect(user.id)}
                          />
                          <span>{user.name}</span>
                        </Label>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedUsers.length} user(s)
                </p>
              </div>
            )} */}
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}