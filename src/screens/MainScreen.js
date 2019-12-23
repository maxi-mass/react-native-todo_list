import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { PostList } from "../components/PostList";
import { loadPosts } from "../store/actions/postActions";

export const MainScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate("Post", {
      postId: post.id,
      postDate: new Date(post.date).toLocaleDateString(),
      booked: post.booked
    });
  };

  const dispatch = useDispatch();
  const loading = useSelector(state => state.post.loading);
  // if (loading) {
  //   return <View style={styles.center}>
  //     <ActivityIndicator />
  //   </View>
  // }
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);
  const data = useSelector(state => state.post.allPosts);
  return <PostList onOpen={openPostHandler} data={data} />;
};

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "My blog",
  headerRight: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Take photo"
        iconName="ios-camera"
        onPress={() => navigation.navigate("Create")}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle Drawer"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
