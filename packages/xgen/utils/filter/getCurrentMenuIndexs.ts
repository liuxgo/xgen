import type { App } from '@/types'

import { findPath } from '@/utils'

const Index = (pathname: string, items: Array<App.Menu>) => {
	let hit = false
	let current_nav = 0
	let paths: Array<string> = []

	for (const index in items) {
		const item = items[index]

		if (item.path === pathname) {
			hit = true
			current_nav = Number(index)
		}

		const target = findPath(item.children || [], 'path', pathname)
            
            if (target.length) {
			hit = true
			current_nav = Number(index)
			paths = target.map((item) => item.path)

			break
		}
	}

	return { hit, current_nav, paths }
}

export default Index
