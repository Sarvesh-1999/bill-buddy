import axios from "axios";
import React, { useEffect, useState } from "react";
import GroupDetails from "../components/GroupDetails";
import CreateGroupModal from "../components/CreateGroupModal";
import AddFriendModal from "../components/AddFriendModal";
import AddItemModal from "../components/AddItemModal";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupForItem, setSelectedGroupForItem] = useState(null);
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
  useEffect(() => {
    getAllGroups();
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
        setNewGroup({ roomName: "" });
        setShowCreateGroup(false);
      } catch (error) {
        console.log(error);
        console.log("error while creating new group");
      }
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
        setNewFriend({ userEmail: "", roomName: "" });
        setShowAddFriend(false);
      } catch (error) {
        console.log(error);
        console.log("error while adding friend");
      }
    }
  };

  const handleAddItem = async (itemData,roomName) => {
    try {
      // TODO: Implement the API call to add item
      console.log("Adding item:", itemData);
      let userName = sessionStorage.getItem("useremail")
      let resp = await axios.post(`http://localhost:8182/items/addItems/${userName}/${roomName}`,itemData)
      toast.success(`${itemData.itemsName} Added`)
      setShowAddItem(false);
      setSelectedGroupForItem(null);
    } catch (error) {
      console.log("error while adding item:", error);
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
          {/* Add Friend Section - Moved to top on mobile */}
          <div className="col-span-2 md:col-span-1 order-first md:order-last">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={() => setShowAddFriend(true)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Add Friend
              </button>
            </div>
          </div>

          {/* Groups Section */}
          <div className="col-span-2 order-last md:order-first">
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
                        <div className="space-x-2 flex flex-col md:flex-row">
                          <button
                            onClick={() => {
                              setSelectedGroupForItem(group);
                              setShowAddItem(true);
                            }}
                            className="text-green-500  hover:text-green-700 font-medium"
                          >
                            Add Item
                          </button>
                          <button
                            onClick={() => setSelectedGroup(group)}
                            className="text-purple-600 hover:text-purple-700 font-medium  "
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}

      <CreateGroupModal
        show={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onSubmit={handleCreateGroup}
        newGroup={newGroup}
        setNewGroup={setNewGroup}
      />

      <AddFriendModal
        show={showAddFriend}
        onClose={() => setShowAddFriend(false)}
        onSubmit={handleAddFriend}
        newFriend={newFriend}
        setNewFriend={setNewFriend}
      />

      <AddItemModal
        show={showAddItem}
        onClose={() => {
          setShowAddItem(false);
          setSelectedGroupForItem(null);
        }}
        onSubmit={handleAddItem}
        group={selectedGroupForItem}
      />

      {selectedGroup && (
        <GroupDetails
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  );
};

export default UserDashboard;
