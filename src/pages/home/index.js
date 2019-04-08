/**
 * Created by j_bleach on 2019/3/21.
 */
import Taro, {Component} from "@tarojs/taro"
import {View} from "@tarojs/components"
import {observer, inject} from "@tarojs/mobx"
import GGTabs from "@/components/common/tabs"
import withLogin from '@/components/common/withLogin';
import http from "@/service/http/index"
import Url from "@/config/url/home"

import "./index.scss"


@inject("commonStore")
@observer
@withLogin('didShow')
class Index extends Component {

  config = {
    navigationBarTitleText: "自走棋资讯"
  }

  state = {
    tabHeads: [
      {title: "刀塔自走棋"},
      {title: "绝地求生"},
      {title: "主机游戏"}
    ],
    current: 0
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
    this.getList();
  }

  componentDidHide() {
  }

  getList() {
    const {current} = this.state
    const params = {
      gameType: current + 1
    }
    http({
      url: Url.list,
      method: "POST",
      data: params,
      success: (data) => {
        console.log("data", data)
      }
    })
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

  chooseTab(index) {
    this.setState({
      current: index
    }, () => {
      this.getList()
    })
  }

  render() {
    const {commonStore: {counter}} = this.props
    const {tabHeads, current} = this.state
    return (
      <View className='home'>
        <GGTabs tabHeads={tabHeads} current={current} onClick={this.chooseTab.bind(this)}></GGTabs>
      </View>
    )
  }
}

export default Index
