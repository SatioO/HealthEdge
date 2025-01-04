import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';
import { useQuery } from 'react-query';

type Posts = {};

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  return posts;
};

export default function LoginScreen() {
  return (
    <View>
      <ThemedText>Hello</ThemedText>
    </View>
  );
}
