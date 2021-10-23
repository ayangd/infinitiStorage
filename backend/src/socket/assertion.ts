export function assertion(object: any) {
    return {
        shouldBeTyped(type: string) {
            return typeof object === type;
        },
        shouldHaveProperties(...properties: string[]) {
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
        },
    };
}
