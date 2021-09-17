import { StyleSheet } from 'react-native'

const fonts = StyleSheet.create({
    titleFont: {
        fontFamily: "Poppins-Regular",
        fontSize: 64,
        color: '#1F2226',
    },
    cardTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 48,
        color: '#1F2226',
        lineHeight: 50,

        left: '5%',
        top: '8%',
    },
    buttonTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 48,
        color: '#1F2226',
        lineHeight: 50,
        textAlignVertical: 'center',

        left: '5%',
    },
    barTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: '#1F2226',
    },
    barContent: {
        fontFamily: 'Poppins-Regular',
        fontSize: 24,
        color: '#1F2226',
    }
});

export default fonts;