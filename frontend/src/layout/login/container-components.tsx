import { Flex } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';

export const Container = chakra(Flex, {
    baseStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        w: '100vw',
        h: '100vh',
    },
});

export const CenteredContainer = chakra(Flex, {
    baseStyle: {
        border: '1px solid lightgray',
        borderRadius: '8px',
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
