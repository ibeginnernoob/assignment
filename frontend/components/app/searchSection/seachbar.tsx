import { Input, InputField } from '@/components/ui/input';
import React from 'react';

export default function Searchbar({ word, setWord } : {
	word: string,
	setWord: React.Dispatch<React.SetStateAction<string>> 
}) {
    return (
        <Input
            variant="outline"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            className="h-fit px-1 py-2 bg-white font-roboto border-[0.1px] border-solid border-gray-300 rounded-lg"
        >
            <InputField
				value={word}
				onChange={(e) => setWord(e.nativeEvent.text)}
                placeholder="Type any word..."
                className="text-base"
            />
        </Input>
    );
}
