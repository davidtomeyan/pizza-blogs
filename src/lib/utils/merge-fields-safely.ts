import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';
import cloneDeep from 'lodash/cloneDeep';

export function mergeFieldsSafely<T, S>(target: T, source: S): T & S {
  return mergeWith(cloneDeep(target), cloneDeep(source), (value, srcValue) => {
    if (isArray(value) && isArray(srcValue)) {
      return [
        ...value,
        ...srcValue,
      ];
    }
  });
}
