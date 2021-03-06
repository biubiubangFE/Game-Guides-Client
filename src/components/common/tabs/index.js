/**
 * Created by j_bleach on 2019/3/26.
 */
import Taro, {Component} from "@tarojs/taro"
import {View, Text} from "@tarojs/components"
import classNames from "classnames"
import "./index.scss"

export default class GGTabs extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor() {
    super(...arguments)
  }

  componentDidMount() {

  }

  handleClick(index) {
    this.props.onClick(index)
  }

  render() {
    const {
      className,
      tabHeads,
      current,
      headStyles,
    } = this.props

    const bodyStyle = {}
    const transformStyle = `translate3d(-${current * 100}%, 0px, 0px)`
    Object.assign(bodyStyle, {
      "transform": transformStyle,
      "-webkit-transform": transformStyle
    })

    const tabHead = tabHeads && tabHeads.map((item, idx) => {
        const itemCls = classNames({
          "tabs-head-item": true,
          "tabs-head-item-active": current === idx
        }, headStyles)
        const itemClsLine = classNames({
          "tabs-head-item-box": true,
          "tabs-head-item-line-active": current === idx
        })
        return <View
          className={itemCls}
          id={`tab${idx}`}
          key={item.title}
          onClick={this.handleClick.bind(this, idx)}
        >
          <Text className={itemClsLine}>{item.title}</Text>
        </View>
      })
    const rootCls = classNames({
      "gg-tabs": true
    }, className)

    return (
      <View
        className={rootCls}
      >
        <View
          className='tabs-head'
        >
          {tabHead}
        </View>
        <View
          className='tabs-body'
          style={bodyStyle}
          // onTouchStart={this.handleTouchStart.bind(this)}
          // onTouchEnd={this.handleTouchEnd.bind(this)}
          // onTouchMove={this.handleTouchMove.bind(this)}
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}
