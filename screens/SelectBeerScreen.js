import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import MyListItem from '../components/MyListItem';
import debounce from 'lodash.debounce';

export default function SelectBeerScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [nextPage, setNextPage] = useState(1);
  const [searchLimit, setSearchLimit] = useState(8);

  const fetchData = async (name, page, limit) => {
    if (!page) return;
    const nameString = name || '';
    const pageString = page ? '?page=' : '';
    const limitString = limit ? '&limit=' : '';
    const pageValue = page || '';
    const limitValue = limit || '';

    try {
      let res = await fetch(
        `http://192.168.0.101:3001/beer/${nameString}${pageString}${pageValue}${limitString}${limitValue}`
      );
      res = await res.json();
      setData([...data, ...res.results]);
      if (!res.next) setNextPage(null);
      else setNextPage(res.next.page);
      setSearchLimit(res.next?.limit || searchLimit);
      return res;
    } catch (err) {
      return console.error(err);
    }
  };

  const handleChange = async (value) => {
    setNextPage(1);
    setData([]);
    fetchData(value, nextPage, searchLimit);
    setValue(value);
  };

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 300), []);

  useEffect(() => {
    return () => {
      debouncedHandleChange.cancel();
    };
  }, []);

  useEffect(() => {
    fetchData(value, nextPage, searchLimit);
  }, []);

  return (
    <View style={styles.container}>
      <Input
        onChangeText={debouncedHandleChange}
        style={styles.input}
        placeholder="Search for beers"
      />

      <FlatList
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchData(value, nextPage, searchLimit)}
        data={data}
        renderItem={({ item }) => <MyListItem item={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginTop: 30,
  },
});
