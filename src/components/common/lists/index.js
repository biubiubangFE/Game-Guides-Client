/**
 * Created by j_bleach on 2019/4/9.
 */
import Taro, {Component} from "@tarojs/taro"
import {ScrollView, View, Text} from "@tarojs/components"
import "./index.scss"

export default class GGLists extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor() {
    super(...arguments)
  }

  componentDidMount() {

  }

  onScrollLower() {
    console.log(2333)
  }

  render() {
    const {lists} = this.props
    const listView = lists && lists.map(v => {
        return <View className='gg-lists-box' key={v}>
          <View className='gg-lists-content'>
            <View className='gg-lists-content-head'>
              44222222222222222444555555
            </View>
            <View className='gg-lists-content-body'>444444444</View>
          </View>
          <View className='gg-lists-img'>244444441111</View>
        </View>
      })
    return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        enableBackToTop
        scrollTop='0'
        style='height: 94vh;'
        onScrollToLower={this.onScrollLower}
      >
        {listView}
      </ScrollView>
    )
  }
}
