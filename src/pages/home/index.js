/**
 * Created by j_bleach on 2019/3/21.
 */
import Taro, {Component} from "@tarojs/taro"
import {View} from "@tarojs/components"
import {observer, inject} from "@tarojs/mobx"
import GGTabs from "@/components/common/tabs"

import "./index.scss"


@inject("commonStore")
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: "自走棋资讯"
  }

  state = {
    tabHeads: [
      {title: "刀塔自走棋"},
      {title: "绝地求生"},
      {title: "主机游戏"}
    ]
  }

  componentWillMount() {
  }

  componentWillReact() {
    console.log("componentWillReact")
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  increment = () => {
    const {commonStore} = this.props
    commonStore.increment()
    console.log(commonStore)
  }

  decrement = () => {
    const {commonStore} = this.props
    commonStore.decrement()
  }

  render() {
    const {commonStore: {counter}} = this.props
    const {tabHeads} = this.state
    console.log(tabHeads)
    return (
      <View className='home'>
        <GGTabs tabHeads={tabHeads} current={1}></GGTabs>
      </View>
    )
  }
}

export default Index
