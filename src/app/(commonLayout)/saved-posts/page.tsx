import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Chip } from '@nextui-org/react';
import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import NavigationBar from '../components/shared/NavigationBar';

const SavedPosts = () => {
    const savedPosts = [
        {
            id: 1,
            title: "Top 10 VS Code Extensions for Web Developers",
            content: "Discover the must-have VS Code extensions that will boost your productivity...",
            author: {
                name: "John Doe",
                avatar: "https://i.pravatar.cc/150?u=1",
                role: "Senior Developer"
            },
            category: "Development Tools",
            likes: 234,
            comments: 45,
            saved: true,
            timestamp: "2 hours ago"
        },
        {
            id: 2,
            title: "Getting Started with Next.js 13",
            content: "Learn how to build modern web applications with Next.js 13's new app router...",
            author: {
                name: "Jane Smith",
                avatar: "https://i.pravatar.cc/150?u=2",
                role: "Tech Lead"
            },
            category: "Web Development",
            likes: 189,
            comments: 32,
            saved: true,
            timestamp: "5 hours ago"
        }
    ];

    return (
        <div className="flex gap-4 ">
            <Sidebar />
            <div className="flex-1">
                <NavigationBar />
                <div className="max-w-5xl mx-auto p-4">
                    <div className="flex items-center gap-3 mb-8">
                        <Bookmark className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold">Saved Posts</h1>
                    </div>

                    <div className="grid gap-6">
                        {savedPosts.map((post) => (
                            <Card key={post.id} className="hover:shadow-lg transition-shadow p-4">
                                <CardHeader className="flex gap-4">
                                    <Avatar src={post.author.avatar} size="lg" />
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-lg font-semibold">{post.author.name}</p>
                                                <p className="text-small text-default-500">{post.author.role}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Chip size="sm" color="primary">{post.category}</Chip>
                                                <span className="text-small text-default-500">{post.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                    <p className="text-default-500">{post.content}</p>
                                </CardBody>
                                <CardFooter className="flex justify-between">
                                    <div className="flex gap-6">
                                        <Button
                                            variant="light"
                                            startContent={<Heart size={20} />}
                                        >
                                            {post.likes}
                                        </Button>
                                        <Button
                                            variant="light"
                                            startContent={<MessageCircle size={20} />}
                                        >
                                            {post.comments}
                                        </Button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="flat"
                                            color="primary"
                                            startContent={<Share2 size={20} />}
                                        >
                                            Share
                                        </Button>
                                        <Button
                                            variant="solid"
                                            color="primary"
                                            startContent={<Bookmark size={20} />}
                                        >
                                            Saved
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedPosts;