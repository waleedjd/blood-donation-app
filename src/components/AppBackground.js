import React from 'react';
import {ScrollView, View} from 'react-native';
import {Colors} from '../config';
import Header from './Header';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const AppBackground = ({
  children,
  title,
  back = true,
  containerStyle = {},
  showHeader = true,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: showHeader ? 0 : getStatusBarHeight(),
      }}>
      {showHeader && <Header title={title} back={back} />}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,

          ...containerStyle,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default AppBackground;
