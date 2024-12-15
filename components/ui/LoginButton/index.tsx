import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

type LoginButtonProps = {
    title: string,
    bgColor?: string
}

export default function LoginButton({ bgColor = "#FFF", ...props}: LoginButtonProps){
    return <View style={{ 
        height: 50, 
        width: 200, 
        display: "flex", 
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor
    }}>
        <ThemedText darkColor="red">{props.title}</ThemedText>
    </View>
}
