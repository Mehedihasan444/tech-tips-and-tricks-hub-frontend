import React from 'react';
import { Card, Avatar, Button, Chip } from '@nextui-org/react';
import { Users } from "lucide-react";
import NavigationBar from '../components/shared/NavigationBar';
import Sidebar from '../components/Sidebar';

const MyFriendsPage = () => {
    // static data needs to be change
    const friends = [
        {
            id: 1,
            name: 'John Doe',
            status: 'Online',
            avatar: 'https://i.pravatar.cc/150?u=1',
            profession: 'Software Engineer',
            mutualFriends: 12
        },
        {
            id: 2,
            name: 'Jane Smith',
            status: 'Offline',
            avatar: 'https://i.pravatar.cc/150?u=2',
            profession: 'UX Designer',
            mutualFriends: 8
        },
        {
            id: 3,
            name: 'Alice Johnson',
            status: 'Online',
            avatar: 'https://i.pravatar.cc/150?u=3',
            profession: 'Product Manager',
            mutualFriends: 15
        },
        {
            id: 4,
            name: 'Bob Brown',
            status: 'Offline',
            avatar: 'https://i.pravatar.cc/150?u=4',
            profession: 'Data Scientist',
            mutualFriends: 5
        },
    ];

    return (
        <div className="flex gap-4 ">
            <Sidebar />
            <div className="">
                <NavigationBar />
                <div className="p-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <Users className="text-3xl text-primary" />
                        <h1 className="text-3xl font-bold">My Friends</h1>
                    </div>

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
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyFriendsPage;