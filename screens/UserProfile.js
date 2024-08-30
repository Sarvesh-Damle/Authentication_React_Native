import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UserProfile({navigation, route}) {
  const [userData, setUserData] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const {username} = route.params;

  const fetchData = async () => {
    try {
      const response = await axios.post('http://192.168.29.17:5002/example', {
        username,
      });
      const result = response.data;
      if (isMounted) {
        if (result.status === 'SUCCESS' && result.data) {
          setUserData([result.data]);
        } else {
          console.error('Unexpected response format: ', result);
        }
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchData();

    return () => {
      setIsMounted(false);
    };
  }, [username]);

  return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.titleText}>
              Username: <Text style={styles.bodyText}>{item.username}</Text>
            </Text>
            <Text style={styles.titleText}>
              Email: <Text style={styles.bodyText}>{item.email}</Text>
            </Text>
            <Text style={styles.titleText}>
              Phone-Number:{' '}
              <Text style={styles.bodyText}>{item.phone_number}</Text>
            </Text>
            <Text style={styles.titleText}>
              Gender: <Text style={styles.bodyText}>{item.gender}</Text>
            </Text>
            <Text style={styles.titleText}>
              Date of Birth: <Text style={styles.bodyText}>{item.dob}</Text>
            </Text>
            <Text style={styles.titleText}>
              Address: <Text style={styles.bodyText}>{item.address}</Text>
            </Text>
            <Text style={styles.titleText}>
              City: <Text style={styles.bodyText}>{item.city}</Text>
            </Text>
            <Text style={styles.titleText}>
              Country: <Text style={styles.bodyText}>{item.country}</Text>
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No Users Found!</Text>}
        // refreshing={refreshing}
        // onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    padding: 16,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  titleText: {
    fontSize: 18,
  },
  bodyText: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});
