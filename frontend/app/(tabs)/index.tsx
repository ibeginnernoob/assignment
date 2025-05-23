import axios from 'axios';
import ResultCard from '@/components/app/resultDisplay/resultCard';
import Searchbar from '@/components/app/searchSection/seachbar';
import SearchButton from '@/components/app/searchSection/searchButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Loader from '@/components/app/loader';
import ErrorDisplay from '@/components/app/error';

const DEV_URL = 'http://192.168.1.245:3000';
const PROD_URL = 'https://assignment-msw1.onrender.com'

interface SearchDataFormat {
    status: string;
    title: string;
    phoneticTranscription: string;
    partOfSpeech: string;
    definition: string;
    description: string;
    synonyms: string[];
}

interface Data {
    type: 'Data';
    searchData: SearchDataFormat;
}

interface Error {
    type: 'Error';
    msg: string;
}

type responseData = Error | Data;

export default function HomeScreen() {
    const [word, setWord] = useState<string>('');

    const [error, setError] = useState({
        isError: false,
        msg: '',
    });
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState<SearchDataFormat>({
        status: '',
        title: '',
        phoneticTranscription: '',
        partOfSpeech: '',
        definition: '',
        description: '',
        synonyms: [],
    });

    const search = async () => {
        try {
            setLoading(true);
            setSearchData({
                status: '',
                title: '',
                phoneticTranscription: '',
                partOfSpeech: '',
                definition: '',
                description: '',
                synonyms: [],
            });			
            const { status, data } = await axios.get<responseData>(
                `${PROD_URL}/search/${word.trim()}`
            );			
			console.log(data)
            if (data.type === 'Error') {
                throw new Error(data.msg);
            } else {
                setSearchData((_) => {
                    return {
                        ...data.searchData,
                    };
                });
            }
        } catch (e: any) {
            console.log(e.message);
            setError((_) => {
                return {
                    isError: true,
                    msg: e.message as string,
                };
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <LinearGradient colors={['white', '#a78bfa']} className="h-screen">
            {error.isError && (
                <View className="fixed top-32 px-8">
                    <ErrorDisplay message={error.msg} setError={setError} />
                </View>
            )}
            <View className="h-full w-full flex flex-col justify-center items-center">
                <ScrollView className="w-full mt-40 mb-20">
                    <View className="flex flex-col gap-5">
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
                                <SearchButton search={search} />
                            </View>
                            {searchData.title && searchData.title.length !== 0 &&
                                !error.isError && (
                                    <ResultCard searchData={searchData} />
                                )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}
