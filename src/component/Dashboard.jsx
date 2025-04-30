import React, { useState } from "react";

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  });

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (newGroup.name.trim()) {
      setGroups([...groups, { ...newGroup, id: Date.now(), members: [] }]);
      setNewGroup({ name: "", description: "" });
      setShowCreateGroup(false);
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
              {groups.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No groups yet. Create one to get started!
                </p>
              ) : (
                <div className="space-y-4">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {group.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{group.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {group.members.length} members
                        </span>
                        <button className="text-purple-600 hover:text-purple-700 font-medium">
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
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Friends
              </h2>
              <div className="space-y-4">
                {friends.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No friends added yet
                  </p>
                ) : (
                  friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">
                          {friend.name[0]}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {friend.name}
                        </h4>
                        <p className="text-sm text-gray-500">{friend.email}</p>
                      </div>
                    </div>
                  ))
                )}
                <button className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                  Add Friend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 transform transition-all duration-300">
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
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter group name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="groupDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="groupDescription"
                  value={newGroup.description}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, description: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter group description"
                  rows="3"
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
    </div>
  );
};

export default Dashboard;
