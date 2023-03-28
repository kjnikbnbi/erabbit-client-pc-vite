<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSku(item, val)" v-if="val.picture" :src="val.picture"
            :title="val.name">
          <span :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSku(item, val)" v-else>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import caPowerSet from '@/vender/caPowerSet'
// 得到一个路径字典对象
const spliter = '-'
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      const valueArr = sku.specs.map(val => val.valueName)
      const valueArrPowerSet = caPowerSet(valueArr)
      valueArrPowerSet.forEach(arr => {
        const key = arr.join(spliter)
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach(item => {
    item.values.forEach(val => {
      // 在路径字典中查找是否有数据
      val.disabled = !pathMap[val.name]
    })
  })
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    // 组建初始化：更新按钮禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 选中与！选中
    const changeSku = (item, val) => {
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        val.selected = true
      }
      // 点击按钮时更新按钮禁用状态
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
