import { Text, TouchableOpacity } from 'react-native';

interface TextLinkProps {
    onPress?: () => void;
    children?: string;
}

export default function TextLink(props: TextLinkProps) {
    return (
        <TouchableOpacity onPress={props.onPress} className='p-2'>
            <Text className='text-yellow-600 text-center'>{props.children}</Text>
        </TouchableOpacity>
    );
}