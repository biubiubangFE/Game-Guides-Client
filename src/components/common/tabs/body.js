/**
 * Created by j_bleach on 2019/4/3.
 */
import Taro, {Component} from "@tarojs/taro"
import {View} from "@tarojs/components"
import classNames from "classnames"
import "./body.scss"

export default class GGTabs extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor() {
    super(...arguments)
  }

  componentDidMount() {

  }

  render() {
    const {
      customStyle,
      className,
      index,
      current
    } = this.props
    return (
      <View
        className={
          classNames({
            'at-tabs-pane': true,
            'at-tabs-pane--active': index === current,
            'at-tabs-pane--inactive': index !== current
          }, className)
        }
      >
        {this.props.children}
      </View>
    )
  }
}
