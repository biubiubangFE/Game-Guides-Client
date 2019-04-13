/**
 * Created by j_bleach on 2019/3/21.
 */
import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {observer, inject} from "@tarojs/mobx";
import GGTabs from "@/components/common/tabs";
import GGTabsBody from "@/components/common/tabs/body";
import GGList from "@/components/common/lists";
import withLogin from "@/components/common/withLogin";
import http from "@/service/http/index";
import Url from "@/config/url/home";
import "./index.scss";

const regeneratorRuntime = require("@/assets/script/regenerator-runtime/runtime");

@inject("commonStore")
@observer
@withLogin("didShow")
class Index extends Component {

  config = {
    navigationBarTitleText: "自走棋资讯"
  };

  state = {
    tabHeads: [
      {title: "刀塔自走棋"},
      {title: "绝地求生"},
      {title: "主机游戏"}
    ],
    current: 0,
    pageNoOne: 1,
    pageNoTwo: 1,
    pageNoThree: 1,
    listsOne: [], // 自走棋列表
    listsTwo: [], // 吃鸡列表
    listsThree: [] // 主机游戏列表
  };

  componentWillMount() {
  }

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.initList();
  }

  componentDidHide() {
  }

  async initList() {
    await this.getList("One", 1);
    await this.getList("Two", 2);
    await this.getList("Three", 3);
  }

  getList(type, curr) {
    const {current} = this.state;
    const pageNum = this.state[`pageNo${type}`];
    const listType = `lists${type}`;
    const params = {
      gameType: curr || current + 1,
      pageNo: pageNum
    };
    return new Promise((res) => {
      http({
        url: Url.list,
        method: "POST",
        data: params,
        success: (data) => {
          console.log(55555);
          this.setState({
            [listType]: pageNum == 1
              ? data.resultList
              : this.state[listType].concat(data.resultList)
          });
          res();
        }
      });
    });
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
      // pageNo: 1
    });
  }

  onScrollLower(index) {
    console.log(index);
    this.setState({
      [`pageNo${index}`]: this.state[`pageNo${index}`] + 1
    }, () => {
      this.getList(index);
    });
  }

  render() {
    // const {commonStore: {counter}} = this.props
    const {tabHeads, current, listsOne, listsTwo, listsThree} = this.state;
    return (
      <View className='home'>
        <GGTabs tabHeads={tabHeads} current={current} onClick={this.chooseTab.bind(this)}>
          <GGTabsBody current={current} index={0}>
            <GGList lists={listsOne} onScrollLower={this.onScrollLower.bind(this, "One")}></GGList>
          </GGTabsBody>
          <GGTabsBody current={current} index={1}>
            <GGList lists={listsTwo} onScrollLower={this.onScrollLower.bind(this, "Two")}></GGList>
          </GGTabsBody>
          <GGTabsBody current={current} index={2}>
            <GGList lists={listsThree} onScrollLower={this.onScrollLower.bind(this, "Three")}></GGList>
          </GGTabsBody>
        </GGTabs>
      </View>
    );
  }
}

export default Index;
