function _shouldBeTyped<T>(object: T | undefined, type: string) {
    return typeof object === type;
}

function _shouldHaveProperties<T>(object: T, properties: (keyof T)[]) {
    const objectProperties = Object.keys(object);
    let matches = 0;
    for (const objectProperty of objectProperties) {
        let match = false;
        for (const property of properties) {
            if (objectProperty === property) {
                match = true;
                break;
            }
        }
        if (!match) {
            return false;
        }
        matches++;
    }
    console.log(matches, properties.length);
    if (matches === properties.length) {
        return true;
    } else {
        return false;
    }
}

export function assertion<T = object>(object: T | undefined) {
    let current = true;
    return {
        shouldBeTyped(type: string) {
            current = current && _shouldBeTyped<T>(object, type);
            return this;
        },
        shouldHaveProperties(properties: (keyof T)[]) {
            current =
                current &&
                typeof object === 'object' &&
                _shouldHaveProperties<T>(object, properties);
            return this;
        },
        ifNotPassing(callback: () => void) {
            if (!current) {
                callback();
            }
        },
    };
}
