import React from "react";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { THEME } from "../theme";
import { BookedScreen } from "../screens/BookedScreen";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff"
  },
  headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR
};

const PostNavigator = createStackNavigator(
  {
    Main: MainScreen, // можно так
    Post: {
      screen: PostScreen // запись идентична первой, просто можно и так
    }
  },
  {
    initialRouteName: "Main", // можно не передавать, по умолчанию будет показываться первый роут, передаю просто для примера
    defaultNavigationOptions
  }
);

const AboutNavigator = createStackNavigator(
  {
    Main: AboutScreen
  },
  {
    defaultNavigationOptions
  }
);

const CreateNavigator = createStackNavigator(
  {
    Main: CreateScreen
  },
  {
    defaultNavigationOptions
  }
);

const BookedNavigator = createStackNavigator(
  {
    Booked: BookedScreen,
    Post: PostScreen
  },
  {
    initialRouteName: "Booked",
    defaultNavigationOptions
  }
);

const bottomTabsConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: "Все",
      tabBarIcon: info => (
        <Ionicons name="ios-albums" size={25} color={info.tintColor} />
      )
    }
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: "Избранное",
      tabBarIcon: info => (
        <Ionicons name="ios-star" size={25} color={info.tintColor} />
      )
    }
  }
};

const BottomNavigator =
  Platform.OS == "android"
    ? createMaterialBottomTabNavigator(bottomTabsConfig, {
        shifting: true,
        activeTintColor: "#fff",
        barStyle: {
          backgroundColor: THEME.MAIN_COLOR
        }
      })
    : createBottomTabNavigator(bottomTabsConfig, {
        tabBarOptions: {
          activeTintColor: THEME.MAIN_COLOR
        }
      });

const MainNavigator = createDrawerNavigator(
  {
    PostTabs: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerLabel: "Главная",
        drawerIcon: <Ionicons name="ios-star" />
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: "О приложении"
      }
    },
    Create: {
      screen: CreateNavigator,
      navigationOptions: {
        drawerLabel: "Добавить"
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: THEME.MAIN_COLOR,
      labelStyle: {
        fontFamily: "play-bold"
      }
    }
  }
);
export const AppNavigation = createAppContainer(MainNavigator);
