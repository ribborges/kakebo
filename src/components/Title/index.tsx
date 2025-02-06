import { Text } from 'react-native';

export default function Title({ children }: { children: string }) {
    return (
        <Text className='text-xl text-center font-bold m-2 text-zinc-950 dark:text-zinc-100'>{children}</Text>
    );
}