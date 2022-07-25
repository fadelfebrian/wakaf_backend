import { Expo } from "expo-server-sdk";
const expo = new Expo();
export const handlePushTokens = ({ body }) => {
  let savedPushTokens = [
    "ExponentPushToken[8oFE0FOcKQ7cTg3s5ypbMv]",
    "ExponentPushToken[LB-60JD9E6aToTzy3ba9RY]",
  ];
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: "Wakaf App",
      body: body,
      data: { body },
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};
