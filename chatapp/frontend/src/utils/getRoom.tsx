export const generateRoomId = (senderId: string, reveiverId: string) => {
  const userIds = [senderId, reveiverId];
  userIds.sort();
  const roomName = userIds[0] + userIds[1];

  return roomName;
};
