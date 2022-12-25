/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TaskModalScreen from "../screens/TaskModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import MainScreen from "../screens/MainScreen";
import TasksScreen from "../screens/TasksScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { ROUTES } from "../constants/Routes";
import { useDispatch } from "react-redux";
import { clearTasks } from "../store/tasks/Task.slice";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Упс!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={TaskModalScreen}
          options={{
            title: "Новое событие",
            headerRight: () => (
              <Pressable
                onPress={() => {
                  navigation.navigate(ROUTES.TASKS);
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="close"
                  size={18}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 22 }}
                />
              </Pressable>
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      initialRouteName={ROUTES.MAIN}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name={ROUTES.MAIN}
        component={MainScreen}
        options={{
          title: "Главная",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={ROUTES.TASKS}
        component={TasksScreen}
        options={() => ({
          title: "Мои события",
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate(ROUTES.MODAL)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="calendar-plus-o"
                size={18}
                color={Colors[colorScheme].text}
                style={{ marginLeft: 22 }}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                dispatch(clearTasks());
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="trash"
                size={18}
                color={Colors[colorScheme].text}
                style={{ marginRight: 22 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
