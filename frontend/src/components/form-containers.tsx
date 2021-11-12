import { Flex } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';

export const Container = chakra(Flex, {
    baseStyle: {
        backgroundColor: 'teal',
        alignItems: 'center',
        justifyContent: 'center',
        w: '100vw',
        h: '100vh',
    },
});

export const CenteredContainer = chakra(Flex, {
    baseStyle: {
        backgroundColor: 'white',
        border: '1px solid lightgray',
        borderRadius: '8px',
        boxShadow: '2px 2px 2px gray',
        p: '32px',
        flexDirection: 'column',
        gap: '16px',
    },
});

export const Title = chakra('div', {
    baseStyle: {
        textAlign: 'center',
        fontSize: '1.5rem',
        marginBottom: '1rem',
    },
});
