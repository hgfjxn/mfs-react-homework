var _desc, _value, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function log(target, name, descriptor) {
    var origin = descriptor.value;

    descriptor.value = function (target, name, descriptor) {
        console.log('Calling ${name} with', arguments);
        return origin.apply(this, arguments);
    };

    return descriptor;
}

let Sum = (_class = class Sum {
    add(a, b) {
        return a + b;
    }
}, (_applyDecoratedDescriptor(_class.prototype, 'add', [log], Object.getOwnPropertyDescriptor(_class.prototype, 'add'), _class.prototype)), _class);


let x = new Sum();
x.add(1, 2);

