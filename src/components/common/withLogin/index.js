
/**
 * 通过高阶组件的形式对需要的组件进行登录检查，并在需要的情况下进行自动登录
 */
import Taro, { Component } from "@tarojs/taro"
import regeneratorRuntime from '../../../assets/script/regenerator-runtime/runtime';

const baseUrl = "https://api.mhdss.com/game-guides-service";

const LIFE_CYCLES = ['willMount', 'didMount', 'didShow'];

console.log(regeneratorRuntime);

function withLogin(lifecycle = 'willMount') {

    if (!LIFE_CYCLES.includes(lifecycle)) {
        console.warn(
            `传入的生命周期${lifecycle}不存在, 鉴权判断异常 `
        );
        return Component => Component;
    }

    return function withLoginComponent(Component) {

        // if (tool.isH5()) {
        //     return Component;
        // }

        return class WithLogin extends Component {

            async componentWillMount() {
                if (super.componentWillMount) {
                    if (lifecycle === LIFE_CYCLES[0]) {
                        const res = await this.$_autoLogin();
                        if (!res) return;
                    }
                }
                super.componentWillMount();
            }

            async componentDidMount() {
                if (super.componentWillMount) {
                    if (lifecycle === LIFE_CYCLES[1]) {
                        const res = await this.$_autoLogin();
                        if (!res) return;
                    }
                }
                super.componentDidMount();
            }

            async componentDidShow() {
                if (super.componentWillMount) {
                    if (lifecycle === LIFE_CYCLES[2]) {
                        const res = await this.$_autoLogin();
                        if (!res) return;
                    }
                }
                super.componentDidShow();
            }

            // 登陆逻辑
            $_autoLogin = async () => {
                // 登陆需要code、iv、encryptedData信息
                // 存在sessionKey就返回true
                if (Taro.getStorageSync('sessionKey')) {
                    return true;
                }
                
                // 登录wx后端
                const wxLoginInfo = await Taro.login();
                if (wxLoginInfo.code) {
                    const wxSetting =  await Taro.getSetting();
                    // 检查是否进行授权
                    if (!wxSetting.authSetting['scope.userInfo']) {
                        Taro.navigateTo({
                            url: `/pages/auth/index`
                        });
                    } else {
                        const userInfo = await Taro.getUserInfo();
                        Taro.setStorageSync('userInfo', userInfo);
                        // 登录mdhss后端
                        const mdhLogin = await Taro.request({
                            url: baseUrl + '/wx/login',
                            method: 'POST',
                            data: {
                                code: wxLoginInfo.code,
                                encryptedData: userInfo.encryptedData,
                                iv: userInfo.iv
                            },
                            header: {
                                'content-type': 'application/json;charset=UTF-8;' // 默认值
                            }
                        })
                        if (mdhLogin.data.data) {
                            Taro.setStorageSync('sessionKey', res.data.data.sessionKey)
                            return true;
                        } else {
                            console.log('登录失败！')
                            return false;
                        }
                    }
                }
            }
        }
    }

}

export default withLogin;
