import * as _ from 'lodash'
import * as prettier from 'prettier'
interface DslResponse {
  panelDisplay: any[];
}
interface DslOption {
  _: any,
  responsive: any,
  prettier: any,
}
class Dsl {
  _ = _;
  option: DslOption = {
    _: _,
    responsive: {},
    prettier: prettier,
  }
  constructor() {
  }
  getCode(json: string): DslResponse { return {panelDisplay: []} }
}
export {
  Dsl,
  DslResponse
};
