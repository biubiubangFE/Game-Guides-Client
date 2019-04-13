/**
 * Created by j_bleach on 2019/4/9.
 */
import Taro, {Component} from "@tarojs/taro";
import {ScrollView, View, Text, Image} from "@tarojs/components";
import moment from "moment";
import {formatImgSrc} from "@/service/utils/index";
import GGLoading from "@/components/common/loading";
import "./index.scss";

export default class GGLists extends Component {
  static options = {
    addGlobalClass: true
  };

  constructor() {
    super(...arguments);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps) {
    if (nextProps.lists.length != this.props.lists.length) {
      this.setState({
        loading: false
      });
    }
    // console.log("nextProps", nextProps);
    // console.log("nextState", nextState);
  }

  onScrollLower() {
    this.setState({
      loading: true
    });
    this.props.onScrollLower();
  }

  onScrollToUpper() {
    this.props.onScrollToUpper();
  }

  navToDetail(id) {
    console.log(id)
    Taro.navigateTo({
      url: `/pages/detail/index?newsId=${id}`
    });
  }

  render() {
    const {lists} = this.props;
    const {loading} = this.state;
    // console.log(lists.length)
    const listView = lists && lists.map(v => {
      return <View className='gg-lists-box' key={v.newsId} onClick={this.navToDetail.bind(this, v.newsId)}>
        <View className='gg-lists-content'>
          <View className='gg-lists-content-head'>
            {v.title}
          </View>
          <View className='gg-lists-content-body'>
            <View>
              <Text className='gg-lists-content-body-time'>
                {moment(v.publishTime * 1000).startOf("day").fromNow()}
              </Text>
              <Text>{v.author}</Text>
            </View>
            <View>
              <Text className='gg-lists-content-body-time'>
                <text className='iconfont icon-info'></text>
              </Text>
            </View>
          </View>
        </View>
        <View className='gg-lists-img'>
          <Image style='height:13vh;width:100%' src={formatImgSrc(v.thumpPath)}></Image>
        </View>
      </View>;
    });
    return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        enableBackToTop
        scrollTop='0'
        style='height: 94vh;'
        onScrollToLower={this.onScrollLower}
        onScrollToUpper={this.onScrollToUpper}
      >
        {listView}
        {loading && <GGLoading></GGLoading>}
      </ScrollView>
    );
  }
}
