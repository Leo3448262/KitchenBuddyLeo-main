

import React, { useState } from 'react';
import { ColorValue, Pressable, Text } from 'react-native';

type BuddyButtonProps = {
    text: string;
    borderColor: ColorValue | undefined;
    onPress: () => void,
    onPressBgColor: string
};

const BuddyButton: React.FC<BuddyButtonProps> = ({ text, borderColor, onPress, onPressBgColor }) => {
    const [buttonBgColor, setButtonBgColor] = useState('#ffffffb7')
    const [buttonColor, setButtonColor] = useState('black')


    const handlePressedInStyle = () => {
        setButtonBgColor(onPressBgColor)
        setButtonColor('white')
    }

    const handlePressedOutStyle = () => {
        setButtonBgColor('#ffffffb7')
        setButtonColor('black')
    }

    return (
        <Pressable
            style={{
                margin: 50,
                borderColor: borderColor,
                borderWidth: 1,
                marginTop: 20,
                backgroundColor: buttonBgColor,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
            }}
            onPressIn={handlePressedInStyle}
            onPressOut={handlePressedOutStyle}
            onPress={onPress}
        >
            <Text style={{ color: buttonColor }}>{text}</Text>
        </Pressable>
    );
};

export default BuddyButton;
