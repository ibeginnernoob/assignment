import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

export default function SearchButton({ search } : {
	search: () => Promise<void>
}) {
    return (
        <TouchableOpacity
			className="flex justify-center items-center rounded-full bg-indigo-500 p-3"
			onPress={async () => {
				await search()
			}}
		>
            <Feather name="search" size={16} color="white" />
        </TouchableOpacity>
    );
}
