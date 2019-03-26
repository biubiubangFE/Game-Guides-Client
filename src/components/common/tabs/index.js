/**
 * Created by j_bleach on 2019/3/26.
 */
import Taro, {Component} from "@tarojs/taro"
import {View, Text} from "@tarojs/components"
import classNames from "classnames"

export default class GGTabs extends Component {
  constructor() {
    super(...arguments)
  }

  componentDidMount() {

  }

  render() {
    const {
      className,
      tabHeads,
      current
    } = this.props

    const bodyStyle = {}
    const transformStyle = `translate3d(-${current * 100}%, 0px, 0px)`
    Object.assign(bodyStyle, {
      "transform": transformStyle,
      "-webkit-transform": transformStyle
    })

    const tabHead = tabHeads && tabHeads.map((item, idx) => {
        console.log(typeof current)
        const itemCls = classNames({
          "tabs-head-item": true,
          "tabs-head-item-active": current === idx
        })
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
    // const tabBody = tabList.map((item, idx) => {
    //   const itemCls = classNames({
    //     "at-tabs__item": true,
    //     "at-tabs__item--active": current === idx
    //   })
    //   return <View
    //     className={itemCls}
    //     id={`tab${idx}`}
    //     key={item.title}
    //     onClick={this.handleClick.bind(this, idx)}
    //   >
    //     {item.title}
    //     <View className='at-tabs__item-underline'></View>
    //   </View>
    // })
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
        {/*<View*/}
        {/*className='tabs-body'*/}
        {/*onTouchStart={this.handleTouchStart.bind(this)}*/}
        {/*onTouchEnd={this.handleTouchEnd.bind(this)}*/}
        {/*onTouchMove={this.handleTouchMove.bind(this)}*/}
        {/*>*/}
        {/*{tabBody}*/}
        {/*</View>*/}
      </View>
    )
  }
}
