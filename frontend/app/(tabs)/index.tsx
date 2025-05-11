import ResultCard from '@/components/app/resultDisplay/resultCard';
import Searchbar from '@/components/app/searchSection/seachbar';
import SearchButton from '@/components/app/searchSection/searchButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
    const [word, setWord] = useState<string>('');

    return (
        <LinearGradient colors={['white', '#a78bfa']} className="h-screen">
            <View className="h-full w-full flex flex-col justify-center items-center gap-5">
                <View className="w-full flex flex-col items-center">
                    <Text className="text-4xl font-semibold text-purple-800">
                        Dictionary
                    </Text>
                    <Text className="text-lg text-blue-800">
                        Look up any word to learn its meaning
                    </Text>
                </View>
                <View className="flex flex-col w-full gap-10">
                    <View className="flex flex-row items-center gap-6 w-full pl-10 pr-6">
                        <View className="flex-1">
                            <Searchbar word={word} setWord={setWord} />
                        </View>
                        <SearchButton />
                    </View>
                    <ResultCard />
                </View>
            </View>
        </LinearGradient>
    );
}
