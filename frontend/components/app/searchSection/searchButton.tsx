import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

export default function SearchButton() {
    return (
        <TouchableOpacity className="flex justify-center items-center rounded-full bg-indigo-500 p-3">
            <Feather name="search" size={16} color="white" />
        </TouchableOpacity>
    );
}
