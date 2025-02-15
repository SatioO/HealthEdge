import { useAuth } from '@/components/providers/AuthProvider';
import { View } from 'react-native';

export default function DashboardScreen() {
  const auth = useAuth();

  return <View>Dashboard</View>;
}
