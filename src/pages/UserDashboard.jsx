import axios from "axios";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroup, setNewGroup] = useState({
    roomName: "",
  });
  const [newFriend, setNewFriend] = useState({
    userEmail: "",
    roomName: "",
  });

  async function getAllGroups() {
    let { data } = await axios.get(
      "http://localhost:8182/roomMates/getAllRoomDetails"
    );
    console.log(data);
    setGroups(data);
  }

  // !GET ALL FRIENDS API CALL
  async function getAllFriends() {
    try {
      let { data } = await axios.get("PASTE HERE -> API");
      console.log(data);
      setFriends(data);
    } catch (error) {
      console.log("error while fetich all friends", error);
    }
  }
  useEffect(() => {
    getAllGroups();
    // !UNCOMMENT THE BELOW FUNCTION CALL FOR GET ALL FRIENDS
    // getAllFriends()
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (newGroup.roomName.trim()) {
      try {
        let resp = await axios.post(
          "http://localhost:8182/roomMates/createRoom",
          newGroup
        );
        console.log(resp);
        getAllGroups();
      } catch (error) {
        console.log(error);
        console.log("error while creating new group");
      }

      setNewGroup({ roomName: "" });
      setShowCreateGroup(false);
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (newFriend.userEmail.trim() && newFriend.roomName.trim()) {
      try {
        let resp = await axios.get(
          `http://localhost:8182/roomMates/addRoomMates/${newFriend.userEmail}/${newFriend.roomName}`
        );
        console.log(resp);
        

        getAllGroups();
      } catch (error) {
        console.log(error);
        console.log("error while adding friend");
      }

      setNewFriend({ userEmail: "", roomName: "" });
      setShowAddFriend(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
          >
            Create Group
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Groups Section */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your Groups
              </h2>
              {groups?.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No groups yet. Create one to get started!
                </p>
              ) : (
                <div className="space-y-4">
                  {groups?.map((group) => (
                    <div
                      key={group.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {group.roomName}
                      </h3>
                      <p className="text-gray-600 mt-1">{group.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {group.users.length} members
                        </span>
                        <button
                          onClick={() => setSelectedGroup(group)}
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Friends Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={() => setShowAddFriend(true)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black  flex items-center justify-center">
          <div className="bg-white rounded-lg  shadow-xl p-6 w-96 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create New Group
            </h2>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={newGroup.roomName}
                  onChange={(e) => setNewGroup({ roomName: e.target.value })}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter group name"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateGroup(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add Friend to Group
            </h2>
            <form onSubmit={handleAddFriend} className="space-y-4">
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Friend's Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={newFriend.userEmail}
                  onChange={(e) =>
                    setNewFriend({ ...newFriend, userEmail: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter friend's email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="roomName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={newFriend.roomName}
                  onChange={(e) =>
                    setNewFriend({ ...newFriend, roomName: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter group name"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddFriend(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300"
                >
                  Add Friend
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Group Details Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto transform transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedGroup.roomName} - Members
              </h2>
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {selectedGroup.users.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">
                      {user.name
                        ? user.name[0].toUpperCase()
                        : user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {user.name || "No Name"}
                    </h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
