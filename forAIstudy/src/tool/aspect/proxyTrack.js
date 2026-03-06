function proxyTrack(entity, options = defaultOptions) {
    if (typeof entity === 'function') 
        return trackClass(entity, options);
    return trackObject(entity, options);
}

const defaultOptions = {
    trackFunctions: true,
    trackProps: false,
    trackTime: true,
    trackCaller: false,
    trackCount: false,
    stdout: null,
    filter: null,
};

function trackObject(obj, options = {}) {
    const { trackFunctions, trackProps } = options;
 
    let resultObj = obj;
    if (trackFunctions) {
        proxyFunctions(resultObj, options);
    }
    if (trackProps) {
        resultObj = new Proxy(resultObj, {
            get: trackPropertyGet(options),
            set: trackPropertySet(options),
        });
    }
    return resultObj;
}

function trackClass(cls, options = {}) {
    cls.prototype = trackObject(cls.prototype, options);
    cls.prototype.constructor = cls;
 
    return new Proxy(cls, {
        construct(target, args) {
            const obj = new target(...args);
            return new Proxy(obj, {
                get: trackPropertyGet(options),
                set: trackPropertySet(options),
            });
        },
        apply: trackFunctionCall(options),
    });
}

function proxyFunctions(trackedEntity, options) {
    if (typeof trackedEntity === 'function') return;
    Object.getOwnPropertyNames(trackedEntity).forEach((name) => {
        if (typeof trackedEntity[name] === 'function') {
            trackedEntity[name] = new Proxy(trackedEntity[name], {
                apply: trackFunctionCall(options),
            });
        }
    });
}

function trackPropertySet(options = {}) {
    return function set(target, prop, value, receiver) {
        const { trackCaller, trackCount, stdout, filter } = options;
        const error = trackCaller && new Error();
        const caller = getCaller(error);
        const contextName = target.constructor.name === 'Object' ? '' : `${target.constructor.name}.`;
        const name = `${contextName}${prop}`;
        const hashKey = `set_${name}`;
        if (trackCount) {
            if (!callerMap[hashKey]) {
                callerMap[hashKey] = 1;
            } else {
                callerMap[hashKey]++;
            }
        }
        let output = `${name} is being set`;
        if (trackCaller) {
            output += ` by ${caller.name}`;
        }
        if (trackCount) {
            output += ` for the ${callerMap[hashKey]} time`;
        }
        let canReport = true;
        if (filter) {
            canReport = filter({
                type: 'get',
                prop,
                name,
                caller,
                count: callerMap[hashKey],
                value,
            });
        }
        if (canReport) {
            if (stdout) {
                stdout(output);
            } else {
                console.log(output);
            }
        }
        return Reflect.set(target, prop, value, receiver);
    };
}


module.exports={proxyTrack}