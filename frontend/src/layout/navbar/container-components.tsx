import { chakra } from '@chakra-ui/system';

export const NavbarLayoutContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxShadow: '0 0 4px #aaa',
        padding: '8px 16px',
    },
});
