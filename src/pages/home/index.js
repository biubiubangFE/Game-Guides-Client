/**
 * Created by j_bleach on 2019/3/21.
 */
import Taro, {Component} from "@tarojs/taro"
import {View} from "@tarojs/components"
import {observer, inject} from "@tarojs/mobx"

import "./index.scss"


@inject("commonStore")
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: "自走棋资讯",
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
    return (
      <View className='index'>
        {counter}
      </View>
    )
  }
}

export default Index
