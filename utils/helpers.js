import AsyncStorage from '@react-native-community/async-storage'
import {Platform} from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification () {
    return {
        title: 'Time to take a quiz!',
        body: '📗 Test your knowledge for the day',
    }
}

export async function setLocalNotification () {
    await AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(async (data) => {
        if(data == null){
            await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                }
            })
            .then(async (settings) => {
                if(settings.granted || settings.ios?.status != 0){
                    Notifications.cancelAllScheduledNotificationsAsync()
                    //change trigger.seconds to control frequency
                    Notifications.scheduleNotificationAsync(
                        {content: createNotification(),
                        trigger : {
                            repeats: true,
                            seconds: 86400,
                        }
                        }
                    )
                    AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
                }
            })
        }
    })
}