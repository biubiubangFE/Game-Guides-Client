/**
 * Created by j_bleach on 2019/4/9.
 */
import Taro, {Component} from "@tarojs/taro"
import {ScrollView, View, Text, Image} from "@tarojs/components"
import moment from "moment"
// import {dateTransform} from "@/service/utils/index"
import "./index.scss"
import { formatImgSrc } from '../../../utils';

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
    this.props.onScrollLower()
  }

  render() {
    const {lists} = this.props
    // console.log(lists.length)
    const listView = lists && lists.map(v => {
        return <View className='gg-lists-box' key={v.newsId}>
          <View className='gg-lists-content'>
            <View className='gg-lists-content-head'>
              {v.title}
            </View>
            <View className='gg-lists-content-body'>
              <View>
                <Text
                  className='gg-lists-content-body-time'>{moment(v.publishTime * 1000).startOf("day").fromNow()}</Text>
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
