"use client";

import React, { useEffect, useState } from 'react';
import { Card, Avatar, Button, Chip, Spinner } from '@nextui-org/react';
import { Users } from "lucide-react";
import NavigationBar from '../components/shared/NavigationBar';
import Sidebar from '../components/Sidebar';
import { getFriends } from '@/services/FriendsService';

// Define the Friend type
interface Friend {
    id: string;
    name: string;
    status: string;
    avatar: string;
    profession: string;
    mutualFriends: number;
}

const MyFriendsPage = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await getFriends();
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch friends');
                }
                
                const data = await response.json();
                setFriends(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching friends:', err);
                setError('Failed to load friends. Please try again later.');
                
                // Fallback to sample data for development
                setFriends([
                    {
                        id: '1',
                        name: 'John Doe',
                        status: 'Online',
                        avatar: 'https://i.pravatar.cc/150?u=1',
                        profession: 'Software Engineer',
                        mutualFriends: 12
                    },
                    {
                        id: '2',
                        name: 'Jane Smith',
                        status: 'Offline',
                        avatar: 'https://i.pravatar.cc/150?u=2',
                        profession: 'UX Designer',
                        mutualFriends: 8
                    },
                    {
                        id: '3',
                        name: 'Alice Johnson',
                        status: 'Online',
                        avatar: 'https://i.pravatar.cc/150?u=3',
                        profession: 'Product Manager',
                        mutualFriends: 15
                    },
                    {
                        id: '4',
                        name: 'Bob Brown',
                        status: 'Offline',
                        avatar: 'https://i.pravatar.cc/150?u=4',
                        profession: 'Data Scientist',
                        mutualFriends: 5
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div className="flex gap-4 ">
            <Sidebar />
            <div className="flex-1">
                <NavigationBar />
                <div className="p-4 max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <Users className="text-3xl text-primary" />
                        <h1 className="text-3xl font-bold">My Friends</h1>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : error ? (
                        <div className="text-center p-8 bg-danger-50 text-danger rounded-lg">
                            <p>{error}</p>
                            <Button 
                                color="primary" 
                                className="mt-4"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {friends.map(friend => (
                                <Card key={friend.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar
                                                src={friend.avatar}
                                                className="w-16 h-16"
                                                alt={friend.name}
                                            />
                                            <div>
                                                <h4 className="text-xl font-semibold">{friend.name}</h4>
                                                <p className="text-sm text-gray-500">{friend.profession}</p>
                                            </div>
                                        </div>
                                        <Chip
                                            className={`${friend.status === 'Online' ? 'bg-success-100 text-success-600' : 'bg-gray-100 text-gray-600'}`}
                                            size="sm"
                                        >
                                            {friend.status}
                                        </Chip>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="text-gray-400" />
                                            <span className="text-sm text-gray-500">
                                                {friend.mutualFriends} mutual friends
                                            </span>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            color="primary"
                                            href={`/profile/${friend.id}`}
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyFriendsPage;