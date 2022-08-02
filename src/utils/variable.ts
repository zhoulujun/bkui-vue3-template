/**
 * 变量管理
 */
import { deepClone } from '@/utils/utils';
import dayjs from 'dayjs';

export const variableRegex = /\$(\w+)|\[\[([\s\S]+?)(?::(\w+))?\]\]|\${(\w+)(?:\.([^:^}]+))?(?::([^}]+))?}/g;
export type ScopedVars  = Record<string, any>;

export class VariablesService {
  private index: ScopedVars;
  private regex = variableRegex;
  constructor(variables: ScopedVars = {}) {
    this.index = variables;
  }
  public replace(target?: string, scopedVars?: ScopedVars): any {
    if (!target) {
      return target ?? '';
    }
    this.regex.lastIndex = 0;
    let value: unknown;
    target.replace(this.regex, (match, var1, var2, fmt2, var3) => {
      const variableName = var1 || var2 || var3;
      const variable = this.getVariableAtIndex(variableName);
      if (variableName === 'current_target') {};
      if (scopedVars) {
        value = this.getVariableValue(variableName, scopedVars);
      }
      value = value || variable;
      return '';
    });
    return value;
  }
  /**
   * @description: 变量翻译
   * @param {Record} source 含有变量的一个元数据
   * @param {ScopedVars} scopedVars 自定义变量对应数据
   * @return {*}
   */
  public transformVariables(source: Record<string, any> | string,  scopedVars?: ScopedVars) {
    if (typeof source === 'string') {
      return this.replace(source);
    }
    const newData = deepClone(source);
    const setVariables = (data: Record<string, any>) => {
      Object.keys(data).forEach((key) => {
        const val = data[key];
        if (typeof val === 'string') {
          if (this.hasVariables(val)) {
            const v = this.replace(val, scopedVars);
            data[key] = typeof v === 'undefined' ? '' : v;
          }
        } else if (Array.isArray(val)) {
          if (this.hasVariables(val)) {
            val.forEach((item, index) => {
              if (typeof item === 'string') {
                if (this.hasVariables(item)) {
                  const v = this.replace(item, scopedVars);
                  if (typeof v === 'undefined') {
                    val.splice(index, 1, undefined);
                  } else {
                    Array.isArray(v) ? val.splice(index, 1, ...v) : val.splice(index, 1, v);
                  }
                }
                data[key] = val.filter(v => typeof v !== 'undefined');
              } else if (Object.prototype.toString.call(item) === '[object Object]') {
                this.hasVariables(item) && setVariables(item);
              }
            });
          }
        } else if (Object.prototype.toString.call(val) === '[object Object]') {
          this.hasVariables(val) && setVariables(val);
        }
      });
    };
    setVariables(newData);
    return newData;
  }
  hasVariables(input: any) {
    return !!JSON.stringify(input).match(variableRegex);
  }
  private getVariableAtIndex(name: string) {
    if (!name) {
      return;
    }
    return this.index[name];
  }
  private getVariableValue(variableName: string, scopedVars: ScopedVars) {
    const scopedVar = scopedVars[variableName];
    if (!scopedVar) {
      return null;
    }
    return scopedVar;
  }
}


/**
 * 数据检索日期范围转换
 * @param {*} timeRange number | string | array
 */
export const handleTimeRange = (timeRange: number | string | string[]): { startTime: number; endTime: number } => {
  let startTime: string|number;
  let endTime: string|number;
  if (typeof timeRange === 'number') {
    endTime = dayjs().unix();
    startTime = endTime - timeRange / 1000;
  } else {
    switch (timeRange) {
      case 'today': // 今天到现在为止
        startTime = dayjs().format('YYYY-MM-DD 00:00:00');
        endTime = dayjs().unix();
        break;
      case 'yesterday': // 昨天
        startTime = dayjs().subtract(1, 'days')
          .format('YYYY-MM-DD 00:00:00');
        endTime = dayjs().subtract(1, 'days')
          .format('YYYY-MM-DD 23:59:59');
        break;
      case 'beforeYesterday': // 前天
        startTime = dayjs().subtract(2, 'days')
          .format('YYYY-MM-DD 00:00:00');
        endTime = dayjs().subtract(2, 'days')
          .format('YYYY-MM-DD 23:59:59');
        break;
      case 'thisWeek': // 本周一到现在为止
        startTime = dayjs().day(1)
          .format('YYYY-MM-DD 00:00:00');
        endTime = dayjs().unix();
        break;
      default:
        // 自定义时间段
        if (typeof timeRange === 'string') {
          const timeArr = timeRange.split('--');
          startTime = timeArr[0].trim();
          endTime = timeArr[1].trim();
        } else {
          startTime = timeRange[0];
          endTime = timeRange[1];
        }
        break;
    }
    endTime = typeof endTime === 'number' ? endTime : dayjs(endTime).unix();
    startTime = typeof startTime === 'number' ? startTime : dayjs(startTime).unix();
  }
  return {
    startTime,
    endTime,
  };
};
