/**
 * Created by j_bleach on 2019/3/21.
 */
import Taro, { Component } from "@tarojs/taro"
import { View, Label } from "@tarojs/components"
import { observer, inject } from "@tarojs/mobx"
import withLogin from '@/components/common/withLogin';
import http from "@/service/http/index"
import Url from "@/config/url/detail"
import WxParse from '../../components/wxParse/wxParse'

import "./index.scss"


@inject("commonStore")
@observer
@withLogin('didShow')
class Index extends Component {

  config = {
    navigationBarTitleText: "资讯详情"
  }

  state = {
    data: null
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
    this.getDetail();
  }

  componentDidHide() {

  }

  parseData(content) {
    if (content) {
      WxParse.wxParse('article', 'html', content, this.$scope, 5);
    }
  }

  getDetail() {
    const params = {
      newsId: 283
    }
    http({
      url: Url.get,
      method: "POST",
      data: params,
      success: (data) => {
        let article = data.data;
        this.setState({
          data: article,
        });
        this.parseData(article.content);
      }
    })
  }

  getTimeInfo() {
    let now = new Date().getHours();
    let publishTime = new Date(this.state.data.publishTime).getHours();
    let day = Math.floor((now - publishTime) / 24);
    if (day === 0) {
      return '今天';
    } 
    if (day >=7) {
      return '一周前'
    } 
    return `${day}天前`
  }

  render() {
    const {data} = this.state;
    if (!data) {
      return null;
    }
    return (
      <View className='detail'>
        {
          data.thumpPath 
          ? <View className="detail_thump">
              <image src={data.thumpPath}></image>
              <View className="detail_thump_title">{data.title}</View>
            </View>
          : 
          <View className="detail_title">
            {data.title}
          </View>
        }
        
        <View className="detail_info">
          <View className="detail_info_author">{data.author}</View>
          <View className="detail_info_time">{this.getTimeInfo()}</View>
        </View>
        <View className="detail_content">
          <import src='../../components/wxParse/wxParse.wxml' />
          <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
        </View>
        <View className="detail_footer">
           <Label>作者: {data.author}</Label>
        </View>
      </View>
          )
        }
      }
      
      export default Index
