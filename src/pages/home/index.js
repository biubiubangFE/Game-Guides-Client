/**
 * Created by j_bleach on 2019/3/21.
 */
import Taro, {Component} from "@tarojs/taro"
import {View} from "@tarojs/components"
import {observer, inject} from "@tarojs/mobx"
import GGTabs from "@/components/common/tabs"
import GGTabsBody from "@/components/common/tabs/body"
import GGList from "@/components/common/lists"
import withLogin from "@/components/common/withLogin";
import http from "@/service/http/index"
import Url from "@/config/url/home"

import "./index.scss"


@inject("commonStore")
@observer
@withLogin("didShow")
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
    current: 0,
    pageNo: 1,
    lists: [1, 3, 4, 5, 6]
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
    const {current, pageNo} = this.state
    const params = {
      gameType: current + 1,
      pageNo: pageNo
    }
    http({
      url: Url.list,
      method: "POST",
      data: params,
      success: (data) => {
        console.log(11111, data)
        this.setState({
          lists: pageNo == 1
            ? data.resultList
            : this.state.lists.concat(data.resultList)
        })
      }
    })
  }

  // increment = () => {
  //   const {commonStore} = this.props
  //   commonStore.increment()
  //   console.log(commonStore)
  // }
  //
  // decrement = () => {
  //   const {commonStore} = this.props
  //   commonStore.decrement()
  // }

  chooseTab(index) {
    this.setState({
      current: index,
      pageNo: 1
    }, () => {
      this.getList()
    })
  }

  onScrollLower() {
    this.setState({
      pageNo: this.state.pageNo + 1
    }, () => {
      this.getList()
    })
  }

  render() {
    // const {commonStore: {counter}} = this.props
    const {tabHeads, current, lists} = this.state
    return (
      <View className='home'>
        <GGTabs tabHeads={tabHeads} current={current} onClick={this.chooseTab.bind(this)}>
          <GGTabsBody current={current} index={0}>
            <GGList lists={lists} onScrollLower={this.onScrollLower.bind(this)}></GGList>
          </GGTabsBody>
          <GGTabsBody current={current} index={1}>
            <GGList lists={lists} onScrollLower={this.onScrollLower.bind(this)}></GGList>
          </GGTabsBody>
          <GGTabsBody current={current} index={2}>
            <GGList lists={lists} onScrollLower={this.onScrollLower.bind(this)}></GGList>
          </GGTabsBody>
        </GGTabs>
      </View>
    )
  }
}

export default Index
