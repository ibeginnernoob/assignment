import { Text, View } from 'react-native';

const SYNONYMS = ['light synthesis', 'carbon fixation', 'biosynthesis'];
const definition = 'The process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.'
const description = 'The conversion of light energy into chemical energy by living organisms.'

export default function ResultCard() {
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
            <Text className="text-2xl font-semibold text-purple-700">
                Photosynthesis
            </Text>
            <Text className="text-base">/ˌfoʊtoʊˈsɪnθəsɪs/</Text>
            <View className="flex-row mt-2">
                <Text className="text-sm font-semibold px-3 py-1 rounded-lg text-white bg-purple-600">
                    noun
                </Text>
            </View>
            <View className="my-3 flex flex-col gap-3">
                <Text className="italic">
                    "{definition}"
                </Text>
                <Text className="">
                    {description}
                </Text>
            </View>
            <View className='flex flex-col gap-2'>
                <Text className='text-base font-light'>Synonyms:</Text>
                <View className='flex flex-row flex-wrap gap-3'>
                    {SYNONYMS.map((synonym: string) => {
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
