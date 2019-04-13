/**
 * Created by j_bleach on 2019/4/13 0013.
 */
/**
 * Created by j_bleach on 2019/4/9.
 */
import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import "./index.scss";

export default class GGLists extends Component {
  static options = {
    addGlobalClass: true
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View className='weui-loadmore' hidden='{{isHideLoadMore}}'>
        <View className='weui-loading'></View>
        <View className='weui-loadmore__tips'>正在加载</View>
      </View>
    );
  }
}
