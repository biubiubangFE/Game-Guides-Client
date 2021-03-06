import Taro, {Component} from "@tarojs/taro"
import {Provider} from "@tarojs/mobx"

import Index from "./pages/detail/index"

import stores from "@/store/index";

import "./app.scss"
import "@/assets/iconfont/iconfont.css";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      "pages/home/index",
      "pages/auth/index",
      "pages/detail/index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#0d1e20",
      navigationBarTextStyle: "white",
      backgroundColor: "#0BAFC1"
    },
    tabBar: {
      list: [
        {
          "pagePath": "pages/home/index",
          "text": "首页"
          // "iconPath": "assets/img/home.png",
          // "selectedIconPath": "assets/img/home-active.png",
        },
        {
          "pagePath": "pages/detail/index",
          "text": "游戏"
          // "iconPath": "assets/img/home.png",
          // "selectedIconPath": "assets/img/home-active.png",
        }
      ]
    }
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={stores}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById("app"))
