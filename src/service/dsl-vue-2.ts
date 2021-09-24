import { Dsl, DslResponse } from './dsl'
import * as generate from './dsl-lib/vue-2'

class DslVue2 extends Dsl {
  getCode(json: any): DslResponse { 
    // const res: DslResponse = {
    //   panelDisplay: [],
    // }
    json.componentName = 'page';
    const data = generate(json, this.option)
    console.log(data);
    return data;
  }
}

export default DslVue2;