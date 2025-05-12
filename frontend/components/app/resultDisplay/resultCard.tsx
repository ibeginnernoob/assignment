import { Text, View } from 'react-native';

export default function ResultCard({ searchData } : {
	searchData: {
		status: string
		title: string
		phoneticTranscription: string
		partOfSpeech: string
		definition: string
		description: string
		synonyms: string[]
	}
}) {
    return (
        <View
            style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 11,
                },
                shadowOpacity: 0.9,
                shadowRadius: 22,
                elevation: 22,
            }}
            className="flex flex-col gap-1 mx-10 px-5 py-3 rounded-lg bg-white"
        >
            <Text className="capitalize text-2xl font-semibold text-purple-700">
                {searchData.title}
            </Text>
            <Text className="text-base">{searchData.phoneticTranscription}</Text>
            <View className="flex-row mt-2">
                <Text className="text-sm font-semibold px-3 py-1 rounded-lg text-white bg-purple-600">
                    {searchData.partOfSpeech.toLowerCase()}
                </Text>
            </View>
            <View className="my-3 flex flex-col gap-3">
                <Text className="italic">
                    "{searchData.definition}"
                </Text>
                <Text className="">
                    {searchData.description}
                </Text>
            </View>
            <View className='flex flex-col gap-2'>
                <Text className='text-base font-light'>Synonyms:</Text>
                <View className='flex flex-row flex-wrap gap-3'>
                    {searchData.synonyms.map((synonym: string) => {
                        return (
                            <View key={synonym} className='mb-1 px-2 py-1 bg-purple-100 rounded-xl'>
                                <Text className='text-sm font-semibold text-purple-600'>{synonym}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
