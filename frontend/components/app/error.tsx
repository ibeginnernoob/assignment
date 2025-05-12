import { TouchableOpacity, View } from 'react-native';
import { Alert, AlertText } from '@/components/ui/alert';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Icon, CloseIcon } from '@/components/ui/icon';

export default function Error({
    message,
    setError,
}: {
    message: string;
    setError: React.Dispatch<
        React.SetStateAction<{
            isError: boolean;
            msg: string;
        }>
    >;
}) {
    return (
        <Alert
            action="success"
            className="bg-purple-700 rounded-lg max-w-[585px] w-full self-center items-start min-[400px]:items-center"
        >
            <View className="flex flex-row justify-between items-center w-full">
                <AlertText
                    className="font-semibold text-white w-[85%]"
                    size="sm"
                >
                    {message}
                </AlertText>
                <TouchableOpacity onPress={() => {
					setError(prevState => {
						return {
							...prevState,
							isError: false
						}
					})
				}}>
                    <Icon color="white" as={CloseIcon} />
                </TouchableOpacity>
            </View>
        </Alert>
    );
}
