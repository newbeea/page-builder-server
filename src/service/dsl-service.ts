import { Provide } from '@midwayjs/decorator';
import { Dsl } from './dsl';
import DslVue2 from './dsl-vue-2';


@Provide()
export class DslService {
  async getCode(dslType: string, json: any) {
    let dsl: Dsl;
    if (dslType === 'vue@2') {
      dsl = new DslVue2();
    }
    return dsl.getCode(json);
  }
}
