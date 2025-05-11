import { Spinner } from "@/components/ui/spinner"
import { View } from "react-native"
import colors from "tailwindcss/colors"

export default function Loader() {
	return (
		<View className="h-screen w-full flex justify-center items-center">
			<Spinner size="large" color={colors.purple[600]} />
		</View>
	)
}