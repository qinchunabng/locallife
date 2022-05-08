import { action, observable} from 'mobx-miniprogram'

export const store = observable({
  numA: 1,
  numB: 2,
  //计算属性
  get sum(){
    return this.numA + this.numB;
  },
  updateNumA: action(function(step) {
    this.numA += step
  }),
  updateNumB: action(function(step){
    this.numB += step
  })
});