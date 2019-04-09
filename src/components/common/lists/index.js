/**
 * Created by j_bleach on 2019/4/9.
 */
import Taro, {Component} from "@tarojs/taro"
import {ScrollView, View} from "@tarojs/components"
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
        return <View></View>
      })
    return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        enableBackToTop
        scrollTop='0'
        style='height: 100vh;background-color:red'
        onScrollToLower={this.onScrollLower}
      >
        {listView}
      </ScrollView>
    )
  }
}
