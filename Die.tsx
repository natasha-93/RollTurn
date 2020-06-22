import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

import One from './img/one.svg';
import Two from './img/two.svg';
import Three from './img/three.svg';
import Four from './img/four.svg';
import Five from './img/five.svg';
import Six from './img/six.svg';

export type DieValue = keyof typeof NumberDieMap;

type DieProps = {
  value: DieValue;
  style?: React.CSSProperties;
  size?: number;
};

const NumberDieMap = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
};

export default function Die({value, style, size = 100}: DieProps) {
  const Component = NumberDieMap[value];
  return <Component width={size} height={size} style={style} />;
}
