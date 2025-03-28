import * as React from 'react';
import Svg, { Text, Path, Circle } from 'react-native-svg';

function Logo(props: any) {
  return (
    <Svg
      width={200}
      height={60}
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <Text
        x={10}
        y={40}
        fontFamily="Arial, sans-serif"
        fontSize={24}
        fontWeight="bold"
        fill="#1A365D"
      >
        {'Reach'}
      </Text>
      <Text
        x={80}
        y={40}
        fontFamily="Arial, sans-serif"
        fontSize={24}
        fontWeight="bold"
        fill="#805AD5"
      >
        {'Specialist'}
      </Text>
      <Path d="M50 20L65 5l15 15" stroke="#1A365D" strokeWidth={4} />
      <Circle cx={65} cy={5} r={3} fill="#805AD5" />
    </Svg>
  );
}

export default Logo;
