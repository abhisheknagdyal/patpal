type Entity = [] | object;

export type IndexableObject = {
	[key: string]: any;
};

export function isEmpty(entity: Entity) {
	if (Array.isArray(entity)) {
		return !(entity.length > 0);
	}
	if (typeof entity === 'object') {
		return !(Object.keys(entity).length > 0);
	}
}

export function omit<T>(object: IndexableObject, paths: string[]): T {
	const mutableObject = { ...object };
	paths.forEach((key) => {
		delete mutableObject[key];
	});
	return mutableObject as T;
}

export const safeWrapInArray = (items: any) => {
	if (!items) {
		return [];
	}
	if (Array.isArray(items)) {
		return items.filter((record) => !!record);
	}
	return [items];
};
