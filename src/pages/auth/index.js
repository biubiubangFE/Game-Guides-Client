/**
 * Created by j_bleach on 2019/3/26.
 */
import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import './style.scss';

export default class Index extends Component {
    config = {
        navigationBarTitleText: "授权"
    }
    onGotUserInfo = () => {
        Taro.navigateBack();
    }

    render() {

        return (
            <View
                className="auth"
            >
                <Button
                    className="auth_button"
                    id='login-btn' 
                    openType="getUserInfo" 
                    lang="zh_CN" 
                    onGetUserInfo={this.onGotUserInfo} 
                    type='primary' >
                    确定授权
                </Button>
            </View>
        )
    }
}
