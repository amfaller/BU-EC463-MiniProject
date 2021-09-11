import { StyleSheet } from 'react-native'

const containers = StyleSheet.create({
    mainContainer: {
        padding: 20,
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: '#C5F797',
    },
    scrollViewStyle: {
        flex: 1,
        width: '100%',
        paddingTop: 15
    },
    titleContainer: {
        flex: 1,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    container: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
});

export default containers;