
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StyleSheet,
  Text,
} from 'react-native';
import RootLayout from './_layout';
import { SignIn } from './auth_components/SignIn';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatComponent } from './auth_components/ChatComponent';
import CallPage from './components/call';
import Home from './components/homepage';
import Login from './components/login';

import Chatbox from './components/chatbox';
import { Id } from './convex/_generated/dataModel';
import GroupComponent from './components/groupCreate';
import Testing from './auth_components/Testing';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './components/register';
import DmCreate from './components/dmCreate';
import ChatScreen from './components/chatScreen';
import { VerificationScreen } from './components/verification';
import { UsernameComponent } from './components/username';
import { DmChatbox } from './components/dm';
import OtherDevicesScreen from './components/otherDevices';
import { IntervalScreen } from './components/sessionVerification';
import UserProfileComponent from './components/userProfile';
import BillSplit from './components/billSplit';
import DmCallPage from './components/callDm';
import GroupChatScreen from './components/group_page';
import Calls from './components/callLogs';
import BotCreationPage from './components/createBot';


export type RootStackParamList = {
  CallPage:{email:string, groupId:Id<'groups'>, name:string};
  Login: undefined;
  Chat: { email: string };
  DmChat:{fromId:string, toId:string};
  DmCreate:{email:string},
  Register: undefined;
  Verification:{email:string, password:string, type:'signUp'|'signIn'},
  GroupChat: { groupId: Id<'groups'>; email: string };
  GroupCreate: {email:string};
  Username:{email:string};
  OtherDevice:{email:string};
  SessionVerification:{email:string};
  Profile: { email: string };
  BillSplit: { email: string };
  GroupChatScreen: { email: string };
  Calls: { email: string };
  BotcreationPage: { groupId: Id<'groups'> };
  DmCallPage:{fromId:Id<'users'>, name:string, email:string, toId:Id<'users'>, callId:Id<'callLogs'>, video:boolean}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  return (
    <RootLayout>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OtherDevice" component={OtherDevicesScreen} />
          <Stack.Screen name="SessionVerification" component={IntervalScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="DmChat" component={DmChatbox} />
          <Stack.Screen name="DmCreate" component={DmCreate} />
          <Stack.Screen name="GroupCreate" component={GroupComponent} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Username" component={UsernameComponent} />
          <Stack.Screen name="GroupChat" component={Chatbox}/>
          <Stack.Screen name="Profile" component={UserProfileComponent} />
          <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
          <Stack.Screen name="CallPage" component={CallPage}/>
          <Stack.Screen name="BillSplit" component={BillSplit} />
          <Stack.Screen name="DmCallPage" component={DmCallPage} />
          <Stack.Screen name="Calls" component={Calls} />
          <Stack.Screen name="BotcreationPage" component={BotCreationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootLayout>)
}

export default App;
