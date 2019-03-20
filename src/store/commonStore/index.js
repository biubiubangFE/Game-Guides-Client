/**
 * Created by j_bleach on 2019/3/20.
 */
import {observable, action, configure} from "mobx";

configure({
  enforceActions: "observed"
});

class CommonStore {
  @observable counter = 0;

  // @action
  // async getBaiduToken(mapId) {
  //   this.mapId = mapId;
  //   try {
  //     const data = await http.put(normalUrl.getBaiduToken);
  //     runInAction(() => {
  //       this.baiduVoice = data.access_token;
  //     });
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  @action
  increment() {
    this.counter++
  }

  @action
  decrement() {
    this.counter--
  }
}


const commonStore = new CommonStore();


export default commonStore;
