import  React ,{Component} from 'react'
import  {View, StyleSheet,ActivityIndicator,Dimensions,Text} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

let sibling = undefined

const Loading = {

    show: () => {
        sibling = new RootSiblings(
            <View style={styles.maskStyle}>
                <View style={styles.backViewStyle}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.textStyle}>正在加载...</Text>
                </View>

            </View>
        )
    },

    hidden: ()=> {
        if (sibling instanceof RootSiblings) {
            sibling.destroy()
        }
    }

}

const styles = StyleSheet.create({
        maskStyle: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center'
        },
        backViewStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: 120,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        textStyle:{
            marginTop:10,
            color:'white'

        }
    }
)

export {Loading}
