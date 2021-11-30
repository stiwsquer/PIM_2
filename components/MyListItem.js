import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { navigate } from '../navigation/RootNavigation';

export default function MyListItem({ item }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('CreateNote', { item });
      }}
    >
      <ListItem key={item.id} bottomDivider style={styles.item}>
        <ListItem.Content style={styles.listContent}>
          <ListItem.Title style={styles.itemTitle}>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  item: { padding: 10 },
  itemTitle: { flex: 1, fontSize: 24 },
});
