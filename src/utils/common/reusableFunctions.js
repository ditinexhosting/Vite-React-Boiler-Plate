/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create all common method and functions
 */

/**
 * DeepClone method to copy data instance, instead of JSON.stringify
 * @param {*} item
 * @returns
 */
export const deepClone = (item) => {
  if (!item) {
    return item;
  } // null, undefined values check

  var types = [Number, String, Boolean],
    result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function (type) {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result == "undefined") {
    if (Object.prototype.toString.call(item) === "[object Array]") {
      result = [];
      item.forEach(function (child, index, array) {
        result[index] = deepClone(child);
      });
    } else if (typeof item == "object") {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode == "function") {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          // it is an object literal
          result = {};
          for (var i in item) {
            result[i] = deepClone(item[i]);
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (false && item.constructor) {
        } else {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }

  return result;
};

/**
 * Reusabe Function to remove permission data from redux persist
 */
export const sanitizeUserData = (result) => {
  delete result?.permissions;
  return result;
};

/**
 * Logic to filter and show sidebar if user has permission
 */
export const filterTabPermission = (menu, allowedPermissions) => {
  const filteredMenu = menu.map((item) => {
    if (item?.children && item?.children?.length > 0) {
      // Recursive
      const permissibleChildren = filterTabPermission(item.children, allowedPermissions);
      item.children = permissibleChildren;
      return permissibleChildren.length > 0 ? item : null;
    }

    if (item?.permission) return allowedPermissions.includes(item?.permission) ? item : null;
    else return item;
  });
  return filteredMenu.filter(Boolean);
};

/**
 * Find nested antd menu items by key
 * @param {*} items
 * @param {*} targetKey
 * @returns
 */
export const findItemByKey = (items, targetKey, keyPath = []) => {
  for (const item of items) {
    if (item.key === targetKey) {
      keyPath.push(item.key);
      return { item, keyPath };
    }

    if (item.children) {
      keyPath.push(item.key);
      const result = findItemByKey(item.children, targetKey, keyPath);
      if (result) {
        return result;
      } else {
        keyPath.pop();
      }
    }
  }
  return null;
};

/**
 * Find nested antd menu items by key
 * @param {*} items
 * @param {*} targetKey
 * @returns
 */
export const findItemByRoute = (items, targetKey, keyPath = []) => {
  for (const item of items) {
    if (
      item?.route
        ?.toLowerCase()
        .replace(/^\/+|\/+$/g, "")
        .includes(targetKey?.toLowerCase().replace(/^\/+|\/+$/g, ""))
    ) {
      keyPath.push(item.key);
      return { item, keyPath };
    }

    if (item.children) {
      keyPath.push(item.key);
      const result = findItemByRoute(item.children, targetKey, keyPath);
      if (result) {
        return result;
      } else {
        keyPath.pop();
      }
    }
  }
  return null;
};
